var t, a, s, e = getApp(), i = require("../../../zanui/index"), n = require("../../../utils/util.js"), o = require("../../../api.js"), r = require("../../../utils/upload.js"), l = require("../selectUser/selectUser.js");

Page(Object.assign({}, i.Toast, {
    data: {
        app: {}
    },
    onLoad: function(t) {
        console.log(t), a = t.app, s = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: a,
            type: s
        });
    },
    init: function() {
        var e = wx.getStorageSync(a);
        n.isEmptyObject(e) && (e = {}), n.isEmptyObject(e[s]) && (e[s] = {}), n.isEmptyObject(e[s].list) && (e[s].list = []), 
        n.isEmptyObject(e[s].users) && (e[s].users = []), (t = wx.getStorageSync("current_" + a + "_" + s + "_index")) || (t = 0), 
        n.isEmptyObject(e[s].list[t]) && (e[s].list[t] = {});
        var i = wx.getStorageSync("temp_jietu_select_user");
        i && (e[s].list[t] = i, wx.removeStorageSync("temp_jietu_select_user")), this.data[a] = e, 
        this.setData({
            app: this.data[a],
            index: t
        }), !n.isEmptyObject(e[s].users) && e[s].users[0] && e[s].users[0].name && e[s].list[t].name == e[s].users[0].name ? this.setData({
            isself: 1
        }) : this.setData({
            isself: 0
        });
    },
    bindContent: function(e) {
        console.log(e), this.data[a][s].list[t][e.currentTarget.id] = e.detail.value, wx.setStorageSync(a, this.data[a]);
    },
    afterLinkAvatarChoose: function(e) {
        var i = this;
        i.data[a][s].list[t].linkAvatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", i.setData({
            app: i.data[a]
        }), wx.setStorageSync(a, i.data[a]), i.setData({
            disabled: !0
        }), r.uploadSingleB({
            path: e,
            state: 1,
            uname: s
        }, "jietu_picture_", function(e) {
            e ? (i.data[a][s].list[t].linkAvatar = e.url, i.setData({
                app: i.data[a]
            }), wx.setStorageSync(a, i.data[a])) : i.showZanToast("上传失败，请稍后再试呢"), i.setData({
                disabled: !1
            });
        });
    },
    linkAvatar: function(t) {
        var a = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(t) {
                a.afterLinkAvatarChoose(t.tempFilePaths[0]);
            }
        });
    },
    switchChange: function(e) {
        console.log(e), this.data[a][s].list[t].isFail = e.detail.value, wx.setStorageSync(a, this.data[a]);
    },
    saveData: function() {
        wx.setStorageSync(a, this.data[a]);
    },
    formSubmit: function(i) {
        i.detail.formId && n.dealFormIds(i.detail.formId);
        var r = e.globalData.gloabalFomIds;
        r && r.length > 2 && o.saveformids(JSON.stringify(r), function() {
            e.globalData.gloabalFomIds = [];
        });
        var l = this.data[a];
        l[s].list[t].avatar ? l[s].list[t].name ? l[s].list[t].linkTitle ? l[s].list[t].linkContent ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("转发描述必填哦") : this.showZanToast("转发链接标题必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        l.edit(a, s, "urlAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var e = this;
        l.selectUser(e, a, s, t), a ? e.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        l.showEditUser(t, "选择成员", a, s);
    },
    back: function() {
        var t = this;
        l.back(t, "转发");
    }
}));