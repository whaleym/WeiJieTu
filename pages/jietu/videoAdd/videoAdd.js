var t, a, e, s = getApp(), i = require("../../../zanui/index"), n = require("../../../utils/util.js"), o = require("../../../api.js"), l = (require("../../../utils/upload.js"), 
require("../selectUser/selectUser.js"));

Page(Object.assign({}, i.Toast, {
    data: {
        app: {},
        types: [ {
            value: 0,
            name: "视频"
        }, {
            value: 1,
            name: "语音"
        } ],
        status: [ {
            value: 0,
            name: "正常通话"
        }, {
            value: 1,
            name: "已取消"
        }, {
            value: 2,
            name: "已拒绝"
        }, {
            value: 3,
            name: "对方已取消"
        }, {
            value: 4,
            name: "对方已拒绝"
        } ]
    },
    typeChange: function(s) {
        this.data[a][e].list[t].typeIndex = s.detail.value, this.setData({
            app: this.data[a]
        }), wx.setStorageSync(a, this.data[a]);
    },
    statusChange: function(s) {
        this.data[a][e].list[t].statusIndex = s.detail.value, this.setData({
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
        i && (s[e].list[t] = i, wx.removeStorageSync("temp_jietu_select_user")), s[e].list[t].is_video || (s[e].list[t].is_video = !0), 
        this.data[a] = s, this.setData({
            app: this.data[a],
            index: t
        });
    },
    bindContent: function(s) {
        console.log(s), this.data[a][e].list[t][s.currentTarget.id] = s.detail.value, wx.setStorageSync(a, this.data[a]);
    },
    saveData: function() {
        if (this.data[a][e].list[t].videoLength) {
            var s = this.data[a][e].list[t].videoLength.split(":");
            2 == s.length && (1 == s[0].length && (s[0] = "0" + s[0]), 1 == s[1].length && (s[1] = "0" + s[1]), 
            this.data[a][e].list[t].videoLength = s[0] + ":" + s[1]);
        }
        wx.setStorageSync(a, this.data[a]);
    },
    formSubmit: function(i) {
        i.detail.formId && n.dealFormIds(i.detail.formId);
        var l = s.globalData.gloabalFomIds;
        l && l.length > 2 && o.saveformids(JSON.stringify(l), function() {
            s.globalData.gloabalFomIds = [];
        });
        var d = this.data[a];
        d[e].list[t].avatar ? d[e].list[t].name ? void 0 !== d[e].list[t].typeIndex ? void 0 !== d[e].list[t].statusIndex ? 0 != d[e].list[t].statusIndex || !d[e].list[t].videoLength || /^(?:\d{1,3})(?::[0-5]{0,1}\d)$/.test(d[e].list[t].videoLength) ? 0 != d[e].list[t].statusIndex || d[e].list[t].videoLength ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("通话时长必填哦") : this.showZanToast("通话时长格式为：6:30 哦") : this.showZanToast("状态必选哦") : this.showZanToast("类型必选哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        l.edit(a, e, "videoAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var s = this;
        l.selectUser(s, a, e, t), a ? s.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        l.showEditUser(t, "选择成员", a, e);
    },
    back: function() {
        var t = this;
        l.back(t, "视频/语音聊天");
    }
}));