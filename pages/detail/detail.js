require("../../wux/wux");

var t, e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/user")), a = getApp(), i = require("../../utils/util.js"), n = (require("../../utils/common.js"), 
{}), o = require("../../api.js"), d = require("../../zanui/index"), s = !1, c = 0;

Page(Object.assign({}, d.Toast, {
    data: {
        detail: {},
        isAndroid: "android" == a.globalData.system_info.platform,
        showModalStatus: !1,
        platform: a.globalData.system_info.platform
    },
    onShareAppMessage: function() {
        return {
            title: "模拟微信朋友圈界面，自带免费热点模板，内容随意定制",
            path: "/pages/index/index?from=" + a.globalData.from + "&sharerId=" + e.default.openId
        };
    },
    onShow: function(t) {
        var e = this;
        o.getUser(function(t) {
            t.isVip && e.setData({
                isVip: !0
            });
        }, function() {}), wx.setStorageSync("current_detail_index", 99), n = a.globalData.system_info, 
        e.data.detail = i.getDetail();
        var d = "ios" === n.platform ? "padding: 0 30rpx 0 20rpx;" : "padding: 27rpx 25rpx 0 25rpx;";
        e.setData({
            padding: d,
            oneSize: Math.ceil(.48 * n.windowWidth * n.pixelRatio),
            twoSize: Math.ceil(.21 * n.windowWidth * n.pixelRatio),
            pixelRatio: n.pixelRatio,
            detail: e.data.detail,
            threeSize: Math.ceil(.21 * n.windowWidth * n.pixelRatio)
        }), i.isEmptyObject(e.data.detail) || wx.getStorageSync("has_show_detail_guide") || this.openGuide(), 
        wx.getStorageSync("has_show_detail_confirm") || wx.showModal({
            title: "提示",
            content: "制作完成后，请用手机截屏来保存图片",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {
                wx.setStorageSync("has_show_detail_confirm", 1);
            }
        });
    },
    onUnload: function() {},
    openGuide: function() {
        wx.setStorageSync("has_show_detail_guide", 1), this.guide("open");
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
    operateLike: function() {
        var t = this;
        s ? s = !1 : wx.showActionSheet({
            itemList: [ "修改点赞", "清除点赞" ],
            success: function(e) {
                0 == e.tapIndex ? wx.navigateTo({
                    url: "/pages/likeAdd/likeAdd"
                }) : 1 == e.tapIndex && wx.showModal({
                    title: "提示",
                    content: "要清除所有点赞么？",
                    confirmText: "删除",
                    success: function(e) {
                        e.confirm ? (t.data.detail.likes = [], i.saveDetail(t.data.detail), t.setData({
                            detail: t.data.detail
                        })) : e.cancel;
                    }
                });
            },
            fail: function(t) {}
        });
    },
    operateComment: function(t) {
        if (s) s = !1; else {
            console.log(t);
            var e = this;
            wx.showActionSheet({
                itemList: [ "回复TA", "修改这条评论", "删除这条评论" ],
                success: function(a) {
                    1 == a.tapIndex ? (wx.setStorageSync("current_comment_index", parseInt(t.currentTarget.id)), 
                    wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    })) : 2 == a.tapIndex ? wx.showModal({
                        title: "提示",
                        content: "要删除这条评论么？",
                        confirmText: "删除",
                        success: function(a) {
                            a.confirm ? (i.isEmptyObject(e.data.detail.comments) ? e.data.detail.comments = [] : e.data.detail.comments.splice(parseInt(t.currentTarget.id), 1), 
                            i.saveDetail(e.data.detail), e.setData({
                                detail: e.data.detail
                            })) : a.cancel;
                        }
                    }) : 0 == a.tapIndex && (i.isEmptyObject(e.data.detail.comments) && (e.data.detail.comments = []), 
                    wx.setStorageSync("current_comment_index", e.data.detail.comments.length), wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd?fname=" + t.currentTarget.dataset.fname
                    }));
                },
                fail: function(t) {}
            });
        }
    },
    operate: function() {
        if (s) s = !1; else {
            var t = this;
            wx.showActionSheet({
                itemList: [ "赞", "评论" ],
                success: function(e) {
                    0 == e.tapIndex ? wx.navigateTo({
                        url: "/pages/likeAdd/likeAdd"
                    }) : 1 == e.tapIndex && (i.isEmptyObject(t.data.detail.comments) && (t.data.detail.comments = []), 
                    wx.setStorageSync("current_comment_index", t.data.detail.comments.length), wx.navigateTo({
                        url: "/pages/commentAdd/commentAdd"
                    }));
                },
                fail: function(t) {}
            });
        }
    },
    popupEdit: function() {
        if (s) s = !1; else {
            var t = this;
            wx.showActionSheet({
                itemList: [ "修改本条内容", "删除本条内容" ],
                success: function(e) {
                    0 == e.tapIndex ? !i.isEmptyObject(t.data.detail.link) && t.data.detail.link.content ? wx.navigateTo({
                        url: "/pages/detailLinkAdd/detailLinkAdd"
                    }) : !i.isEmptyObject(t.data.detail.ad) && t.data.detail.ad.content ? wx.navigateTo({
                        url: "/pages/detailADAdd/detailADAdd"
                    }) : wx.navigateTo({
                        url: "/pages/detailAdd/detailAdd"
                    }) : 1 == e.tapIndex && wx.showModal({
                        title: "提示",
                        content: "要删除本条内容吗？",
                        confirmText: "删除",
                        success: function(e) {
                            e.confirm ? (i.saveDetail({}), t.setData({
                                detail: {}
                            })) : e.cancel;
                        }
                    });
                },
                fail: function(t) {}
            });
        }
    },
    popupAdd: function() {
        var t = this;
        s = !0, i.isEmptyObject(t.data.detail) || !t.data.detail.content ? wx.showActionSheet({
            itemList: [ "加图文", "加转发", "加广告" ],
            success: function(t) {
                0 == t.tapIndex ? wx.navigateTo({
                    url: "/pages/detailAdd/detailAdd"
                }) : 1 == t.tapIndex ? wx.navigateTo({
                    url: "/pages/detailLinkAdd/detailLinkAdd"
                }) : 2 == t.tapIndex && wx.navigateTo({
                    url: "/pages/detailADAdd/detailADAdd"
                });
            },
            fail: function(t) {}
        }) : wx.showActionSheet({
            itemList: [ "清空", "截图" ],
            success: function(e) {
                0 == e.tapIndex ? wx.showModal({
                    title: "提示",
                    content: "要删除本条内容吗？",
                    confirmText: "删除",
                    success: function(e) {
                        e.confirm ? (i.saveDetail({}), t.setData({
                            detail: {}
                        })) : e.cancel;
                    }
                }) : 1 == e.tapIndex && wx.showModal({
                    title: "提示",
                    content: "请用手机系统自带的截屏功能哦",
                    showCancel: !1,
                    confirmText: "知道了"
                });
            },
            fail: function(t) {}
        });
    },
    onLoad: function(e) {
        c = parseInt(e.price), t = e.id;
        var a = this;
        wx.onUserCaptureScreen && wx.onUserCaptureScreen(function(e) {
            wx.showModal({
                title: "提示",
                content: "截图需要优化处理下，这样会更逼真哦",
                confirmText: "去处理",
                success: function(e) {
                    if (e.confirm) {
                        var n = void 0;
                        n = i.isEmptyObject(a.data.detail.files) ? 2 : 5, wx.navigateTo({
                            url: "/pages/screenShot/screenShot?cat=" + n + "&id=" + t
                        });
                    } else e.cancel;
                }
            });
        });
    }
}));