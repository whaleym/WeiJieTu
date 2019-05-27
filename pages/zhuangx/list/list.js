function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

require("../../../wux/wux");

var a, e, i, n, s, o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../utils/user")), r = getApp(), u = 1, l = require("../../../api.js"), h = require("../../../zanui/index"), c = require("../../../utils/util.js");

Page(Object.assign({}, h.Tab, (a = {
    data: {
        inputShowed: !1,
        inputVal: "",
        nonet: !1,
        gridPicSize: "?imageView2/1/w/" + Math.ceil(.313 * r.globalData.system_info.windowWidth * r.globalData.system_info.pixelRatio) + "/h/" + Math.ceil(.313 * r.globalData.system_info.windowWidth * r.globalData.system_info.pixelRatio)
    },
    showInput: function() {
        console.log(s), this.setData({
            inputShowed: !0
        }), s.length && this.setData({
            searchHistory: s.reverse()
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: !1,
            searchHistory: []
        });
    },
    clearInput: function() {
        this.setData({
            inputVal: "",
            searchResult: []
        });
    },
    inputTyping: function(t) {
        var a = this;
        wx.showNavigationBarLoading(), l.zhuangxlist(100, 1, u, t.detail.value, function(e) {
            console.log(e), a.setData({
                inputVal: t.detail.value,
                searchResult: e.list
            }), wx.hideNavigationBarLoading();
        });
    },
    select: function(t) {
        if (this.data.inputVal) {
            var a = {
                name: t.currentTarget.dataset.name,
                avatar: t.currentTarget.dataset.avatar,
                id: t.currentTarget.dataset.id,
                path: t.currentTarget.dataset.path
            };
            s && s.length < 10 ? s.push(a) : s.length >= 10 && (s[s.length - 1] = a), wx.setStorageSync("zhuangx_searchHistory", s);
        }
        this.hideInput(), console.log(t.currentTarget.dataset.path), t.currentTarget.dataset.path ? wx.navigateTo({
            url: t.currentTarget.dataset.path
        }) : wx.navigateTo({
            url: "/pages/zhuangx/edit/edit?scene=" + t.currentTarget.dataset.id
        });
    },
    onPullDownRefresh: function() {
        u = 1, this.getList(i, "");
    },
    onReachBottom: function() {
        e && (u++, this.getList(i, ""));
    },
    onShareAppMessage: function() {
        return {
            title: "这个装逼神器太棒啦",
            path: "/pages/zhuangx/list/list?type=1&sharerId=" + o.default.openId
        };
    },
    openGuide: function() {
        wx.setStorageSync("has_show_mianze_guide", 1), this.guide("open");
    },
    close: function() {
        this.guide("close");
    },
    guide: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.opacity(0).rotateX(-100).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).rotateX(0).step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    onShow: function(t) {},
    onLoad: function(t) {
        t.scene && wx.navigateTo({
            url: "/pages/zhuangx/edit/edit?scene=" + t.scene
        }), s = wx.getStorageSync("zhuangx_searchHistory"), c.isEmptyObject(s) && (s = []), 
        i = t.cat ? t.cat : 100, u = 1, wx.setNavigationBarTitle({
            title: "装X"
        }), this.setData({
            type: 1
        }), n = !1, this.getList(i, ""), wx.getStorageSync("has_show_mianze_guide") || this.openGuide();
    },
    refresh: function() {
        n = !1, this.getList(i, "");
    },
    selectTemplate: function(t) {
        console.log(1), console.log(t);
        for (var a = this, e = 0; e < a.data.list.length; e++) 
            this.data.list[e].id == t.currentTarget.id && (this.data.list[e].path ? wx.navigateTo({
                url: this.data.list[e].path
            }) : wx.navigateTo({
                url: "/pages/zhuangx/edit/edit?scene=" + t.currentTarget.id
            }));
    },
    getList: function(t, a) {
        var i = this;
        c.isEmptyObject(i.data.list) && (i.data.list = []), n || (n = !0, wx.showNavigationBarLoading(), 
        1 == u && wx.showToast({
            title: "Loading……",
            duration: 2e4,
            icon: "loading"
        }), l.zhuangxlist(t, 1, u, a, function(a) {
            u = a.page, e = a.pageCount > a.page, n = !1, a.cats.selectedId = t, a.cats.scroll = !0, 
            a.cats.height = 45, 1 == u && (i.data.list = []), wx.stopPullDownRefresh(), i.setData({
                tabs: a.cats,
                nonet: !1,
                list: i.data.list.concat(a.list),
                hasMore: e
            }), wx.hideToast(), wx.hideNavigationBarLoading();
        }, function(t) {
            console.log(t), i.setData({
                nonet: !0
            }), wx.stopPullDownRefresh(), wx.hideToast(), wx.hideNavigationBarLoading();
        }));
    }
}, t(a, "onReachBottom", function() {
    e && (u++, this.getList(i, ""));
}), t(a, "handleZanTabChange", function(a) {
    var e, n = a.componentId;
    u = 1, i = a.selectedId, this.setData((e = {}, t(e, n + ".selectedId", i), t(e, "list", null), 
    e)), this.getList(i, "");
}), a)));