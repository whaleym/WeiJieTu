function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

getApp();

var a, e, s, n, i, r = 1, c = require("../../api.js"), o = require("../../zanui/index"), u = require("../../utils/util.js");

Page(Object.assign({}, o.Tab, {
    data: {
        inputShowed: !1,
        inputVal: ""
    },
    showInput: function() {
        this.setData({
            inputShowed: !0
        }), i.length && this.setData({
            wuserHistory: i.reverse()
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: !1,
            wuserHistory: []
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
        wx.showNavigationBarLoading(), c.wuser(e, r, t.detail.value, function(e) {
            a.setData({
                inputVal: t.detail.value,
                searchResult: e.list
            }), wx.hideNavigationBarLoading();
        });
    },
    onLoad: function(t) {
        i = wx.getStorageSync("wuserHistory"), u.isEmptyObject(i) && (i = []), e = 100, 
        r = 1, n = t.from, s = !1, this.getList(e, "");
    },
    getList: function(t, e) {
        var n = this;
        u.isEmptyObject(n.data.list) && (n.data.list = []), s || (s = !0, wx.showNavigationBarLoading(), 
        wx.showToast({
            title: "Loading……",
            duration: 2e3,
            icon: "loading"
        }), c.wuser(t, r, e, function(e) {
            console.log(e), r = e.page, a = e.pageCount > e.page, s = !1, 1 == r && (n.data.list = []), 
            e.cats.selectedId = t, e.cats.scroll = !0, e.cats.height = 45, n.setData({
                tabs: e.cats,
                list: n.data.list.concat(e.list),
                hasMore: a
            }), wx.hideToast(), wx.hideNavigationBarLoading();
        }));
    },
    onReachBottom: function() {
        a && (r++, this.getList(e, ""));
    },
    selectUser: function(t) {
        var a = u.getDetail();
        if (this.data.inputVal) {
            var e = {
                name: t.currentTarget.dataset.name,
                avatar: t.currentTarget.dataset.avatar
            };
            i && i.length < 10 ? i.push(e) : i.length >= 10 && (i[i.length - 1] = e), wx.setStorageSync("wuserHistory", i);
        }
        if (u.isEmptyObject(a.likes) && (a.likes = []), "detail" == n) a.name = t.currentTarget.dataset.name, 
        a.avatar = t.currentTarget.dataset.avatar, u.saveDetail(a); else if ("like" == n) a.likes.push(t.currentTarget.dataset.avatar), 
        u.saveDetail(a); else if ("comment" == n) {
            var s = wx.getStorageSync("current_comment_index");
            s || (s = 0), u.isEmptyObject(a.comments) && (a.comments = []), u.isEmptyObject(a.comments[s]) && (a.comments[s] = {}), 
            a.comments[s].avatar = t.currentTarget.dataset.avatar, a.comments[s].name = t.currentTarget.dataset.name, 
            u.saveDetail(a);
        } else if ("info" == n) (r = wx.getStorageSync("info")).name = t.currentTarget.dataset.name, 
        r.avatar = t.currentTarget.dataset.avatar, wx.setStorageSync("info", r), u.saveDetail(a); else if ("newsAvatar" == n) {
            var r = wx.getStorageSync("info");
            r.newsAvatar = t.currentTarget.dataset.avatar, wx.setStorageSync("info", r), u.saveDetail(a);
        } else if ("zhuangx" == n) wx.setStorageSync("zhuangx_user", {
            user_name: t.currentTarget.dataset.name,
            avatar: t.currentTarget.dataset.avatar
        }); else if (n.indexOf("_") > 0) {
            var c = (l = n.split("_"))[0], o = l[1], g = wx.getStorageSync(c);
            u.isEmptyObject(g) && (g = {}), u.isEmptyObject(g[o]) && (g[o] = {}), u.isEmptyObject(g[o].list) && (g[o].list = []), 
            (s = wx.getStorageSync("current_" + c + "_" + o + "_index")) || (s = 0), u.isEmptyObject(g[o].list[s]) && (g[o].list[s] = {}), 
            g[o].list[s].avatar = t.currentTarget.dataset.avatar, g[o].list[s].name = t.currentTarget.dataset.name, 
            wx.setStorageSync(c, g);
        } else if (n.indexOf("-") > 0) {
            var l = n.split("-"), c = l[0], o = l[1], g = wx.getStorageSync(c);
            u.isEmptyObject(g) && (g = {}), u.isEmptyObject(g[o]) && (g[o] = {}), u.isEmptyObject(g[o].users) && (g[o].users = []);
            var d = {
                avatar: t.currentTarget.dataset.avatar,
                name: t.currentTarget.dataset.name
            };
            g[o].users.push(d), wx.setStorageSync(c, g);
        }
        wx.navigateBack();
    },
    handleZanTabChange: function(a) {
        var s, n = a.componentId;
        e = a.selectedId, r = 1, this.setData((s = {}, t(s, n + ".selectedId", e), t(s, "list", null), 
        s)), this.getList(e, "");
    }
}));