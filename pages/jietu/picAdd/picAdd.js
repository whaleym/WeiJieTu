var t, e, a, s = getApp(), i = require("../../../zanui/index"), o = require("../../../utils/util.js"), n = require("../../../api.js"), c = require("../../../utils/upload.js"), r = require("../selectUser/selectUser.js");

Page(Object.assign({}, i.Toast, {
    data: {
        app: {}
    },
    onLoad: function(t) {
        console.log(t), e = t.app, a = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: e,
            type: a
        });
    },
    init: function() {
        var s = wx.getStorageSync(e);
        o.isEmptyObject(s) && (s = {}), o.isEmptyObject(s[a]) && (s[a] = {}), o.isEmptyObject(s[a].list) && (s[a].list = []), 
        o.isEmptyObject(s[a].users) && (s[a].users = []), (t = wx.getStorageSync("current_" + e + "_" + a + "_index")) || (t = 0), 
        o.isEmptyObject(s[a].list[t]) && (s[a].list[t] = {});
        var i = wx.getStorageSync("temp_jietu_select_user");
        i && (s[a].list[t] = i, wx.removeStorageSync("temp_jietu_select_user")), this.data[e] = s, 
        this.setData({
            app: this.data[e],
            index: t
        }), !o.isEmptyObject(s[a].users) && s[a].users[0] && s[a].users[0].name && s[a].list[t].name == s[a].users[0].name ? this.setData({
            isself: 1
        }) : this.setData({
            isself: 0
        });
    },
    saveData: function() {
        wx.setStorageSync(e, this.data[e]);
    },
    switchChange: function(s) {
        console.log(s), this.data[e][a].list[t].isFail = s.detail.value, wx.setStorageSync(e, this.data[e]);
    },
    selectPic: function(t) {
        var e = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(t) {
                e.afterPicChoose(t.tempFilePaths[0]);
            }
        });
    },
    afterPicChoose: function(s) {
        var i = this;
        i.data[e][a].list[t].pic = {
            url: "https://wsgroup.hmset.com/images/wjtq/other/uploading.png",
            width: 300,
            height: 300
        }, i.setData({
            app: i.data[e]
        }), wx.setStorageSync(e, i.data[e]), i.setData({
            disabled: !0
        }), c.uploadSingleB({
            path: s,
            state: 1,
            uname: a
        }, "jietu_picture_", function(s) {
            s ? (n.checkImage(s.url), i.data[e][a].list[t].pic = {
                url: s.url,
                width: s.width,
                height: s.height
            }, i.setData({
                app: i.data[e]
            }), wx.setStorageSync(e, i.data[e])) : i.showZanToast("上传失败，请稍后再试呢"), i.setData({
                disabled: !1
            });
        });
    },
    formSubmit: function(i) {
        i.detail.formId && o.dealFormIds(i.detail.formId);
        var c = s.globalData.gloabalFomIds;
        c && c.length > 2 && n.saveformids(JSON.stringify(c), function() {
            s.globalData.gloabalFomIds = [];
        });
        var r = this.data[e];
        r[a].list[t].avatar ? r[a].list[t].name ? o.isEmptyObject(r[a].list[t].pic) ? this.showZanToast("必须选择图片呢") : (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        r.edit(e, a, "picAdd");
    },
    selectUser: function(t) {
        console.log(t);
        var s = this;
        r.selectUser(s, e, a, t), e ? s.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        r.showEditUser(t, "选择成员", e, a);
    },
    back: function() {
        var t = this;
        r.back(t, "图片消息");
    }
}));