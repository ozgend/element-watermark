var app = new Vue({
    el: '#app',
    data: {
        settings: {},
        domains: [],
        selectedSetting: {},
        selectedDomain: 'domain-3',
    },
    mounted: function () {
        console.log('mounted');
        this.loadSettings();
    },
    methods: {
        loadSettings: function () {
            let domains = [];
            let settings = {};

            for (let i = 1; i <= 5; i++) {
                const obj = {
                    domain: `domain-${i}`,
                    targetSelector: `selector-${i}`,
                    imageUrl: `imageUrl-${i}`,
                    imageWidth: i * 10,
                    imageHeight: i * 10
                };

                domains.push(obj.domain);
                settings[obj.domain] = obj;
            }

            this.domains = domains;
            this.settings = settings;
        }
    }
});