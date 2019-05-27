function t(t, a, r) {
    var n = t.data[a];
    i.isEmptyObject(n) && (n = {}), i.isEmptyObject(n[r]) && (n[r] = {}), i.isEmptyObject(n[r].users) && (n[r].users = []);
    var o = "oldlogin";
    e.default.isLogin && e.default.userInfo && (o = "login"), s[o](function(e) {
        i.isEmptyObject(n[r].users) && (n[r].users = [ {
            avatar: e.avatar,
            name: e.user_name
        } ], wx.setStorageSync("weixin", n)), t.setData({
            list: n[r].users
        });
    }, function() {
        t.setData({
            list: n[r].users
        });
    }, "必须授权登录之后才能操作呢，是否重新授权登录？");
}

var e = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../utils/user")), i = require("../../../utils/util.js"), s = require("../../../api.js");

module.exports = {
    init: t,
    edit: function(t, e, i) {
        "weixin" == t && "qunliao" == e ? (console.log(t + ":" + e), wx.redirectTo({
            url: "/pages/jietu/weixin/qunliaoshezhi/qunliaoshezhi?addType=" + i
        })) : "weixin" == t && "danliao" == e && (console.log(t + "-" + e), wx.redirectTo({
            url: "/pages/jietu/weixin/danliaoshezhi/danliaoshezhi?addType=" + i
        }));
    },
    selectUser: function(t, e, s, a) {
        console.log(a);
        var r = t.data[e];
        i.isEmptyObject(r) && (r = {}), i.isEmptyObject(r[s]) && (r[s] = {}), i.isEmptyObject(r[s].list) && (r[s].list = []);
        var n = wx.getStorageSync("current_" + e + "_" + s + "_index");
        n || (n = 0), i.isEmptyObject(r[s].list[n]) && (r[s].list[n] = {}), r[s].list[n].avatar = a.currentTarget.dataset.avatar, 
        r[s].list[n].name = a.currentTarget.dataset.name, wx.setStorageSync(e, r), t.setData({
            showEditUser: !1
        });
    },
    showEditUser: function(e, i, s, a) {
        wx.setNavigationBarTitle({
            title: i
        }), e.setData({
            showEditUser: !0
        }), t(e, s, a);
    },
    back: function(t, e) {
        t.setData({
            showEditUser: !1
        }), wx.setNavigationBarTitle({
            title: e
        });
    }
};