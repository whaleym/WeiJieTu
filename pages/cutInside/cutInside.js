var e, o, i, a, t = require("../../utils/weCropper"), n = require("../../api.js"), r = require("../../utils/util.js"), s = require("../../zanui/index"), c = require("../../utils/upload.js"), d = [ "裁剪", "生成换脸照", "生成大头贴", "生成美妆照", "生成滤镜照", "生成变妆照", "生成头像", "开始识别", "生成图片" ], w = wx.getSystemInfoSync();

Page(Object.assign({}, s.Toast, {
    data: {
        name: "",
        cropperOpt: {
            id: "cropper",
            width: w.windowWidth,
            height: w.windowWidth,
            scale: 2.5,
            zoom: 8
        }
    },
    touchStart: function(e) {
        this.wecropper.touchStart(e);
    },
    touchMove: function(e) {
        this.wecropper.touchMove(e);
    },
    touchEnd: function(e) {
        this.wecropper.touchEnd(e);
    },
    getCropperImage: function() {
        var t = this;
        this.wecropper.getCropperImage(function(s) {
            if (s) 
            if (8 == parseInt(o)) wx.setStorage({
                key: "linkCover",
                data: s
            }), wx.navigateBack(); else {
                var d = t;
                wx.showNavigationBarLoading(), wx.showToast({
                    title: "上传中……",
                    duration: 2e4,
                    icon: "loading"
                });
                c.uploadSingleB({
                    path: s,
                    state: 1,
                    uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
                }, "jietu_picture_", function(t) {
                    if (console.log(t), t) {
                        n.checkImage(t.url);
                        switch (wx.showNavigationBarLoading(), wx.showToast({
                            title: "处理中……",
                            duration: 2e4,
                            icon: "loading"
                        }), parseInt(o)) {
                          case 1:
                            n.bianLian(t.url, e, function(e) {
                                wx.hideNavigationBarLoading(), wx.hideToast(), r.downloadAndPreview(e.url, "军装照，卡通人物照，整蛊照，快来一键换脸吧！", "/pages/zhuangx/list/list?type=2", "生成中...");
                            }, function(e) {
                                console.log(e), wx.hideNavigationBarLoading(), wx.hideToast(), d.showZanToast(e), 
                                setTimeout(function() {
                                    wx.navigateBack();
                                }, 2e3);
                            });
                            break;

                          case 2:
                            n.sticker(t.url, e, function(e) {
                                wx.hideNavigationBarLoading(), wx.hideToast(), r.downloadAndPreview(e.url, "来做张大头贴吧？", "/pages/datoutie/edit/edit", "生成中...");
                            }, function(e) {
                                console.log(e), wx.hideNavigationBarLoading(), wx.hideToast(), d.showZanToast(e), 
                                setTimeout(function() {
                                    wx.navigateBack();
                                }, 2e3);
                            });
                            break;

                          case 3:
                            n.cosmetic(t.url, e, function(e) {
                                wx.hideNavigationBarLoading(), wx.hideToast(), r.downloadAndPreview(e.url, "日系妆、韩妆、裸妆、主题妆...您想要的都在这里！", "/pages/cosmetic/edit/edit", "生成中...");
                            }, function(e) {
                                console.log(e), wx.hideNavigationBarLoading(), wx.hideToast(), d.showZanToast(e), 
                                setTimeout(function() {
                                    wx.navigateBack();
                                }, 2e3);
                            });
                            break;

                          case 4:
                            n.peopleFilter(t.url, e, i, function(e) {
                                wx.hideNavigationBarLoading(), wx.hideToast(), r.downloadAndPreview(e.url, "想要人脸滤镜效果，有我so easy！", "/pages/peopleFilter/edit/edit", "生成中...");
                            }, function(e) {
                                console.log(e), wx.hideNavigationBarLoading(), wx.hideToast(), d.showZanToast(e), 
                                setTimeout(function() {
                                    wx.navigateBack();
                                }, 2e3);
                            });
                            break;

                          case 5:
                            n.decoration(t.url, e, function(e) {
                                wx.hideNavigationBarLoading(), wx.hideToast(), r.downloadAndPreview(e.url, "快来玩人脸变妆吧", "/pages/decoration/edit/edit", "生成中...");
                            }, function(e) {
                                console.log(e), wx.hideNavigationBarLoading(), wx.hideToast(), d.showZanToast(e), 
                                setTimeout(function() {
                                    wx.navigateBack();
                                }, 2e3);
                            });
                            break;

                          case 7:
                            wx.navigateTo({
                                url: "/pages/flower/flower?src=" + t.url + "&cart=" + a
                            });
                        }
                    } else d.showZanToast("上传失败，请稍后再试呢");
                });
            } else console.log("获取图片失败，请稍后重试");
        });
    },
    onLoad: function(n) {
        var r = n.src;
        e = n.model, o = n.source, i = n.type, a = n.cart, console.log(i), this.setData({
            name: d[o]
        });
        var s = this.data.cropperOpt;
        new t(s).on("ready", function(e) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(e) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", e), 
            wx.showToast({
                title: "上传中",
                icon: "loading",
                duration: 2e4
            });
        }).on("imageLoad", function(e) {
            console.log("picture loaded"), console.log("current canvas context:", e), wx.hideToast();
        }), this.wecropper.pushOrign(r);
    },
    onReady: function() {
        var e = wx.getSystemInfoSync().windowHeight, o = ((e - w.windowWidth) / 2 - 50) / 2 + 50 - 10, i = (e - w.windowWidth) / 2 - 50;
        this.setData({
            remindBottom: o,
            remidHeight: i
        });
    }
}));