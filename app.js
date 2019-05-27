function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("./utils/polyfills")), 
a = e(require("./utils/app-config")), 
r = e(require("./utils/user")), 
s = require("./utils/config.js"), 
n = require("./WxEmojiView/WxEmojiView.js"), 
t = require("./WxEmojiView/data.js");

App({
    onLaunch: function(e) {
        i.default.add();
        r.default.init();
        a.default.init();
        this.globalData.system_info = wx.getSystemInfoSync();
        r.default.isLogin && (this.globalData.user = r.default.oldUserInfo);
        e && e.scene ? this.globalData.scene = e.scene : this.globalData.scene = ""; 
        e && e.referrerInfo ? this.globalData.referrerInfo = JSON.stringify(e.referrerInfo) : this.globalData.referrerInfo = "";
        e && e.scene && ("1012" == e.scene || "1048" == e.scene)
        var o = /\[[^\[\]]+?\]/g;
        n.init(o, t);
    },
    onHide: function() {},
    onShow: function(e) {
        // console.log(e);
        e && e.query ? e.query.sharerId ? this.globalData.from_user_id = e.query.sharerId : e.query.scene && 24 != e.query.scene.length && (this.globalData.from_user_id = e.query.scene) : this.globalData.from_user_id = "", 
        e && e.scene && "1038" == e.scene && wx.switchTab({
            url: "/pages/index/index"
        });
    },
    globalData: {
        ip: "https://wsgroup.hmset.com/",
        // ip: "http://10.80.5.102:3000/",
        user: null,
        previews: {},
        system_info: null,
        from: "zhuangfa",
        hasPreviews: false,
        shenhe: new Date(2018, 5, 5) > new Date(),
        lockedCount: 5,
        ServerLockedCount:5
    }
});