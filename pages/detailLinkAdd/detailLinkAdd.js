var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/user")), t = getApp(), e = require("../../zanui/index"), i = require("../../api.js"), n = require("../../utils/util.js"), s = require("../../utils/upload.js");

Page(Object.assign({}, e.Toast, {
    data: {
        detail: {}
    },
    onLoad: function(a) {},
    onShow: function(a) {
        var t = this;
        wx.getStorage({
            key: "linkCover",
            success: function(a) {
                console.log(a.data), t.afterLinkAvatarChoose(a.data), wx.removeStorage({
                    key: "linkCover",
                    success: function(a) {
                        console.log(a.data);
                    }
                });
            }
        });
        var e = wx.getStorageSync("current_detail_index");
        99 != e && e || (e = 0), this.data.detail = n.getDetail(), this.data.detail.time || (this.data.detail.time = e + 1 + "分钟前"), 
        n.isEmptyObject(this.data.detail.link) && (this.data.detail.link = {}), this.setData({
            detail: this.data.detail,
            disabled: !1
        });
    },
    help: function() {
        n.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/jialianjie.png?" + Date.parse(new Date()));
    },
    getUrl: function() {
        wx.showNavigationBarLoading(), wx.showToast({
            title: "Loading……",
            duration: 2e3,
            icon: "loading"
        }), i.getUrl(url, function(a) {
            console.log(a), wx.hideToast(), wx.hideNavigationBarLoading();
        });
    },
    afterAvatarChoose: function(a) {
        var t = this;
        t.data.detail.avatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            detail: t.data.detail
        }), n.saveDetail(t.data.detail), this.setData({
            disabled: !0
        }), s.uploadSingleB({
            path: a,
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(a) {
            a ? (i.checkImage(a.url), t.data.detail.avatar = a.url/* + "?imageView2/1/w/150/h/150"*/, 
            t.setData({
                detail: t.data.detail
            }), n.saveDetail(t.data.detail)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    avatarMenu: function(t) {
        var e = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(t) {
        //         if (1 == t.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(a) {
                        e.afterAvatarChoose(a.tempFilePaths[0]);
                    }
                }); 
        //         else if (0 == t.tapIndex) wx.navigateTo({
        //             url: "/pages/selectUser/selectUser?from=detail"
        //         }); else if (2 == t.tapIndex) {
        //             var s = "oldlogin";
        //             a.default.isLogin && a.default.userInfo && (s = "login"), i[s](function(a) {
        //                 e.data.detail.avatar = a.avatar, e.data.detail.name = a.user_name, e.setData({
        //                     detail: e.data.detail
        //                 }), n.saveDetail(e.data.detail);
        //             }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
        //         } else 3 == t.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
        //             title: "Loading……",
        //             duration: 2e3,
        //             icon: "loading"
        //         }), i.random(1, function(a) {
        //             console.log(a), e.data.detail.avatar = a.user[0].avatar, e.data.detail.name = a.user[0].name, 
        //             e.setData({
        //                 detail: e.data.detail
        //             }), n.saveDetail(e.data.detail), wx.hideToast(), wx.hideNavigationBarLoading();
        //         }));
        //     },
        //     fail: function(a) {}
        // });
    },
    afterLinkAvatarChoose: function(a) {
        var t = this;
        t.data.detail.link.avatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            detail: t.data.detail
        }), n.saveDetail(t.data.detail), this.setData({
            disabled: !0
        }), s.uploadSingleB({
            path: a,
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(a) {
            a ? (i.checkImage(a.url), t.data.detail.link.avatar = a.url/* + "?imageView2/1/w/150/h/150"*/, 
            t.setData({
                detail: t.data.detail
            }), n.saveDetail(t.data.detail)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    linkAvatar: function(a) {
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(a) {
                wx.navigateTo({
                    url: "/pages/cutInside/cutInside?src=" + a.tempFilePaths[0] + "&source=8"
                });
            }
        });
    },
    bindName: function(a) {
        this.data.detail.name = a.detail.value, n.saveDetail(this.data.detail);
    },
    bindContent: function(a) {
        this.data.detail.content = a.detail.value, n.saveDetail(this.data.detail);
    },
    bindLinkContent: function(a) {
        this.data.detail.link.content = a.detail.value, n.saveDetail(this.data.detail);
    },
    nav: function(a) {
        this.saveData(), console.log(a), wx.navigateTo({
            url: a.currentTarget.id
        });
    },
    saveData: function() {
        n.saveDetail(this.data.detail);
    },
    formSubmit: function(a) {
        a.detail.formId && n.dealFormIds(a.detail.formId);
        var e = t.globalData.gloabalFomIds;
        e && e.length > 2 && i.saveformids(JSON.stringify(e), function() {
            t.globalData.gloabalFomIds = [];
        }), this.saveData();
        var s = this.data.detail;
        s.avatar ? s.name ? s.content ? s.link.content ? wx.navigateBack() : this.showZanToast("转发链接标题必填哦") : this.showZanToast("转发描述必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    }
}));