var e, a = getApp(), t = require("../../utils/util.js"), i = require("../../api.js"), l = 0, r = {};

Page({
    data: {},
    onLoad: function(a) {
        var i = a.type;
        r = t.getDetail();
        var l = wx.getStorageSync("current_detail_index");
        99 != l && l || (l = 0), e = [ l + 1 + "分钟前", "1小时前", "昨天", "5天前", "2016年5月1日 10:00" ], 
        r.time || (r.time = e[0]), this.setData({
            type: i,
            detail: r
        });
        var s = "";
        switch (i) {
          case "time":
            s = "填写发布时间";
            break;

          case "source":
            s = "填写来源";
            break;

          case "loc":
            s = "填写所在位置";
        }
        wx.setNavigationBarTitle({
            title: s
        });
    },
    formSubmit: function(e) {
        e.detail.formId && t.dealFormIds(e.detail.formId);
        var l = a.globalData.gloabalFomIds;
        switch (l && l.length > 2 && i.saveformids(JSON.stringify(l), function() {
            a.globalData.gloabalFomIds = [];
        }), this.data.type) {
          case "time":
            var s = e.detail.value.time;
            r.time = s;
            break;

          case "source":
            var c = e.detail.value.source;
            r.source = c;
            break;

          case "loc":
            var o = e.detail.value.city, d = e.detail.value.loc;
            r.city = o, r.loc = d;
        }
        t.saveDetail(r), wx.navigateBack();
    },
    changeTime: function() {
        l == e.length - 1 ? l = 0 : l++, e[l] == r.time && (l == e.length - 1 ? l = 0 : l++), 
        r.time = e[l], this.setData({
            detail: r
        });
    }
});