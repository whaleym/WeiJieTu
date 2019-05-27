var a = require("../../../api.js"), e = (require("../../../utils/config.js"), require("../../../utils/util.js"), 
getApp()), t = require("../../../zanui/index");

Page(Object.assign({}, t.Toast, {
    data: {
        disabled: !1
    },
    onShow: function(a) {
        var e = wx.getStorageSync("avatar_cat_url");
        e && (console.log(e), wx.showNavigationBarLoading(), wx.showToast({
            title: "加载……",
            duration: 2e4,
            icon: "loading"
        }), this.setData({
            avatar: e,
            disabled: !0
        }), wx.removeStorageSync("avatar_cat_url"));
    },
    copy_user_id: function() {
        var a = this;
        wx.setClipboardData({
            data: a.data.user_id,
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: "已经复制您的用户ID到剪贴板，快粘贴发给客服吧",
                    showCancel: !1,
                    confirmText: "收到"
                });
            }
        });
    },
    loaded: function() {
        wx.hideNavigationBarLoading(), wx.hideToast(), this.setData({
            disabled: !1
        });
    },
    onLoad: function(a) {
        this.setData({
            user_name: a.user_name,
            user_id: a.user_id,
            avatar: a.avatar
        }), this.copy_user_id();
    },
    afterChoose: function(a) {
        wx.navigateTo({
            url: "/pages/profile/cutInside/cutInside?src=" + a
        });
    },
    select: function() {
        var a = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(e) {
                a.afterChoose(e.tempFilePaths[0]);
            }
        });
    },
    formSubmit: function(t) {
        console.log(t.detail.value), t.detail.value.user_name ? this.data.avatar ? (wx.showNavigationBarLoading(), 
        wx.showToast({
            title: "保存中……",
            duration: 2e4,
            icon: "loading"
        }), a.profile(t.detail.value.user_name, this.data.avatar, function(a) {
            wx.hideNavigationBarLoading(), wx.hideToast();
            var t = {
                openid: a.user_id,
                user_name: a.user_name,
                avatar: a.user_avatar,
                unionid: a.unionid
            };
            wx.setStorageSync("user", t), e.globalData.user = t, wx.navigateBack();
        }, function(a) {
            wx.hideNavigationBarLoading(), wx.hideToast(), this.showZanToast("更新失败，请稍候再试");
        })) : this.showZanToast("必须选择头像呢") : this.showZanToast("必须输入昵称哦");
    }
}));