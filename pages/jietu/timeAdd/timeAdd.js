var t, a, i, e, s, n = getApp(), d = require("../../../zanui/index"), o = require("../../../utils/util.js"), l = require("../../../api.js");

Page(Object.assign({}, d.Toast, {
    data: {
        app: {}
    },
    onLoad: function(t) {
        console.log(t), a = t.app, i = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: a,
            type: i
        });
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        }), this.data[a][i].list[t].time = this.data.date + " " + this.data.time, wx.setStorageSync(a, this.data[a]);
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        }), this.data[a][i].list[t].time = this.data.date + " " + this.data.time, wx.setStorageSync(a, this.data[a]);
    },
    onShow: function(t) {
        a ? this.init() : console.log("dd");
    },
    init: function() {
        var n = wx.getStorageSync(a);
        o.isEmptyObject(n) && (n = {}), o.isEmptyObject(n[i]) && (n[i] = {}), o.isEmptyObject(n[i].list) && (n[i].list = []), 
        (t = wx.getStorageSync("current_" + a + "_" + i + "_index")) || (t = 0), o.isEmptyObject(n[i].list[t]) && (n[i].list[t] = {});
        var d = n[i].list[t].time;
        if (d) {
            var l = d.split(" ");
            2 == l.length ? (e = l[0], s = l[1]) : (e = o.getDateStr(), s = l[0]);
        } else e = o.getDateStr(), s = o.getTimeStr();
        this.data[a] = n, this.data[a][i].list[t].time = e + " " + s, this.setData({
            app: this.data[a],
            date: e,
            time: s,
            index: t
        });
    },
    saveData: function() {
        wx.setStorageSync(a, this.data[a]);
    },
    formSubmit: function(e) {
        e.detail.formId && o.dealFormIds(e.detail.formId);
        var s = n.globalData.gloabalFomIds;
        s && s.length > 2 && l.saveformids(JSON.stringify(s), function() {
            n.globalData.gloabalFomIds = [];
        }), this.data[a][i].list[t].time ? (this.saveData(), wx.navigateBack()) : this.showZanToast("时间必填哦");
    }
}));