Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        backgroundColor: {
            type: String,
            value: "white"
        },
        showArrow: {
            type: Boolean,
            value: !0
        },
        arrowColor: {
            type: String,
            value: ""
        },
        index: {
            type: null,
            value: ""
        },
        border: {
            type: Boolean,
            value: !0
        },
        avatar: {
            type: String,
            value: ""
        },
        showName: {
            type: Boolean,
            value: !1
        },
        name: {
            type: String,
            value: ""
        },
        isAndroid: {
            type: Boolean,
            default: !1
        }
    },
    methods: {
        tapMessage: function(e) {
            this.triggerEvent("tapmessage", {
                index: e.currentTarget.dataset.index
            }, {});
        }
    }
});