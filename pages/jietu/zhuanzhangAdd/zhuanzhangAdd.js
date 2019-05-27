var t, a, i, s = getApp(), e = require("../../../zanui/index"), n = require("../../../utils/util.js"), h = require("../../../api.js"), u = (require("../../../utils/upload.js"), 
require("../selectUser/selectUser.js"));

Page(Object.assign({}, e.Toast, {
    data: {
        app: {},
        types: [ {
            value: 0,
            name: "转账"
        }, {
            value: 1,
            name: "收钱"
        } ]
    },
    typeChange: function(s) {
        this.data[a][i].list[t].typeIndex = s.detail.value, "0" != s.detail.value || this.data[a][i].list[t].zhuanzhang_shuoming || this.data[a][i].list[t].name && !n.isEmptyObject(this.data[a][i].users) && this.data[a][i].users[0].name && (this.data[a][i].list[t].name == this.data[a][i].users[0].name ? !n.isEmptyObject(this.data[a][i].users[1]) && this.data[a][i].users[1].name ? this.data[a][i].list[t].zhuanzhang_shuoming = "转账给" + this.data[a][i].users[1].name : this.data[a][i].list[t].zhuanzhang_shuoming = "转账给***" : this.data[a][i].list[t].zhuanzhang_shuoming = "转账给你"), 
        this.setData({
            app: this.data[a]
        }), wx.setStorageSync(a, this.data[a]);
    },
    onLoad: function(t) {
        console.log(t), a = t.app, i = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: a,
            type: i
        });
    },
    init: function() {
        var s = wx.getStorageSync(a);
        n.isEmptyObject(s) && (s = {}), n.isEmptyObject(s[i]) && (s[i] = {}), n.isEmptyObject(s[i].list) && (s[i].list = []), 
        (t = wx.getStorageSync("current_" + a + "_" + i + "_index")) || (t = 0), n.isEmptyObject(s[i].list[t]) && (s[i].list[t] = {});
        var e = wx.getStorageSync("temp_jietu_select_user");
        e && (s[i].list[t] = e, wx.removeStorageSync("temp_jietu_select_user")), this.data[a] = s, 
        this.setData({
            app: this.data[a],
            index: t
        });
    },
    bindContent: function(s) {
        console.log(s), this.data[a][i].list[t][s.currentTarget.id] = s.detail.value, "zhuanzhang_shuoming" === s.currentTarget.id && this.setData({
            zhuanzhang_shuoming: s.detail.value,
            zhuanzhang_shuomingEdit: !0
        }), wx.setStorageSync(a, this.data[a]);
    },
    switchChange: function(s) {
        if (this.data[a][i].list[t].yishou = s.detail.value, this.setData({
            app: this.data[a]
        }), s.detail.value) {
            e = this.data.zhuanzhang_shuomingEdit ? this.data.zhuanzhang_shuoming : "";
            this.setData({
                zhuanzhang_shuoming: e,
                hasZhuanzhang_shuoming: !0,
                yilinqu: !0
            });
        } else {
            var e = this.data[a][i].list[t].zhuanzhang_shuoming;
            this.setData({
                zhuanzhang_shuoming: e,
                hasZhuanzhang_shuoming: !0,
                yilinqu: !1
            });
        }
        wx.setStorageSync(a, this.data[a]);
    },
    saveData: function() {
        if (this.data[a][i].list[t].zhuanzhang_price) {
            s = new Number(this.data[a][i].list[t].zhuanzhang_price);
            this.data[a][i].list[t].zhuanzhang_price = s.toFixed(2);
        }
        if (this.data[a][i].list[t].shouqian_price) {
            var s = new Number(this.data[a][i].list[t].shouqian_price);
            this.data[a][i].list[t].shouqian_price = s.toFixed(2);
        }
        this.data.yilinqu && !this.data.zhuanzhang_shuoming && (this.data[a][i].list[t].zhuanzhang_shuoming = ""), 
        wx.setStorageSync(a, this.data[a]);
    },
    formSubmit: function(e) {
        e.detail.formId && n.dealFormIds(e.detail.formId);
        var u = s.globalData.gloabalFomIds;
        u && u.length > 2 && h.saveformids(JSON.stringify(u), function() {
            s.globalData.gloabalFomIds = [];
        });
        var o = this.data[a];
        o[i].list[t].avatar ? o[i].list[t].name ? void 0 !== o[i].list[t].typeIndex ? 0 != o[i].list[t].typeIndex || o[i].list[t].zhuanzhang_price ? 0 != o[i].list[t].typeIndex || o[i].list[t].zhuanzhang_shuoming || this.data.yilinqu ? 1 != o[i].list[t].typeIndex || o[i].list[t].shouqian_price ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("收钱金额必填哦") : this.showZanToast("转账说明必填哦") : this.showZanToast("转账金额必填哦") : this.showZanToast("类型必选哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        u.edit(a, i, "zhuanzhangAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var s = this;
        u.selectUser(s, a, i, t), a ? s.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        u.showEditUser(t, "选择成员", a, i);
    },
    back: function() {
        var t = this;
        u.back(t, "转账消息");
    }
}));