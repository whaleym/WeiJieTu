var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("./user")), e = (require("./util.js"), require("./config.js")), t = require("./wcache.js");

module.exports = {
    myRequest: function(o, s, i, n, u, d) {
        var l = getApp();
        s.version = e.config.version, s.platform = l.globalData.system_info.platform ? l.globalData.system_info.platform : "", 
        s.app = e.config.app_name, s.unionid = "", s.sid = a.default.sid, s.user_id = a.default.openId, 
        a.default.isLogin && (s.unionid = a.default.userInfo.unionid); 
        // console.log("向服务器请求数据"); 
        // console.log("o:", o); 
        // console.log("s:", s); 
        wx.request({
            url: o,
            data: s,
            header: {
                "Content-Type": "application/json"
            },
            success: function(a) {
                // console.log(a);
                a.data.success && i ? a.data.data ? (u && (d ? t.put(u, a.data.data, d) : t.put(u, a.data.data)), 
                i(a.data.data)) : (u && (d ? t.put(u, a.data, d) : t.put(u, a.data)), i(a.data)) : n ? n(a.data.message) : a.data.message && wx.showToast({
                    image: "/styles/info_icon.png",
                    title: a.data.message,
                    duration: 2e3
                });
            },
            fail: function(a) {
                // console.log(a);
                wx.showToast({
                    image: "/styles/info_icon.png",
                    title: "系统繁忙，请稍后再试",
                    duration: 2e3
                });
            }
        });
    }
};