const STORAGE_KEY = 'cfwm_profiles';

var app = new Vue({
    el: '#app',
    data: {
        isLoaded: false,
        isNew: false,
        profiles: {},
        profileIds: [],
        selectedProfileId: '',
        selectedProfile: {}
    },
    init: function () {
        console.log('init');
    },
    created: function () {
        console.log('created');
        this.loadStored();
    },
    watch: {
        selectedProfileId: function (val) {
            console.log('new:', val);
            this.selectedProfile = this.profiles[val];
        },
        // profiles: {
        //     handler: function (val) {
        //         console.log('profiles changed');
        //         this.saveProfiles();
        //     },
        //     deep: true
        // },
        selectedProfile: {
            handler: function (val, oldVal) {
                console.log('selectedProfile changed');
                this.profiles[val.id] = val;
                for (let p = 0; p < this.profileIds.length; p++) {
                    if (this.profileIds[p].id === val.id) {
                        this.profileIds[p].name = val.name;
                    }
                }
                this.saveProfiles();
            },
            deep: true
        },
    },
    methods: {
        createNewProfileObject() {
            const id = `p-${Date.now()}`;
            return {
                id,
                name: `new profile ${id}`,
                targetSelector: '',
                imageUrl: '',
                imageWidth: 0,
                imageHeight: 0,
                opacity:0.5,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };
        },

        loadProfiles: function (items) {
            if (!items) {
                this.setNewForm();
            }
            else {

                items.forEach(item => {
                    this.profileIds.push({ name: item.name, id: item.id });
                    this.profiles[item.id] = item;
                });
            }

            this.isLoaded = true;
            this.selectedProfileId = this.profileIds[0].id;
        },

        setNewForm: function () {
            this.selectedProfile = this.createNewProfileObject();
            this.profiles[this.selectedProfile.id] = this.selectedProfile;
            this.profileIds.push({ name: this.selectedProfile.name, id: this.selectedProfile.id });
            this.selectedProfileId = this.selectedProfile.id;
            this.isNew = true;
        },

        saveProfiles: function () {
            console.log('profiles saved.');
            let profiles = [];
            this.profileIds.forEach(pid => {
                profiles.push(this.profiles[pid.id]);
            });
            this.storageSet(STORAGE_KEY, profiles);
            this.selectedProfileId = this.selectedProfile.id;
            this.sendToContent(profiles);
        },

        removeProfile: function () {
            this.removeRecord(this.selectedProfileId);
        },

        removeRecord: function (id) {
            this.profileIds = this.profileIds.filter(p => p.id !== id)
            delete this.profiles[id];

            if (this.profileIds.length === 0) {
                this.setNewForm();
            }
            else {
                this.selectedProfileId = this.profileIds[0].id;
            }
        },

        loadStored: function () {
            const items = this.storageGet(STORAGE_KEY);
            this.loadProfiles(items);
        },

        storageGet: function (key) {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
            return undefined;
        },

        storageSet: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        sendToContent: function (profiles) {
            console.log('sendToContent');
            if (chrome && chrome.tabs) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { profiles });
                });
            }
        }
    }
});