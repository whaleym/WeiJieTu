var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/user")), t = getApp(), i = require("../../zanui/index"), n = require("../../api.js"), e = require("../../utils/util.js"), o = require("../../utils/upload.js");

Page(Object.assign({}, i.Toast, {
    data: {
        info: {}
    },
    onLoad: function(a) {},
    onShow: function(a) {
        this.data.info = wx.getStorageSync("info"), e.isEmptyObject(this.data.info) && (this.data.info = {}), 
        this.setData({
            info: this.data.info,
            disabled: !1
        });
    },
    afterAvatarChoose: function(a) {
        var t = this;
        t.data.info.avatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            info: t.data.info
        }), wx.setStorageSync("info", t.data.info), this.setData({
            disabled: !0
        }), o.uploadSingleB({
            path: a,
            state: 1,
            uname: "circles"
        }, "jietu_picture_", function(a) {
            console.log("上传图片成功：", a);
            a ? (n.checkImage(a.url), t.data.info.avatar = a.url /*+ "?imageView2/1/w/150/h/150"*/, 
                console.log(t.data.info),
            t.setData({
                info: t.data.info
            }), wx.setStorageSync("info", t.data.info)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    avatarMenu: function(t) {
        var i = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(t) {
        //         if (1 == t.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(a) {
                        i.afterAvatarChoose(a.tempFilePaths[0]);
                    }
                }); 
        //         else if (0 == t.tapIndex) wx.navigateTo({
        //             url: "/pages/selectUser/selectUser?from=info"
        //         }); else if (2 == t.tapIndex) {
        //             var e = "oldlogin";
        //             a.default.isLogin && a.default.userInfo && (e = "login"), n[e](function(a) {
        //                 i.data.info.avatar = a.avatar, i.data.info.name = a.user_name, i.setData({
        //                     info: i.data.info
        //                 }), wx.setStorageSync("info", i.data.info);
        //             }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
        //         } else 3 == t.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
        //             title: "Loading……",
        //             duration: 2e3,
        //             icon: "loading"
        //         }), n.random(1, function(a) {
        //             i.data.info.avatar = a.user[0].avatar, i.data.info.name = a.user[0].name, i.setData({
        //                 info: i.data.info
        //             }), wx.setStorageSync("info", i.data.info), wx.hideToast(), wx.hideNavigationBarLoading();
        //         }));
        //     },
        //     fail: function(a) {}
        // });
    },
    afterBannerChoose: function(a) {
        var t = this;
        t.data.info.banner = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            info: t.data.info
        }), wx.setStorageSync("info", t.data.info), this.setData({
            disabled: !0
        }), o.uploadSingleB({
            path: a,
            state: 1,
            uname: "circles"
        }, "jietu_picture_", function(a) {
            a ? (n.checkImage(a.url), t.data.info.banner = a.url, t.setData({
                info: t.data.info
            }), wx.setStorageSync("info", t.data.info)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    avatarBanner: function() {
        var a = this;
        // wx.showActionSheet({
        //     itemList: [ "从相册选择", "随机来一个" ],
        //     success: function(t) {
        //         if (0 == t.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(t) {
                        a.afterBannerChoose(t.tempFilePaths[0]);
                    }
                }); 
        //         else if (1 == t.tapIndex) {
        //             var i = e.randomNum(1, 20);
        //             a.data.info.banner = "https://ogrzx2jit.qnssl.com/cover_" + i + ".jpg?imageView2/1/w/640/h/" + Math.ceil(546.688), 
        //             a.setData({
        //                 info: a.data.info
        //             }), wx.setStorageSync("info", a.data.info);
        //         }
        //     },
        //     fail: function(a) {}
        // });
    },
    afterAvatarNewsChoose: function(a) {
        var t = this;
        t.data.info.newsAvatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            info: t.data.info
        }), wx.setStorageSync("info", t.data.info), this.setData({
            disabled: !0
        }), o.uploadSingleB({
            path: a,
            state: 1,
            uname: "circles"
        }, "jietu_picture_", function(a) {
            a ? (n.checkImage(a.url), t.data.info.newsAvatar = a.url/* + "?imageView2/1/w/150/h/150"*/, 
            t.setData({
                info: t.data.info
            }), wx.setStorageSync("info", t.data.info)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    avatarNews: function(a) {
        var t = this;
    //     wx.showActionSheet({
    //         itemList: [ "选择系统人物", "从相册选择", "随机来一个" ],
    //         success: function(a) {
    //             1 == a.tapIndex ? 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(a) {
                        t.afterAvatarNewsChoose(a.tempFilePaths[0]);
                    }
                }) /*: 0 == a.tapIndex ? wx.navigateTo({
                    url: "/pages/selectUser/selectUser?from=newsAvatar"
                }) : 2 == a.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
                    title: "Loading……",
                    duration: 2e3,
                    icon: "loading"
                }), n.random(1, function(a) {
                    t.data.info.newsAvatar = a.user[0].avatar, t.setData({
                        info: t.data.info
                    }), wx.setStorageSync("info", t.data.info), wx.hideToast(), wx.hideNavigationBarLoading();
                }));
            },
            fail: function(a) {}
        });*/
    },
    bindName: function(a) {
        this.data.info.name = a.detail.value, wx.setStorageSync("info", this.data.info);
    },
    bindNews: function(a) {
        this.data.info.news = a.detail.value, wx.setStorageSync("info", this.data.info);
    },
    saveData: function() {
        wx.setStorageSync("info", this.data.info);
    },
    formSubmit: function(a) {
        a.detail.formId && e.dealFormIds(a.detail.formId);
        var i = t.globalData.gloabalFomIds;
        i && i.length > 2 && n.saveformids(JSON.stringify(i), function() {
            t.globalData.gloabalFomIds = [];
        }), this.saveData();
        var o = wx.getStorageSync("info");
        o.avatar ? o.name ? o.banner ? wx.navigateBack() : this.showZanToast("必须选择封面呢") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    }
}));