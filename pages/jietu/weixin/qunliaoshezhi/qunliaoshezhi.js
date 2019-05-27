var e, a = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../utils/user")), t = getApp(), i = require("../../../../utils/util.js"), n = require("../../../../api.js"), o = require("../../../../utils/upload.js"), s = require("../../../../zanui/index"), u = {}, r = {};

Page(Object.assign({}, s.Toast, {
    data: {},
    onLoad: function(a) {
        e = a.addType;
    },
    onShow: function(e) {
        var a = this;
        u = wx.getStorageSync("weixin"), i.isEmptyObject(u) && (u = {}), i.isEmptyObject(u.qunliao) && (u.qunliao = {}), 
        i.isEmptyObject(u.qunliao.users) && (u.qunliao.users = []), i.isEmptyObject(u.qunliao.bg) && (u.qunliao.bg = {}), 
        n.login(function(e) {
            r = e, i.isEmptyObject(u.qunliao.users) && (u.qunliao.users = [ {
                avatar: r.avatar,
                name: r.user_name
            } ]), wx.setStorageSync("weixin", u), a.setData({
                weixin: u
            });
        }, function() {
            wx.setStorageSync("weixin", u), a.setData({
                weixin: u
            });
        }, "必须授权登录之后才能操作呢，是否重新授权登录？");
    },
    afterchoose: function(e) {
        for (var a = 0; a < e.length; a++) u.qunliao.users.push({
            avatar: "https://wsgroup.hmset.com/images/wjtq/other/uploading.png",
            name: ""
        });
        this.setData({
            weixin: u
        }), this.setData({
            disabled: !0
        }), wx.setStorageSync("weixin", u), this.startUpload(e);
    },
    startUpload: function(e) {
        var a = this;
        e.length && o.uploadSingleB({
            path: e[0],
            state: 1,
            uname: "qunliao"
        }, "jietu_picture_", function(t) {
            t ? (console.log(u.qunliao.users.length), u.qunliao.users[u.qunliao.users.length - e.length] = {
                avatar: t.url/* + "?imageView2/1/w/150/h/150"*/,
                name: ""
            }, e = e.splice(1, e.length), a.onUploadComplete(e), e.length || a.setData({
                disabled: !1
            })) : a.showZanToast("上传失败，请稍后再试呢");
        });
    },
    onUploadComplete: function(e) {
        this.setData({
            weixin: u
        }), wx.setStorageSync("weixin", u), e.length && this.startUpload(e);
    },
    chooseImage: function(e) {
        var t = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(e) {
        //         if (1 == e.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 10,
                    success: function(e) {
                        t.afterchoose(e.tempFilePaths);
                    }
                }); 
        //         else if (0 == e.tapIndex) wx.navigateTo({
        //             url: "/pages/selectUser/selectUser?from=weixin-qunliao"
        //         }); else if (2 == e.tapIndex) {
        //             var i = "oldlogin";
        //             a.default.isLogin && a.default.userInfo && (i = "login"), n[i](function(e) {
        //                 var a = {
        //                     avatar: e.avatar,
        //                     name: e.user_name
        //                 };
        //                 u.qunliao.users.splice(0, 0, a), wx.setStorageSync("temp_jietu_select_user", a), 
        //                 t.setData({
        //                     weixin: u
        //                 }), wx.setStorageSync("weixin", u);
        //             }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
        //         } else 3 == e.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
        //             title: "Loading……",
        //             duration: 2e3,
        //             icon: "loading"
        //         }), n.random(1, function(e) {
        //             console.log(e);
        //             var a = {
        //                 avatar: e.user[0].avatar,
        //                 name: e.user[0].name
        //             };
        //             u.qunliao.users.push(a), wx.setStorageSync("temp_jietu_select_user", a), t.setData({
        //                 weixin: u
        //             }), wx.setStorageSync("weixin", u), wx.hideToast(), wx.hideNavigationBarLoading();
        //         }));
        //     },
        //     fail: function(e) {}
        // });
    },
    deleteImage: function(e) {
        var a = this;
        wx.showModal({
            title: "提示",
            content: "要删除这个成员吗？",
            confirmText: "删除",
            success: function(t) {
                if (t.confirm) {
                    for (var i = 0; i < u.qunliao.users.length; i++) if (u.qunliao.users[i].avatar == e.currentTarget.id) {
                        u.qunliao.users.splice(i, 1), wx.setStorageSync("weixin", u), a.setData({
                            weixin: u
                        });
                        break;
                    }
                } else t.cancel;
            }
        });
    },
    deleteBg: function(e) {
        u.qunliao.bg = {}, wx.setStorageSync("weixin", u), this.setData({
            weixin: u
        });
    },
    chooseBg: function(e) {
        var a = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(e) {
                u.qunliao.bg.url = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", a.setData({
                    weixin: u
                }), a.setData({
                    disabled: !0
                }), o.uploadSingleB({
                    path: e.tempFilePaths[0],
                    state: 1,
                    uname: "qunliao"
                }, "jietu_picture_", function(e) {
                    console.log(e), e ? (u.qunliao.bg = {
                        url: e.url,
                        width: e.width,
                        height: e.height
                    }, a.setData({
                        weixin: u
                    }), wx.setStorageSync("weixin", u)) : a.showZanToast("上传失败，请稍后再试呢"), a.setData({
                        disabled: !1
                    });
                });
            }
        });
    },
    bindName: function(e) {
        console.log(e), u.qunliao.users[e.target.dataset.index].name = e.detail.value, wx.setStorageSync("weixin", u);
    },
    formSubmit: function(a) {
        a.detail.formId && i.dealFormIds(a.detail.formId);
        var o = t.globalData.gloabalFomIds;
        o && o.length > 2 && n.saveformids(JSON.stringify(o), function() {
            t.globalData.gloabalFomIds = [];
        });
        var s = this, r = a.detail.value.name, l = a.detail.value.counts;
        if (r || (r = "群聊"), l || (l = "10"), console.log(u), u.qunliao.name = r, u.qunliao.counts = l, 
        i.isEmptyObject(u.qunliao.users)) s.showZanToast("发言成员不能为空哦"); else {
            for (var d = 0; d < u.qunliao.users.length; d++) {
                if ("" == u.qunliao.users[d].avatar) return void s.showZanToast("成员头像上传失败");
                if ("" == u.qunliao.users[d].name) return void s.showZanToast("请输入成员昵称");
            }
            wx.setStorageSync("weixin", u), wx.getStorageSync("temp_jietu_select_user") || wx.setStorageSync("temp_jietu_select_user", u.qunliao.users[u.qunliao.users.length - 1]), 
            "textAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
            }) : "picAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/picAdd/picAdd?app=weixin&type=qunliao"
            }) : "voiceAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=qunliao"
            }) : "hongbaoAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=qunliao"
            }) : "zhuanzhangAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=qunliao"
            }) : "videoAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=qunliao"
            }) : "urlAdd" == e ? wx.redirectTo({
                url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=qunliao"
            }) : wx.navigateBack();
        }
    }
}));