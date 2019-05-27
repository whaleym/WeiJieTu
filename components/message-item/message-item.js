Component({
    properties: {
        item: {
            type: Object
        },
        index: {
            type: null,
            default: ""
        },
        customBackground: {
            type: Boolean,
            default: !1
        },
        isAndroid: {
            type: Boolean,
            default: !1
        },
        app: {
            type: null,
            default: ""
        },
        type: {
            type: null,
            default: ""
        },
        system: {
            type: Object
        },
        name: {
            type: null,
            default: ""
        },
        showName: {
            type: null,
            default: 0
        },
        maxWidth: {
            type: null,
            default: 200
        },
        maxHeight: {
            type: null,
            default: 100
        }
    },
    methods: {
        tapMessage: function(e) {
            this.triggerEvent("tapmessage", e.detail, {});
        },
        operateMessage: function(e) {
            this.triggerEvent("tapmessage", {
                index: e.currentTarget.dataset.index
            }, {});
        }
    }
});