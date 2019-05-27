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
        border: {
            type: Boolean,
            value: !0
        },
        index: {
            type: null,
            value: ""
        },
        avatar: {
            type: String,
            value: ""
        },
        isFail: {
            type: Boolean,
            value: !1
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