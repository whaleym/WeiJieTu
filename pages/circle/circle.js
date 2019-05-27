require("../../wux/wux");

var t, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/user")), a = getApp(), i = require("../../utils/util.js"), n = (require("../../utils/common.js"), 
require("../../api.js")), o = {}, s = require("../../zanui/index"), d = !1, r = 0;

Page(Object.assign({}, s.Toast, {
    data: {
        empty: i.emptyDeatails(),
        showModalStatus: !1,
        isAndroid: "android" == a.globalData.system_info.platform,
        info: {},
        userInfo: {},
        showButton: !0,
        platform: a.globalData.system_info.platform
    },
    onShareAppMessage: function() {
        return {
            title: "模拟微信朋友圈界面，自带免费热点模板，内容随意定制",
            path: "/pages/index/index?from=" + a.globalData.from + "&sharerId=" + e.default.openId
        };
    },
    editInfo: function() {
        d ? d = !1 : wx.navigateTo({
            url: "/pages/info/info"
        });
    },
    onUnload: function() {},
    popup: function() {
        var t = this;
        d = !0, wx.showActionSheet({
            itemList: [ "加图文", "加转发", "加广告", "截图", "清空" ],
            success: function(e) {
                0 == e.tapIndex ? (i.setDetailIndex(), wx.navigateTo({
                    url: "/pages/detailAdd/detailAdd"
                })) : 1 == e.tapIndex ? (i.setDetailIndex(), wx.navigateTo({
                    url: "/pages/detailLinkAdd/detailLinkAdd"
                })) : 2 == e.tapIndex ? (i.setDetailIndex(), wx.navigateTo({
                    url: "/pages/detailADAdd/detailADAdd"
                })) : 3 == e.tapIndex ? wx.showModal({
                    title: "提示",
                    content: "请用手机系统自带的截屏功能哦",
                    showCancel: !1,
                    confirmText: "知道了"
                }) : 4 == e.tapIndex && wx.showModal({
                    title: "提示",
                    content: "要删除本条内容吗？",
                    confirmText: "删除",
                    success: function(e) {
                        e.confirm ? (i.removeCircle(), t.setData({
                            info: {},
                            empty: !0,
                            details: []
                        })) : e.cancel;
                    }
                });
            },
            fail: function(t) {}
        });
    },
    onShow: function(t) {
        var e = this;
        n.getUser(function(t) {
            t.isVip && e.setData({
                isVip: !0
            });
        }, function() {}), this.data.info = wx.getStorageSync("info"), i.isEmptyObject(this.data.info) && (this.data.info = {}), 
        this.setData({
            info: this.data.info
        }), o = {
            windowWidth: a.globalData.system_info.windowWidth,
            windowHeight: a.globalData.system_info.windowHeight,
            pixelRatio: a.globalData.system_info.pixelRatio
        }, e.data.details = i.getDetails();
        var s = i.emptyDeatails();
        e.setData({
            empty: s,
            padding: "padding: 0 25rpx 0 100rpx;",
            details: e.data.details,
            oneSize: Math.ceil(.48 * o.windowWidth * o.pixelRatio),
            twoSize: Math.ceil(.21 * o.windowWidth * o.pixelRatio),
            pixelRatio: o.pixelRatio,
            threeSize: Math.ceil(.21 * o.windowWidth * o.pixelRatio)
        }), s || wx.getStorageSync("has_show_circle_guide") || this.openGuide(), wx.getStorageSync("has_show_circle_confirm") || wx.showModal({
            title: "提示",
            content: "制作完成后，请用手机截屏来保存图片",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {
                wx.setStorageSync("has_show_circle_confirm", 1);
            }
        });
    },
    openGuide: function() {
        wx.setStorageSync("has_show_circle_guide", 1), this.guide("open");
    },
    close: function() {
        this.guide("close");
    },
    guide: function(t) {
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
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    operateLike: function(t) {
        var e = this;
        d ? d = !1 : wx.showActionSheet({
            itemList: [ "修改点赞", "清除点赞" ],
            success: function(a) {
                0 == a.tapIndex ? (console.log(parseInt(t.currentTarget.id)), wx.setStorageSync("current_detail_index", parseInt(t.currentTarget.id)), 
                wx.navigateTo({
                    url: "/pages/likesAdd/likesAdd"
                })) : 1 == a.tapIndex && wx.showModal({
                    title: "提示",
                    content: "要清除所有点赞么？",
                    confirmText: "删除",
                    success: function(a) {
                        a.confirm ? (e.data.details[t.currentTarget.id].likes = "", wx.setStorageSync("details", e.data.details), 
                        e.setData({
                            details: e.data.details
                        })) : a.cancel;
                    }
                });
            },
            fail: function(t) {}
        });
    },
    operateComment: function(t) {
        var e = this;
        d ? d = !1 : wx.showActionSheet({
            itemList: [ "回复TA", "修改这条评论", "删除这条评论" ],
            success: function(a) {
                if (1 == a.tapIndex) wx.setStorageSync("current_detail_index", parseInt(t.currentTarget.dataset.index)), 
                wx.setStorageSync("current_comment_index", parseInt(t.currentTarget.id)), wx.navigateTo({
                    url: "/pages/commentAdd/commentAdd"
                }); else if (2 == a.tapIndex) console.log(t.currentTarget.id), wx.showModal({
                    title: "提示",
                    content: "要删除这条评论么？",
                    confirmText: "删除",
                    success: function(a) {
                        if (a.confirm) {
                            var n = i.getDetails(), o = n[parseInt(t.currentTarget.dataset.index)];
                            console.log(o), i.isEmptyObject(o.comments) ? o.comments = [] : o.comments.splice(parseInt(t.currentTarget.id), 1), 
                            n[parseInt(t.currentTarget.dataset.index)] = o, wx.setStorageSync("details", n), 
                            e.setData({
                                details: n
                            });
                        } else a.cancel;
                    }
                }); else if (0 == a.tapIndex) {
                    wx.setStorageSync("current_detail_index", parseInt(t.currentTarget.dataset.index));
                    var n = i.getDetail();
                    i.isEmptyObject(n.comments) && (n.comments = []), wx.setStorageSync("current_comment_index", n.comments.length), 
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd?fname=" + t.currentTarget.dataset.fname
                    });
                }
            },
            fail: function(t) {}
        });
    },
    operate: function(t) {
        d ? d = !1 : wx.showActionSheet({
            itemList: [ "赞", "评论" ],
            success: function(e) {
                if (0 == e.tapIndex) wx.setStorageSync("current_detail_index", parseInt(t.currentTarget.id)), 
                wx.navigateTo({
                    url: "/pages/likesAdd/likesAdd"
                }); else if (1 == e.tapIndex) {
                    wx.setStorageSync("current_detail_index", parseInt(t.currentTarget.id));
                    var a = i.getDetail();
                    i.isEmptyObject(a.comments) && (a.comments = []), wx.setStorageSync("current_comment_index", a.comments.length), 
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    });
                }
            },
            fail: function(t) {}
        });
    },
    popupEdit: function(t) {
        var e = this;
        d ? d = !1 : wx.showActionSheet({
            itemList: [ "修改本条内容", "删除本条内容" ],
            success: function(a) {
                0 == a.tapIndex ? (wx.setStorageSync("current_detail_index", parseInt(t.currentTarget.id)), 
                !i.isEmptyObject(e.data.details[t.currentTarget.id].link) && e.data.details[t.currentTarget.id].link.content ? wx.navigateTo({
                    url: "/pages/detailLinkAdd/detailLinkAdd"
                }) : !i.isEmptyObject(e.data.details[t.currentTarget.id].ad) && e.data.details[t.currentTarget.id].ad.content ? wx.navigateTo({
                    url: "/pages/detailADAdd/detailADAdd"
                }) : wx.navigateTo({
                    url: "/pages/detailAdd/detailAdd"
                })) : 1 == a.tapIndex && wx.showModal({
                    title: "提示",
                    content: "要删除本条内容吗？",
                    confirmText: "删除",
                    success: function(a) {
                        a.confirm ? (e.data.details[t.currentTarget.id] = null, wx.setStorageSync("details", e.data.details), 
                        e.setData({
                            empty: i.emptyDeatails(),
                            details: e.data.details
                        })) : a.cancel;
                    }
                });
            },
            fail: function(t) {}
        });
    },
    onLoad: function(e) {
        r = parseInt(e.price);
        t = e.id;
        wx.onUserCaptureScreen && wx.onUserCaptureScreen(function(e) {
            wx.showModal({
                title: "提示",
                content: "截图需要优化处理下，这样会更逼真哦",
                confirmText: "去处理",
                success: function(e) {
                    e.confirm ? wx.navigateTo({
                        url: "/pages/screenShot/screenShot?cat=1&id=" + t
                    }) : e.cancel;
                }
            });
        });
    }
}));