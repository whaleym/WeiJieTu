var t, s, e, a = getApp(), i = require("../../../zanui/index"), n = require("../../../utils/util.js"), o = require("../../../api.js"), l = (require("../../../utils/upload.js"), 
require("../selectUser/selectUser.js"));

Page(Object.assign({}, i.Toast, {
    data: {
        app: {}
    },
    onLoad: function(t) {
        s = t.app, e = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: s,
            type: e
        });
    },
    init: function() {
        var a = wx.getStorageSync(s);
        n.isEmptyObject(a) && (a = {}), n.isEmptyObject(a[e]) && (a[e] = {}), n.isEmptyObject(a[e].list) && (a[e].list = []), 
        n.isEmptyObject(a[e].users) && (a[e].users = []), (t = wx.getStorageSync("current_" + s + "_" + e + "_index")) || (t = 0), 
        n.isEmptyObject(a[e].list[t]) && (a[e].list[t] = {});
        var i = wx.getStorageSync("temp_jietu_select_user");
        i && (a[e].list[t] = i, wx.removeStorageSync("temp_jietu_select_user")), this.data[s] = a, 
        this.setData({
            app: this.data[s],
            index: t
        }), !n.isEmptyObject(a[e].users) && a[e].users[0] && a[e].users[0].name && a[e].list[t].name == a[e].users[0].name ? this.setData({
            isself: 1
        }) : this.setData({
            isself: 0
        });
    },
    sliderChange: function(a) {
        console.log(a), this.data[s][e].list[t].voice_length = parseInt(a.detail.value), 
        this.setData({
            app: this.data[s]
        }), wx.setStorageSync(s, this.data[s]);
    },
    saveData: function() {
        wx.setStorageSync(s, this.data[s]);
    },
    switchChange: function(a) {
        console.log(a), this.data[s][e].list[t].isFail = a.detail.value, wx.setStorageSync(s, this.data[s]);
    },
    formSubmit: function(i) {
        i.detail.formId && n.dealFormIds(i.detail.formId);
        var l = a.globalData.gloabalFomIds;
        l && l.length > 2 && o.saveformids(JSON.stringify(l), function() {
            a.globalData.gloabalFomIds = [];
        });
        var r = this.data[s];
        r[e].list[t].avatar ? r[e].list[t].name ? r[e].list[t].voice_length ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("语音时长必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        l.edit(s, e, "voiceAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var a = this;
        l.selectUser(a, s, e, t), s ? a.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        l.showEditUser(t, "选择成员", s, e);
    },
    back: function() {
        var t = this;
        l.back(t, "语音消息");
    }
}));