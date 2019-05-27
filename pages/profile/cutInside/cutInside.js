var o = require("../../../utils/weCropper"), e = (require("../../../api.js"), require("../../../utils/util.js"), 
require("../../../zanui/index")), t = require("../../../utils/upload.js"), i = wx.getSystemInfoSync(), a = i.windowWidth;

Page(Object.assign({}, e.Toast, {
    data: {
        cropperOpt: {
            id: "cropper",
            width: i.windowWidth,
            height: a,
            scale: 2.5,
            zoom: 8
        }
    },
    touchStart: function(o) {
        this.wecropper.touchStart(o);
    },
    touchMove: function(o) {
        this.wecropper.touchMove(o);
    },
    touchEnd: function(o) {
        this.wecropper.touchEnd(o);
    },
    getCropperImage: function() {
        var o = this;
        this.wecropper.getCropperImage(function(e) {
            if (e) {
                var i = o;
                wx.showNavigationBarLoading(), wx.showToast({
                    title: "上传中……",
                    duration: 2e4,
                    icon: "loading"
                }), t.uploadSingleB({
                    path: e,
                    state: 1
                }, "avatar_", function(o) {
                    console.log(o), o ? (wx.hideNavigationBarLoading(), wx.hideToast(), wx.setStorageSync("avatar_cat_url", o.url), 
                    wx.navigateBack()) : (wx.hideNavigationBarLoading(), wx.hideToast(), i.showZanToast("上传失败，请稍后再试呢"));
                });
            } else console.log("获取图片失败，请稍后重试");
        });
    },
    onReady: function() {
        var o = wx.getSystemInfoSync().windowHeight, e = ((o - a) / 2 - 50) / 2 + 50 - 10, t = (o - a) / 2 - 50;
        this.setData({
            remindBottom: e,
            remidHeight: t
        });
    },
    onLoad: function(e) {
        var t = e.src, i = this.data.cropperOpt;
        new o(i).on("ready", function(o) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(o) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", o), 
            wx.showToast({
                title: "加载中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(o) {
            console.log("picture loaded"), console.log("current canvas context:", o), wx.hideToast();
        }), this.wecropper.pushOrign(t);
    }
}));