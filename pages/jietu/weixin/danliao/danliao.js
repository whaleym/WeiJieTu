require("../../../../wux/wux");

var a, i = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../../../utils/user")), e = getApp(), t = require("../../../../utils/util.js"), n = (require("../../../../utils/common.js"), 
require("../../../../api.js")), o = !1, s = require("../../../../zanui/index"), l = {}, d = 0;

Page(Object.assign({}, s.Toast, {
    data: {
        list: {},
        showModalStatus: !1,
        isAndroid: "android" == e.globalData.system_info.platform,
        showDialog: !1,
        platform: e.globalData.system_info.platform
    },
    onUnload: function() {},
    toggleDialog: function() {
        o = !0, this.setData({
            showDialog: !this.data.showDialog
        });
    },
    itemClick: function(a) {
        var i = this, e = parseInt(a.currentTarget.dataset.index);
        0 == e ? (this.toggleDialog(), wx.navigateTo({
            url: "/pages/jietu/weixin/danliaoshezhi/danliaoshezhi"
        })) : 1 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
        })) : 2 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/picAdd/picAdd?app=weixin&type=danliao"
        })) : 3 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=danliao"
        })) : 4 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=danliao"
        })) : 5 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=danliao"
        })) : 7 == e ? (this.toggleDialog(), wx.showModal({
            title: "提示",
            content: "请用手机系统自带的截屏功能哦",
            showCancel: !1,
            confirmText: "知道了"
        })) : 8 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=danliao"
        })) : 9 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=danliao"
        })) : 10 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=danliao"
        })) : 11 == e ? (this.toggleDialog(), t.setDuihuaIndex("weixin", "danliao"), wx.navigateTo({
            url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=danliao"
        })) : 6 == e && (this.toggleDialog(), wx.showModal({
            title: "提示",
            content: "要删除聊天内容吗？",
            confirmText: "删除",
            success: function(a) {
                a.confirm ? (l.danliao = {}, wx.setStorageSync("weixin", l), i.setData({
                    list: []
                })) : a.cancel;
            }
        }));
    },
    onShow: function(a) {
        var i = this;
        n.getUser(function(a) {
            a.isVip && i.setData({
                isVip: !0
            });
        }, function() {}); 
        l = wx.getStorageSync("weixin"); 
        // console.log("weixin", l); 
        e.globalData.system_info = wx.getSystemInfoSync(); 
        t.isEmptyObject(l) && (l = {}); 
        t.isEmptyObject(l.danliao) && (l.danliao = {});
        t.isEmptyObject(l.danliao.users) && (l.danliao.users = []), t.isEmptyObject(l.danliao.list) && (l.danliao.list = []), 
        n.login(function(a) {
            l.danliao.users[0] && i.setData({
                name: l.danliao.users[0].name
            });
        }, function() {
            l.danliao.users[0] && i.setData({
                name: l.danliao.users[0].name
            });
        }, "必须授权登录之后才能操作呢，是否重新授权登录？");
        for (var o in l.danliao.list) !t.isEmptyObject(l.danliao.list[o]) && l.danliao.list[o].time && (l.danliao.list[o].time = t.formateDateTime(l.danliao.list[o].time, e.globalData.system_info.platform));
        t.isEmptyObject(l.danliao.bg) || t.isEmptyObject(l.danliao.list) ? i.setData({
            bg: ""
        }) : i.setData({
            bg: l.danliao.bg.url/* + "?imageMogr2/thumbnail/!" + e.globalData.system_info.windowWidth + "x" + e.globalData.system_info.windowHeight + "r|imageMogr2/gravity/Center/crop/" + e.globalData.system_info.windowWidth + "x" + e.globalData.system_info.windowHeight*/
        });
        var s = [];
        l.danliao.list.forEach(function(a, i, e) {
            s.includes(a.avatar) || s.push(a.avatar);
        });
        var d = JSON.parse(JSON.stringify(l.danliao.users)), r = d.filter(function(a, i, e) {
            return !s.includes(a.avatar);
        });
        if (r.length) {
            var u = s.map(function(a, i, e) {
                return {
                    preAvatar: a
                };
            });
            u.forEach(function(a, i, e) {
                var t = !0;
                d.forEach(function(i, e, n) {
                    a.preAvatar == i.avatar && (t = !1);
                }), t && r.length && (u[i].newAvatar = r[0].avatar, u[i].newName = r[0].name, r.shift());
            }), l.danliao.list.forEach(function(a, i, e) {
                u.forEach(function(e, t, n) {
                    a.avatar == e.preAvatar && e.newAvatar && (l.danliao.list[i].avatar = e.newAvatar, 
                    l.danliao.list[i].name = e.newName);
                });
            }), wx.setStorageSync("weixin", l);
        }
        i.setData({
            list: l.danliao.list,
            system: e.globalData.system_info
        }), t.isEmptyObject(i.data.list) || wx.getStorageSync("has_show_jietu_danliao_guide") || this.openGuide(), 
        wx.getStorageSync("has_show_jietu_danliao_confirm") || wx.showModal({
            title: "提示",
            content: "制作完成后，请用手机截屏来保存图片",
            showCancel: !1,
            confirmText: "知道了",
            success: function(a) {
                wx.setStorageSync("has_show_jietu_danliao_confirm", 1);
            }
        }), wx.setNavigationBarTitle({
            title: l.danliao.users[1] ? l.danliao.users[1].name : "待设置"
        });
    },
    openGuide: function() {
        wx.setStorageSync("has_show_jietu_danliao_guide", 1), this.guide("open");
    },
    close: function() {
        this.guide("close");
    },
    guide: function(a) {
        var i = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = i, i.opacity(0).rotateX(-100).step(), this.setData({
            animationData: i.export()
        }), setTimeout(function() {
            i.opacity(1).rotateX(0).step(), this.setData({
                animationData: i
            }), "close" == a && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == a && this.setData({
            showModalStatus: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: "生成微信群聊、微信单聊、QQ群聊、QQ单聊等页面",
            path: "/pages/index/index?from=" + e.globalData.from + "&sharerId=" + i.default.openId
        };
    },
    operateMessage: function(a) {
        var i = this;
        o ? o = !1 : wx.showActionSheet({
            itemList: [ "修改这条消息", "删除这条消息" ],
            success: function(e) {
                var n = wx.getStorageSync("weixin"), o = parseInt(a.detail.index), s = n.danliao.list[o];
                // console.log(s), console.log(o);
                0 == e.tapIndex ? (wx.setStorageSync("current_weixin_danliao_index", o), 
                !t.isEmptyObject(s) && s.content ? wx.navigateTo({
                    url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
                }) : !t.isEmptyObject(s) && s.pic ? wx.navigateTo({
                    url: "/pages/jietu/picAdd/picAdd?app=weixin&type=danliao"
                }) : !t.isEmptyObject(s) && s.voice_length ? wx.navigateTo({
                    url: "/pages/jietu/voiceAdd/voiceAdd?app=weixin&type=danliao"
                }) : t.isEmptyObject(s) || !s.zhuanzhang_price && !s.shouqian_price ? !t.isEmptyObject(s) && s.hongbao_price ? wx.navigateTo({
                    url: "/pages/jietu/hongbaoAdd/hongbaoAdd?app=weixin&type=danliao"
                }) : !t.isEmptyObject(s) && s.time ? wx.navigateTo({
                    url: "/pages/jietu/timeAdd/timeAdd?app=weixin&type=danliao"
                }) : !t.isEmptyObject(s) && s.is_video ? wx.navigateTo({
                    url: "/pages/jietu/videoAdd/videoAdd?app=weixin&type=danliao"
                }) : !t.isEmptyObject(s) && s.message ? wx.navigateTo({
                    url: "/pages/jietu/messageAdd/messageAdd?app=weixin&type=danliao"
                }) : !t.isEmptyObject(s) && s.linkTitle ? wx.navigateTo({
                    url: "/pages/jietu/urlAdd/urlAdd?app=weixin&type=danliao"
                }) : wx.navigateTo({
                    url: "/pages/jietu/textAdd/textAdd?app=weixin&type=danliao"
                }) : wx.navigateTo({
                    url: "/pages/jietu/zhuanzhangAdd/zhuanzhangAdd?app=weixin&type=danliao"
                })) : 1 == e.tapIndex && wx.showModal({
                    title: "提示",
                    content: "要删除这条消息么？",
                    confirmText: "删除",
                    success: function(a) {
                        a.confirm ? (n.danliao.list.splice(parseInt(o), 1), wx.setStorageSync("weixin", n), 
                        i.setData({
                            list: n.danliao.list
                        })) : a.cancel;
                    }
                });
            },
            fail: function(a) {}
        });
    },
    onLoad: function(i) {
        // console.log("单聊页面加载");
        d = parseInt(i.price), a = i.id, wx.onUserCaptureScreen && wx.onUserCaptureScreen(function(i) {
            wx.showModal({
                title: "提示",
                content: "截图需要优化处理下，这样会更逼真哦",
                confirmText: "去处理",
                success: function(i) {
                    i.confirm ? wx.navigateTo({
                        url: "/pages/screenShot/screenShot?cat=3&title=" + (l.danliao.users[1] ? l.danliao.users[1].name : "待设置") + "&id=" + a
                    }) : i.cancel;
                }
            });
        });
    }
}));