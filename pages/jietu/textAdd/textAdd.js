var t, s, i, a = getApp(), e = require("../../../zanui/index"), o = require("../../../utils/util.js"), n = require("../../../api.js"), r = (require("../../../utils/upload.js"), 
require("../selectUser/selectUser.js")), l = require("../../../WxEmojiView/WxEmojiView.js");

Page(Object.assign({}, e.Toast, {
    data: {
        app: {}
    },
    onLoad: function(t) {
        console.log(t), s = t.app, i = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: s,
            type: i
        });
    },
    init: function() {
        var a = wx.getStorageSync(s);
        o.isEmptyObject(a) && (a = {}), o.isEmptyObject(a[i]) && (a[i] = {}), o.isEmptyObject(a[i].list) && (a[i].list = []), 
        o.isEmptyObject(a[i].users) && (a[i].users = []), (t = wx.getStorageSync("current_" + s + "_" + i + "_index")) || (t = 0), 
        o.isEmptyObject(a[i].list[t]) && (a[i].list[t] = {}), this.data[s] = a;
        var e = this;
        l.bindThis(e);
        var n = a[i].list[t].content;
        n || (n = ""), l.buildTextAreaObjs(e, n && n.textAreaText ? n.textAreaText : n), 
        this.setData({
            app: this.data[s],
            index: t
        }), console.log(a[i].users), console.log(a[i].list[t]), !o.isEmptyObject(a[i].users) && a[i].users[0] && a[i].users[0].name && a[i].list[t].name == a[i].users[0].name ? this.setData({
            isself: 1
        }) : this.setData({
            isself: 0
        });
    },
    bindContent: function(a) {
        var e = this;
        l.WxEmojiTextareaBlur(e, a), this.data[s][i].list[t].content = this.data.WxEmojiObjs, 
        wx.setStorageSync(s, this.data[s]);
    },
    switchChange: function(a) {
        console.log(a), this.data[s][i].list[t].isFail = a.detail.value, wx.setStorageSync(s, this.data[s]);
    },
    saveData: function() {
        wx.setStorageSync(s, this.data[s]);
    },
    formSubmit: function(e) {
        e.detail.formId && o.dealFormIds(e.detail.formId);
        var r = a.globalData.gloabalFomIds;
        r && r.length > 2 && n.saveformids(JSON.stringify(r), function() {
            a.globalData.gloabalFomIds = [];
        });
        var l = this.data[s];
        l[i].list[t].avatar ? l[i].list[t].name ? l[i].list[t].content ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("内容必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        r.edit(s, i, "textAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var a = this;
        r.selectUser(a, s, i, t), s ? a.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        r.showEditUser(t, "选择成员", s, i);
    },
    back: function() {
        var t = this;
        r.back(t, "文字消息");
    },
    WxEmojiTextareaFocus: function(t) {
        var s = this;
        l.WxEmojiTextareaFocus(s, t), this.setData({
            isShowEmoji: !1
        });
    },
    wxPreEmojiTap: function(a) {
        var e = this;
        l.wxPreEmojiTap(e, a), this.data[s][i].list[t].content = this.data.WxEmojiObjs;
    },
    showEmoji: function() {
        this.setData({
            isShowEmoji: !this.data.isShowEmoji
        });
    },
    hideWxEmojiTextarea: function() {
        this.setData({
            isShowEmoji: !1
        });
    }
}));