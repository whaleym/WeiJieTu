getApp();

var t, e, m = require("../../utils/util.js"), i = 0, n = {};

Page({
    data: {},
    onLoad: function(i) {
        n = m.getDetail(), e = wx.getStorageSync("current_comment_index"), m.isEmptyObject(n.comments) && (n.comments = []), 
        e || (e = 0), t = [ e + 1 + "分钟前", "1小时前", "昨天", "5天前", "2016年5月1日 10:00" ], m.isEmptyObject(n.comments[e]) && (n.comments[e] = {}), 
        n.comments[e].time || (n.comments[e].time = t[0]), this.setData({
            detail: n,
            index: e
        });
    },
    formSubmit: function(t) {
        var i = t.detail.value.time;
        n.comments[e].time = i, m.saveDetail(n), wx.navigateBack();
    },
    changeTime: function() {
        i == t.length - 1 ? i = 0 : i++, t[i] == n.comments[e].time && (i == t.length - 1 ? i = 0 : i++), 
        n.comments[e].time = t[i], this.setData({
            detail: n
        });
    }
});