var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/user")), t = getApp();

Component({
    properties: {
        size: {
            type: String,
            value: "default"
        },
        type: {
            type: String,
            value: "default"
        },
        plain: {
            type: Boolean,
            value: !1
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        clearButton: {
            type: Boolean,
            value: !1
        },
        clearType: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        handleGetUserInfo: function(r) {
            var a = this, o = r.detail;
            o.hasOwnProperty("userInfo") ? (t.globalData.from_user_id && (o.from_user_id = t.globalData.from_user_id, 
            t.globalData.from_user_id = null), e.default.updateUserInfo(o).then(function(e) {
                a.triggerEvent("success", {});
            }, function(e) {
                a.triggerEvent("error", {
                    message: e.message
                });
            })) : this.triggerEvent("error", {
                refused: 1
            });
        }
    }
});