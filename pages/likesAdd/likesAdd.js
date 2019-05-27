var a = getApp(), t = require("../../utils/util.js"), i = require("../../api.js");

Page({
    data: {
        detail: {}
    },
    onLoad: function(a) {
        this.data.detail = t.getDetail(), console.log(this.data.detail), t.isEmptyObject(this.data.detail.likes) && (this.data.detail.likes = ""), 
        this.setData({
            detail: this.data.detail
        });
    },
    formSubmit: function(e) {
        e.detail.formId && t.dealFormIds(e.detail.formId);
        var d = a.globalData.gloabalFomIds;
        d && d.length > 2 && i.saveformids(JSON.stringify(d), function() {
            a.globalData.gloabalFomIds = [];
        }), t.saveDetail(this.data.detail), wx.navigateBack();
    },
    bindLikes: function(a) {
        console.log(a), this.data.detail.likes = a.detail.value, t.saveDetail(this.data.detail);
    },
    random: function() {
        var a = this;
        wx.showNavigationBarLoading(), wx.showToast({
            title: "Loading……",
            duration: 2e3,
            icon: "loading"
        }), i.random(1, function(i) {
            t.endWith(a.data.detail.likes, ",") || !a.data.detail.likes ? a.data.detail.likes += i.user[0].name : a.data.detail.likes += "," + i.user[0].name, 
            a.setData({
                detail: a.data.detail
            }), wx.hideToast(), wx.hideNavigationBarLoading();
        });
    }
});