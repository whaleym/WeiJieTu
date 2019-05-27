var a, e = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../../../utils/user")), t = getApp(), i = require("../../../../utils/util.js"), n = require("../../../../api.js"), s = require("../../../../utils/upload.js"), o = require("../../../../zanui/index"), d = {}, r = {};

Page(Object.assign({}, o.Toast, {
    data: {
        unreadMessageCount: 0
    },
    onLoad: function(e) {
        console.log("单聊设置页面加载");
        a = e.addType;
    },
    onShow: function(a) {
        var e = this;
        d = wx.getStorageSync("weixin"), i.isEmptyObject(d) && (d = {}), i.isEmptyObject(d.danliao) && (d.danliao = {}), 
        i.isEmptyObject(d.danliao.users) && (d.danliao.users = []), i.isEmptyObject(d.danliao.bg) && (d.danliao.bg = {}), 
        d.danliao.hasOwnProperty("unread_message_count") || (d.danliao.unread_message_count = 0), 
        this.setData({
            unreadMessageCount: d.danliao.unread_message_count
        }), d.danliao.users.length >= 2 ? this.setData({
            show_add: !1
        }) : this.setData({
            show_add: !0
        }), n.login(function(a) {
            console.log(d.danliao.users), r = a, i.isEmptyObject(d.danliao.users) && (d.danliao.users = [ {
                avatar: r.avatar,
                name: r.user_name
            } ]), e.init();
        }, function() {
            console.log(d.danliao.users), e.init();
        }, "必须授权登录之后才能操作呢，是否重新授权登录？");
    },
    init: function() {
        console.log("init"); 
        wx.setStorageSync("weixin", d); 
        this.setData({
            weixin: d
        });
    },
    afterchoose: function(a) {
        var e = this;
        d.danliao.users.push({
            avatar: "https://wsgroup.hmset.com/images/wjtq/other/uploading.png",
            name: ""
        });
        this.setData({
            weixin: d
        });
        this.setData({
            disabled: !0
        });
        wx.setStorageSync("weixin", d);
        s.uploadSingleB({
            path: a,
            state: 1,
            uname: "danliao"
        }, "jietu_picture_", function(a) {
            a ? (d.danliao.users[d.danliao.users.length - 1] = {
                avatar: a.url/* + "?imageView2/1/w/150/h/150"*/,
                name: ""
            }, e.setData({
                weixin: d
            }), wx.setStorageSync("weixin", d)) : e.showZanToast("上传失败，请稍后再试呢"), e.setData({
                disabled: !1
            }), d.danliao.users.length >= 2 ? e.setData({
                show_add: !1
            }) : e.setData({
                show_add: !0
            });
        });
    },
    chooseImage: function(a) {
        var t = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(a) {
        //         if (1 == a.tapIndex) {
                    wx.chooseImage({
                        sizeType: [ "original", "compressed" ],
                        sourceType: [ "album", "camera" ],
                        count: 1,
                        success: function(a) {
                            t.afterchoose(a.tempFilePaths[0]);
                        }
                    }); 
        //         } else if (0 == a.tapIndex) {
        //             wx.navigateTo({
        //                 url: "/pages/selectUser/selectUser?from=weixin-danliao"
        //             }); 
        //         }else if (2 == a.tapIndex) {
        //             var i = "oldlogin";
        //             e.default.isLogin && e.default.userInfo && (i = "login"), n[i](function(a) {
        //                 var e = {
        //                     avatar: a.avatar,
        //                     name: a.user_name
        //                 };
        //                 d.danliao.users.splice(0, 0, e), wx.setStorageSync("temp_jietu_select_user", e), 
        //                 d.danliao.users.length >= 2 ? t.setData({
        //                     show_add: !1
        //                 }) : t.setData({
        //                     show_add: !0
        //                 }), t.setData({
        //                     weixin: d
        //                 }), wx.setStorageSync("weixin", d);
        //             }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
        //         } else {
        //             3 == a.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
        //                 title: "Loading……",
        //                 duration: 2e3,
        //                 icon: "loading"
        //             }), n.random(1, function(a) {
        //                 console.log(a);
        //                 var e = {
        //                     avatar: a.user[0].avatar,
        //                     name: a.user[0].name
        //                 };
        //                 d.danliao.users.push(e), wx.setStorageSync("temp_jietu_select_user", e), t.setData({
        //                     weixin: d
        //                 }), d.danliao.users.length >= 2 ? t.setData({
        //                     show_add: !1
        //                 }) : t.setData({
        //                     show_add: !0
        //                 }), wx.setStorageSync("weixin", d), wx.hideToast(), wx.hideNavigationBarLoading();
        //             }));
        //         }
        //     },
        //     fail: function(a) {}
        // });
    },
    deleteImage: function(a) {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "要删除这个成员吗？",
            confirmText: "删除",
            success: function(t) {
                if (t.confirm) {
                    for (var i = 0; i < d.danliao.users.length; i++) if (d.danliao.users[i].avatar == a.currentTarget.id) {
                        d.danliao.users.splice(i, 1), wx.setStorageSync("weixin", d), e.setData({
                            weixin: d
                        }), d.danliao.users.length >= 2 ? e.setData({
                            show_add: !1
                        }) : e.setData({
                            show_add: !0
                        });
                        break;
                    }
                } else t.cancel;
            }
        });
    },
    bindName: function(a) {
        console.log(a), d.danliao.users[a.target.dataset.index].name = a.detail.value, wx.setStorageSync("weixin", d);
    },
    deleteBg: function(a) {
        d.danliao.bg = {}, wx.setStorageSync("weixin", d), this.setData({
            weixin: d
        });
    },
    chooseBg: function(a) {
        var e = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(a) {
                d.danliao.bg.url = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png";
                e.setData({
                    weixin: d
                }); 
                e.setData({
                    disabled: !0
                });
                s.uploadSingleB({
                    path: a.tempFilePaths[0],
                    state: 1,
                    uname: "danliao"
                }, "jietu_picture_", function(a) {
                    console.log(a), a ? (d.danliao.bg = {
                        url: a.url,
                        width: a.width,
                        height: a.height
                    }, e.setData({
                        weixin: d
                    }), wx.setStorageSync("weixin", d)) : e.showZanToast("上传失败，请稍后再试呢"), e.setData({
                        disabled: !1
                    });
                });
            }
        });
    },
    bindUnreadInput: function(a) {
        this.setData({
            unreadMessageCount: a.detail.value
        });
    },
    formSubmit: function(e) {
        e.detail.formId && i.dealFormIds(e.detail.formId);
        var s = t.globalData.gloabalFomIds;
        s && s.length > 2 && n.saveformids(JSON.stringify(s), function() {
            t.globalData.gloabalFomIds = [];
        });
        var o = this;
        if (i.isEmptyObject(d.danliao.users)) {
            o.showZanToast("聊天成员不能为空哦"); 
        }else {
            for (var r = 0; r < d.danliao.users.length; r++) {
                if ("" == d.danliao.users[r].avatar) 
                    return void o.showZanToast("成员头像上传失败");
                if ("" == d.danliao.users[r].name) 
                    return void o.showZanToast("请输入成员昵称");
            }
            var u = this.data.unreadMessageCount < 0 ? 0 : this.data.unreadMessageCount;
            d.danliao.unread_message_count = u; 
            wx.setStorageSync("weixin", d); 
            wx.getStorageSync("temp_jietu_select_user") || wx.setStorageSync("temp_jietu_select_user", d.danliao.users[d.danliao.users.length - 1]); 
            "textAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
            }) : "picAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/picAdd/picAdd?app=weixin&type=danliao"
            }) : "voiceAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=danliao"
            }) : "hongbaoAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=danliao"
            }) : "zhuanzhangAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=danliao"
            }) : "videoAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=danliao"
            }) : "urlAdd" == a ? wx.redirectTo({
                url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=danliao"
            }) : wx.navigateBack();
        }
    }
}));