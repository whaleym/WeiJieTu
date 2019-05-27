function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("./app-config")), r = t(require("./file-station"));

exports.default = {
    getSystemToolRect: function() {
        var t = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        }, r = e.default.systemInfo;
        return "ios" === r.platform || "devtools" === r.platform ? (t.w = 88, t.h = 32, 
        t.x = r.screenWidth - t.w - 7, t.y = r.statusBarHeight + 4) : (t.w = 98, t.h = 36, 
        t.x = r.screenWidth - t.w - 9, t.y = r.statusBarHeight + 4), t;
    },
    getBackButtonTextPosition: function() {
        var t = e.default.systemInfo, r = {
            x: 0,
            y: 0
        };
        return "ios" !== t.platform && "devtools" !== t.platform || (r.x = 25, r.y = t.statusBarHeight + 22), 
        r;
    },
    getMoreButtonImage: function() {
        return new Promise(function(t, a) {
            var s = e.default.systemInfo, i = {
                src: "",
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            "ios" === s.platform || "devtools" === s.platform ? (i.src = "https://wsgroup.hmset.com/images/wjtq/other/navbar_more_ios.png", 
            i.w = 21, i.h = 5, i.x = s.screenWidth - i.w - 14, i.y = s.statusBarHeight + 19) : (i.src = "https://wsgroup.hmset.com/images/wjtq/other/navbar_more_android.png", 
            i.w = 17, i.h = 3, i.x = s.screenWidth - i.w - 20, i.y = s.statusBarHeight + Math.ceil((s.navigationBarHeight - i.h) / 2)), 
            r.default.getLocalFileUrl(i.src).then(function(e) {
                i.src = e, t(i);
            });
        });
    },
    getCameraButtonImage: function() {
        return new Promise(function(t, a) {
            var s = e.default.systemInfo, i = {
                src: "",
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            "android" !== s.platform ? (i.src = "https://wsgroup.hmset.com/images/wjtq/other/navbar_camera_black_ios.png", 
            i.w = 22, i.h = 17, i.x = s.screenWidth - i.w - 14, i.y = s.statusBarHeight + 13) : (i.src = "https://wsgroup.hmset.com/images/wjtq/other/navbar_camera_black_android.png", 
            i.w = 21, i.h = 16, i.x = s.screenWidth - i.w - 17, i.y = s.statusBarHeight + Math.ceil((s.navigationBarHeight - i.h) / 2)), 
            r.default.getLocalFileUrl(i.src).then(function(e) {
                i.src = e, t(i);
            });
        });
    }
};