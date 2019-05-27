var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/user")), t = getApp(), e = require("../../zanui/index"), i = require("../../api.js"), l = require("../../utils/util.js"), s = require("../../utils/upload.js");

Page(Object.assign({}, e.Toast, {
    data: {
        detail: {}
    },
    onLoad: function(a) {},
    onShow: function(a) {
        this.data.detail = l.getDetail(), l.isEmptyObject(this.data.detail.likes) && (this.data.detail.likes = []), 
        this.setData({
            detail: this.data.detail,
            disabled: !1
        });
    },
    afterchoose: function(a) {
        for (var t = this, e = 0; e < a.length; e++) t.data.detail.likes.push("https://wsgroup.hmset.com/images/wjtq/other/uploading.png");
        this.setData({
            detail: this.data.detail
        }), this.setData({
            disabled: !0
        }), l.saveDetail(this.data.detail), this.startUpload(a);
    },
    startUpload: function(a) {
        var t = this;
        a.length && s.uploadSingleB({
            path: a[0],
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(e) {
            e ? (console.log(t.data.detail.likes.length), t.data.detail.likes[t.data.detail.likes.length - a.length] = e.url/* + "?imageView2/1/w/150/h/150"*/, 
            a = a.splice(1, a.length), t.onUploadComplete(a), a.length || t.setData({
                disabled: !1
            })) : t.showZanToast("上传失败，请稍后再试呢");
        });
    },
    onUploadComplete: function(a) {
        this.setData({
            detail: this.data.detail
        }), l.saveDetail(this.data.detail), a.length && this.startUpload(a);
    },
    chooseImage: function(t) {
        var e = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个", "随机来十个" ],
        //     success: function(t) {
        //         if (1 == t.tapIndex) 
                    wx.chooseImage({
                        sizeType: [ "original", "compressed" ],
                        sourceType: [ "album", "camera" ],
                        count: 10,
                        success: function(a) {
                            e.afterchoose(a.tempFilePaths);
                        }
                    }); 
        //         else if (0 == t.tapIndex) wx.navigateTo({
        //             url: "/pages/selectUser/selectUser?from=like"
        //         }); else if (2 == t.tapIndex) {
        //             var s = "oldlogin";
        //             a.default.isLogin && a.default.userInfo && (s = "login"), i[s](function(a) {
        //                 e.data.detail.likes.push(a.avatar), e.setData({
        //                     detail: e.data.detail
        //                 }), l.saveDetail(e.data.detail);
        //             }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
        //         } else 3 == t.tapIndex ? (wx.showNavigationBarLoading(), wx.showToast({
        //             title: "Loading……",
        //             duration: 2e3,
        //             icon: "loading"
        //         }), i.random(1, function(a) {
        //             console.log(a), e.data.detail.likes.push(a.user[0].avatar), e.setData({
        //                 detail: e.data.detail
        //             }), l.saveDetail(e.data.detail), wx.hideToast(), wx.hideNavigationBarLoading();
        //         })) : 4 == t.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
        //             title: "Loading……",
        //             duration: 2e3,
        //             icon: "loading"
        //         }), i.random(10, function(a) {
        //             console.log(a), a.user.forEach(function(a, t) {
        //                 e.data.detail.likes.push(a.avatar);
        //             }), e.setData({
        //                 detail: e.data.detail
        //             }), l.saveDetail(e.data.detail), wx.hideToast(), wx.hideNavigationBarLoading();
        //         }));
        //     },
        //     fail: function(a) {}
        // });
    },
    deleteImage: function(a) {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "要删除这条点赞吗？",
            confirmText: "删除",
            success: function(e) {
                if (e.confirm) {
                    for (var i = 0; i < t.data.detail.likes.length; i++) if (t.data.detail.likes[i] == a.currentTarget.id) {
                        t.data.detail.likes.splice(i, 1), l.saveDetail(t.data.detail), t.setData({
                            detail: t.data.detail
                        }), l.saveDetail(t.data.detail);
                        break;
                    }
                } else e.cancel;
            }
        });
    },
    saveData: function() {
        l.saveDetail(this.data.detail);
    },
    formSubmit: function(a) {
        a.detail.formId && l.dealFormIds(a.detail.formId);
        var e = t.globalData.gloabalFomIds;
        e && e.length > 2 && i.saveformids(JSON.stringify(e), function() {
            t.globalData.gloabalFomIds = [];
        }), this.saveData(), wx.navigateBack();
    }
}));