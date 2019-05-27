require("../../../api.js");

var o = require("../../../utils/weCropper"), e = wx.getSystemInfoSync().windowWidth, t = e;

Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: t,
            height: t,
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
        this.wecropper.getCropperImage(function(o) {
            o ? (/*console.log(o), */wx.setStorageSync("zhuangx_clipImageUrl", o), wx.navigateBack({
                delta: 1
            })) : console.log("获取图片地址失败，请稍后重试");
        });
    },
    uploadTap: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths[0];
                o.wecropper.pushOrign(t);
            }
        });
    },
    onReady: function() {
        var o = wx.getSystemInfoSync().windowHeight, t = ((o - e) / 2 - 50) / 2 + 50 - 10, n = (o - e) / 2 - 50;
        this.setData({
            remindBottom: t,
            remidHeight: n
        });
    },
    onLoad: function(e) {
        // console.log("options.src", e.src, "options.width", e.width, "options.height", e.height);
        var n = e.width / e.height;
        if (n < 1) 
            var c = (r = t) * n; 
        else 
            var r = (c = t - 30) / n;
        var i = new o();
        i.cut.width = c, i.cut.height = r, i.cut.x = (t - c) / 2, i.cut.y = (t - r) / 2;
        var a = this.data.cropperOpt, s = this;
        new o(a).on("ready", function(o) {
            s.wecropper.pushOrign(e.src), console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(o) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", o), 
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(o) {
            console.log("picture loaded"), console.log("current canvas context:", o), wx.hideToast();
        }).on("beforeDraw", function(o, e) {
            console.log("before canvas draw,i can do something"), console.log("current canvas context:", o);
        }).updateCanvas();
    }
});