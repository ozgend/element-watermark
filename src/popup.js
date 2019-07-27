var app = new Vue({
    el: '#app',
    data: {
        isNew: false,
        isLoaded: false,
        profiles: {},
        profileIds: [],
        selectedProfileId: '',
        newProfileId: ''
    },
    created: function () {
        console.log('mounted');
        this.loadStored();
    },
    methods: {
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

            // let profileIds = [];
            // let profiles = {};

            // for (let i = 1; i <= 5; i++) {
            //     const profile = {
            //         id: `p-${i}`,
            //         name: `profile-${i}`,
            //         targetSelector: `selector-${i}`,
            //         imageUrl: `imageUrl-${i}`,
            //         imageWidth: i * 10,
            //         imageHeight: i * 10
            //     };

            //     profileIds.push({ name: profile.name, id: profile.id });
            //     profiles[profile.id] = profile;
            // }

            // this.profileIds = profileIds;
            // this.profiles = profiles;

            this.isLoaded = true;
            this.selectedProfileId = this.profileIds[0].id;
        },

        setNewForm: function () {
            this.newProfileId = `p-${Date.now()}`;
            const newProfile = {
                id: this.newProfileId,
                name: `new profile ${this.newProfileId}`,
                targetSelector: '',
                imageUrl: '',
                imageWidth: 0,
                imageHeight: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,

            };
            this.profiles[this.newProfileId] = newProfile
            this.profileIds.push({ name: newProfile.name, id: newProfile.id });
            this.selectedProfileId = this.newProfileId;
            this.isNew = true;

        },

        discardNewForm: function () {
            this.removeRecord(this.newProfileId);
            this.newProfileId = '';
            this.isNew = false;
        },

        saveProfiles: function () {
            let profiles = [];
            this.profileIds.forEach(pid => {
                profiles.push(this.profiles[pid.id]);
            });
            this.storageSet('profiles', profiles);

            // chrome.storage.sync.set({ 'profiles': this.profiles }, function () {
            //     console.log('profiles saved');
            // });
        },

        removeProfile: function () {
            this.removeRecord(this.selectedProfileId);
        },

        removeRecord: function (id) {
            delete this.profiles[id];
            this.profileIds = this.profileIds.filter(p => p.id !== id)
            this.selectedProfileId = this.profileIds[0].id;
        },

        loadStored: function () {
            const items = this.storageGet('profiles');
            this.loadProfiles(items);

            // chrome.storage.sync.get(['profiles'], function (items) {
            //     this.loadProfiles(items);
            // });
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
    }
});