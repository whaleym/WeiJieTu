var t, a, e = getApp(), i = require("../../../zanui/index"), s = require("../../../utils/util.js"), n = require("../../../api.js"), o = require("../../../utils/upload.js"), r = require("../selectUser/selectUser.js");

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
    onShow: function(t) {
        e ? this.init() : console.log("dd");
    },
    init: function() {
        var i = wx.getStorageSync(e);
        s.isEmptyObject(i) && (i = {}), s.isEmptyObject(i[a]) && (i[a] = {}), s.isEmptyObject(i[a].list) && (i[a].list = []), 
        (t = wx.getStorageSync("current_" + e + "_" + a + "_index")) || (t = 0), s.isEmptyObject(i[a].list[t]) && (i[a].list[t] = {});
        var n = wx.getStorageSync("temp_jietu_select_user");
        n && (i[a].list[t] = n, wx.removeStorageSync("temp_jietu_select_user")), this.data[e] = i, 
        this.setData({
            app: this.data[e],
            index: t
        });
    },
    bindContent: function(i) {
        console.log(i), this.data[e][a].list[t][i.currentTarget.id] = i.detail.value, wx.setStorageSync(e, this.data[e]);
    },
    afterLinkAvatarChoose: function(i) {
        var s = this;
        s.data[e][a].list[t].linkAvatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", s.setData({
            app: s.data[e]
        }), wx.setStorageSync(e, s.data[e]), s.setData({
            disabled: !0
        }), o.uploadSingleB({
            path: i,
            state: 1
        }, "jietu_picture_", function(i) {
            i ? (n.checkImage(i.url), s.data[e][a].list[t].linkAvatar = i.url, s.setData({
                app: s.data[e]
            }), wx.setStorageSync(e, s.data[e])) : s.showZanToast("上传失败，请稍后再试呢"), s.setData({
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
    saveData: function() {
        wx.setStorageSync(e, this.data[e]);
    },
    formSubmit: function(i) {
        var s = this.data[e];
        s[a].list[t].avatar ? s[a].list[t].name ? s[a].list[t].linkTitle ? s[a].list[t].linkContent ? (this.saveData(), 
        wx.navigateBack()) : this.showZanToast("转发描述必填哦") : this.showZanToast("转发链接标题必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    edit: function() {
        r.edit(e, a);
    },
    selectUser: function(t) {
        console.log(t);
        var i = this;
        r.selectUser(i, e, a, t), e ? i.init() : console.log("dd");
    },
    showEditUser: function() {
        var t = this;
        r.showEditUser(t, "选择成员", e, a);
    },
    back: function() {
        var t = this;
        r.back(t, "转发");
    }
}));