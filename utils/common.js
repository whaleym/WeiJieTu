var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, t = (require("../api.js"), require("./wcache.js"));

module.exports = {
    checkPay: function(e, n, r, u, c, i) {
        console.log(void 0 === n ? "undefined" : o(n));
        var l = wx.getStorageSync("pay" + e), p = t.get("isVip");
        // if (!n || l || p) return !0;
        c.open({
            title: "提示",
            content: r,
            verticalButtons: !0,
            buttons: [ {
                text: "开通VIP",
                bold: !0,
                color: "#4b0",
                onTap: function(o) {
                    wx.navigateTo({
                        url: "/pages/about/about?type=vip"
                    });
                }
            }, {
                text: "取消",
                bold: 0,
                onTap: function(o) {
                    return !1;
                }
            } ]
        });
    }
};