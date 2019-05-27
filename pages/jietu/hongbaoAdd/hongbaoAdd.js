var t, a, e, s = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../utils/user")), i = getApp(), o = require("../../../zanui/index"), n = require("../../../utils/util.js"), l = require("../../../api.js"), d = require("../selectUser/selectUser.js");

Page(Object.assign({}, o.Toast, {
    data: {
        app: {},
        types: [ {
            value: 0,
            name: "发红包"
        }, {
            value: 1,
            name: "收红包"
        } ]
    },
    typeChange: function(s) {
        console.log(this.data[a]), console.log(wx.getStorageSync(a)), this.data[a][e].list[t].typeIndex = s.detail.value, 
        this.setData({
            app: this.data[a]
        }), this.setFroms(this.data[a][e].list[t].name), wx.setStorageSync(a, this.data[a]);
    },
    setFroms: function(i) {
        var o = this, n = "oldlogin";
        s.default.isLogin && s.default.userInfo && (n = "login"), l[n](function(s) {
            s.user_name == i ? (console.log(o.data[a]), console.log(a), o.data[a][e].list[t].fromIndex = "0", 
            o.setData({
                froms: [ {
                    value: 0,
                    name: "你领取了自己发的红包"
                } ],
                app: o.data[a]
            }), console.log(o.data[a]), wx.setStorageSync(a, o.data[a])) : o.setData({
                froms: [ {
                    value: 0,
                    name: '你领取了"' + i + '"的红包'
                }, {
                    value: 1,
                    name: '"' + i + '"领取了你的红包'
                } ]
            });
        }, function() {
            o.setData({
                froms: [ {
                    value: 0,
                    name: '你领取了"' + i + '"的红包'
                }, {
                    value: 1,
                    name: '"' + i + '"领取了你的红包'
                } ]
            });
        }, "必须授权登录之后才能操作呢，是否重新授权登录？");
    },
    fromChange: function(s) {
        console.log(s.detail.value), console.log(this.data[a]), console.log(wx.getStorageSync(a)), 
        this.data[a][e].list[t].fromIndex = s.detail.value, this.setData({
            app: this.data[a]
        }), wx.setStorageSync(a, this.data[a]);
    },
    onLoad: function(t) {
        console.log(t), a = t.app, e = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: a,
            type: e
        });
    },
    init: function() {
        var s = wx.getStorageSync(a);
        n.isEmptyObject(s) && (s = {}), n.isEmptyObject(s[e]) && (s[e] = {}), n.isEmptyObject(s[e].list) && (s[e].list = []), 
        (t = wx.getStorageSync("current_" + a + "_" + e + "_index")) || (t = 0), n.isEmptyObject(s[e].list[t]) && (s[e].list[t] = {});
        var i = wx.getStorageSync("temp_jietu_select_user");
        i && (s[e].list[t] = i, wx.removeStorageSync("temp_jietu_select_user")), s[e].list[t].hongbao_price || (s[e].list[t].hongbao_price = 10), 
        this.data[a] = s, this.setData({
            app: this.data[a],
            index: t
        }), wx.setStorageSync(a, this.data[a]), s[e].list[t].name && this.setFroms(s[e].list[t].name);
    },
    bindContent: function(s) {
        console.log(s), this.data[a][e].list[t][s.currentTarget.id] = s.detail.value, wx.setStorageSync(a, this.data[a]);
    },
    switchChange: function(s) {
        console.log(s.detail.value), this.data[a][e].list[t].yilingwan = s.detail.value, 
        this.setData({
            app: this.data[a]
        }), wx.setStorageSync(a, this.data[a]);
    },
    saveData: function() {
        0 != this.data[a][e].list[t].typeIndex || this.data[a][e].list[t].hongbao_shuoming || (this.data[a][e].list[t].hongbao_shuoming = "恭喜发财，大吉大利"), 
        wx.setStorageSync(a, this.data[a]);
    },
    formSubmit: function(s) {
        s.detail.formId && n.dealFormIds(s.detail.formId);
        var o = i.globalData.gloabalFomIds;
        o && o.length > 2 && l.saveformids(JSON.stringify(o), function() {
            i.globalData.gloabalFomIds = [];
        });
        var d = this.data[a];
        d[e].list[t].avatar ? d[e].list[t].name ? void 0 !== d[e].list[t].typeIndex ? 1 != d[e].list[t].typeIndex || void 0 !== d[e].list[t].fromIndex ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("收红包类型必选哦") : this.showZanToast("类型必选哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        d.edit(a, e, "hongbaoAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var s = this;
        d.selectUser(s, a, e, t), a ? s.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        d.showEditUser(t, "选择成员", a, e);
    },
    back: function() {
        var t = this;
        d.back(t, "红包消息");
    }
}));