require("../../../../wux/wux");

var i, e = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../../../../utils/user")), t = getApp(), a = require("../../../../utils/util.js"), n = (require("../../../../utils/common.js"), 
require("../../../../api.js")), o = {}, s = !1, u = require("../../../../zanui/index"), l = 0;

Page(Object.assign({}, u.Toast, {
    data: {
        list: {},
        showModalStatus: !1,
        isAndroid: "android" == t.globalData.system_info.platform,
        showDialog: !1,
        platform: t.globalData.system_info.platform
    },
    onUnload: function() {},
    toggleDialog: function() {
        s = !0, this.setData({
            showDialog: !this.data.showDialog
        });
    },
    itemClick: function(i) {
        var e = parseInt(i.currentTarget.dataset.index), t = this;
        0 == e ? wx.navigateTo({
            url: "/pages/jietu/weixin/qunliaoshezhi/qunliaoshezhi"
        }) : 1 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
        })) : 2 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/picAdd/picAdd?app=weixin&type=qunliao"
        })) : 3 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=qunliao"
        })) : 4 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=qunliao"
        })) : 5 == e ? wx.showModal({
            title: "提示",
            content: "请用手机系统自带的截屏功能哦",
            showCancel: !1,
            confirmText: "知道了"
        }) : 8 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=qunliao"
        })) : 9 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=qunliao"
        })) : 10 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=qunliao"
        })) : 11 == e ? (a.setDuihuaIndex("weixin", "qunliao"), wx.navigateTo({
            url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=qunliao"
        })) : 6 == e && wx.showModal({
            title: "提示",
            content: "要删除群聊内容吗？",
            confirmText: "删除",
            success: function(i) {
                i.confirm ? (o.qunliao = {}, wx.setStorageSync("weixin", o), t.setData({
                    list: []
                })) : i.cancel;
            }
        }), this.toggleDialog();
    },
    onShow: function(i) {
        var e = this;
        n.getUser(function(i) {
            i.isVip && e.setData({
                isVip: !0
            });
        }, function() {}), t.globalData.system_info = wx.getSystemInfoSync(), o = wx.getStorageSync("weixin"), 
        a.isEmptyObject(o) && (o = {}); 
        a.isEmptyObject(o.qunliao) && (o.qunliao = {});
        a.isEmptyObject(o.qunliao.users) && (o.qunliao.users = []);
        a.isEmptyObject(o.qunliao.list) && (o.qunliao.list = []);
        n.login(function(i) {
            o.qunliao.users[0] && e.setData({
                name: o.qunliao.users[0].name
            });
        }, function() {
            o.qunliao.users[0] && e.setData({
                name: o.qunliao.users[0].name
            });
        }, "必须授权登录之后才能操作呢，是否重新授权登录？");
        for (var s in o.qunliao.list) 
            !a.isEmptyObject(o.qunliao.list[s]) && o.qunliao.list[s].time && (
                o.qunliao.list[s].time = a.formateDateTime(o.qunliao.list[s].time, t.globalData.system_info.platform));
        console.log(o.qunliao.bg);
        a.isEmptyObject(o.qunliao.bg) || a.isEmptyObject(o.qunliao.list) ? e.setData({
            bg: ""
        }) : e.setData({
            bg: o.qunliao.bg.url/* + "?imageMogr2/thumbnail/!" + t.globalData.system_info.windowWidth + "x" + t.globalData.system_info.windowHeight + "r|imageMogr2/gravity/Center/crop/" + t.globalData.system_info.windowWidth + "x" + t.globalData.system_info.windowHeight*/
        });
        var u = [];
        o.qunliao.list.forEach(function(i, e, t) {
            u.includes(i.avatar) || u.push(i.avatar);
        });
        var l = JSON.parse(JSON.stringify(o.qunliao.users)), r = l.filter(function(i, e, t) {
            return !u.includes(i.avatar);
        });
        if (r.length) {
            var c = u.map(function(i, e, t) {
                return {
                    preAvatar: i
                };
            });
            c.forEach(function(i, e, t) {
                var a = !0;
                l.forEach(function(e, t, n) {
                    i.preAvatar == e.avatar && (a = !1);
                }), a && r.length && (c[e].newAvatar = r[0].avatar, c[e].newName = r[0].name, r.shift());
            }), o.qunliao.list.forEach(function(i, e, t) {
                c.forEach(function(t, a, n) {
                    i.avatar == t.preAvatar && t.newAvatar && (o.qunliao.list[e].avatar = t.newAvatar, 
                    o.qunliao.list[e].name = t.newName);
                });
            }), wx.setStorageSync("weixin", o);
        }
        e.setData({
            list: o.qunliao.list,
            system: t.globalData.system_info
        }), a.isEmptyObject(e.data.list) || wx.getStorageSync("has_show_jietu_qunliao_guide") || this.openGuide(), 
        wx.getStorageSync("has_show_jietu_qunliao_confirm") || wx.showModal({
            title: "提示",
            content: "制作完成后，请用手机截屏来保存图片",
            showCancel: !1,
            confirmText: "知道了",
            success: function(i) {
                wx.setStorageSync("has_show_jietu_qunliao_confirm", 1);
            }
        }), wx.setNavigationBarTitle({
            title: o.qunliao.name ? o.qunliao.name + " (" + o.qunliao.counts + ")" : "群聊"
        });
    },
    openGuide: function() {
        wx.setStorageSync("has_show_jietu_qunliao_guide", 1), this.guide("open");
    },
    close: function() {
        this.guide("close");
    },
    guide: function(i) {
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.opacity(0).rotateX(-100).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(1).rotateX(0).step(), this.setData({
                animationData: e
            }), "close" == i && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == i && this.setData({
            showModalStatus: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: "生成微信群聊、微信单聊、QQ群聊、QQ单聊等页面",
            path: "/pages/index/index?from=" + t.globalData.from + "&sharerId=" + e.default.openId
        };
    },
    operateMessage: function(i) {
        if (s) s = !1; else {
            var e = this;
            wx.showActionSheet({
                itemList: [ "修改这条消息", "删除这条消息" ],
                success: function(t) {
                    var n = wx.getStorageSync("weixin"), o = parseInt(i.detail.index), s = n.qunliao.list[o];
                    console.log(s), console.log(o), 0 == t.tapIndex ? (wx.setStorageSync("current_weixin_qunliao_index", o), 
                    !a.isEmptyObject(s) && s.content ? wx.navigateTo({
                        url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.pic ? wx.navigateTo({
                        url: "/pages/jietu/picAdd/picAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.voice_length ? wx.navigateTo({
                        url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.hongbao_price ? wx.navigateTo({
                        url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.time ? wx.navigateTo({
                        url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.is_video ? wx.navigateTo({
                        url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.message ? wx.navigateTo({
                        url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=qunliao"
                    }) : !a.isEmptyObject(s) && s.linkTitle ? wx.navigateTo({
                        url: "/pages/jietu/linkTitleAdd/linkTitleAdd?app=weixin&type=qunliao"
                    }) : wx.navigateTo({
                        url: "/pages/jietu/textAdd/textAdd?app=weixin&type=qunliao"
                    })) : 1 == t.tapIndex && wx.showModal({
                        title: "提示",
                        content: "要删除这条消息么？",
                        confirmText: "删除",
                        success: function(t) {
                            t.confirm ? (n.qunliao.list.splice(parseInt(i.detail.index), 1), wx.setStorageSync("weixin", n), 
                            e.setData({
                                list: n.qunliao.list
                            })) : t.cancel;
                        }
                    });
                },
                fail: function(i) {}
            });
        }
    },
    onLoad: function(e) {
        l = parseInt(e.price), i = e.id, wx.onUserCaptureScreen && wx.onUserCaptureScreen(function(e) {
            wx.showModal({
                title: "提示",
                content: "截图需要优化处理下，这样会更逼真哦",
                confirmText: "去处理",
                success: function(e) {
                    e.confirm ? wx.navigateTo({
                        url: "/pages/screenShot/screenShot?cat=4&title=" + (o.qunliao.name ? o.qunliao.name + " (" + o.qunliao.counts + ")" : "群聊") + "&id=" + i
                    }) : e.cancel;
                }
            });
        });
    }
}));