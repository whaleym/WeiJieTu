var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/user")), t = getApp(), e = require("../../utils/util.js"), i = require("../../zanui/index"), s = require("../../api.js"), l = require("../../utils/upload.js"), o = require("../../WxEmojiView/WxEmojiView.js");

Page(Object.assign({}, i.Toast, {
    data: {
        detail: {}
    },
    onLoad: function(a) {},
    onShow: function(a) {
        var t = wx.getStorageSync("current_detail_index");
        99 != t && t || (t = 0), this.data.detail = e.getDetail(), this.data.detail.time || (this.data.detail.time = t + 1 + "分钟前"), 
        e.isEmptyObject(this.data.detail.files) && (this.data.detail.files = []), console.log("this.data.detail", this.data.detail);
        var i = this;
        o.bindThis(i);
        var s = this.data.detail.content;
        s || (s = ""), o.buildTextAreaObjs(i, s && s.textAreaText ? s.textAreaText : s), 
        this.setData({
            detail: this.data.detail,
            disabled: !1
        });
    },
    help: function() {
        e.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/jiatuwen.png?" + Date.parse(new Date()));
    },
    chooseImage: function(a) {
        var t = this;
        t.data.detail.files.length >= 9 ? t.showZanToast("最多只能发9张图呢") : wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 9,
            success: function(a) {
                t.data.detail.files.length + a.tempFilePaths.length > 9 && t.showZanToast("最多只能发9张图呢"), 
                console.log(a.tempFilePaths), console.log(t.data.detail.files.length), t.afterchoose(a.tempFilePaths.slice(0, 9 - t.data.detail.files.length));
            }
        });
    },
    afterchoose: function(a) {
        console.log(a);
        for (var t = this, i = 0; i < a.length; i++) t.data.detail.files = t.data.detail.files.concat({
            url: "https://wsgroup.hmset.com/images/wjtq/other/uploading.png",
            width: 300,
            height: 300
        });
        this.setData({
            detail: this.data.detail
        }), e.saveDetail(this.data.detail), this.setData({
            disabled: !0
        }), this.startUpload(a);
    },
    startUpload: function(a) {
        var e = this;
        console.log(a), a.length && l.uploadSingleB({
            path: a[0],
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(i) {
            i ? (s.checkImage(i.url), e.data.detail.files[e.data.detail.files.length - a.length] = {
                url: i.url/* + "?imageView2/1/w/" + Math.ceil(t.globalData.system_info.windowWidth / 2 * t.globalData.system_info.pixelRatio) + "/h/" + Math.ceil(t.globalData.system_info.windowWidth / 2 * t.globalData.system_info.pixelRatio * i.height / i.width)*/,
                width: i.width,
                height: i.height
            }, a = a.splice(1, a.length), e.onUploadComplete(a), a.length || e.setData({
                disabled: !1
            })) : e.showZanToast("上传失败，请稍后再试呢");
        });
    },
    onUploadComplete: function(a) {
        this.setData({
            detail: this.data.detail
        }), e.saveDetail(this.data.detail), a.length && this.startUpload(a);
    },
    previewImage: function(a) {
        wx.previewImage({
            current: a.currentTarget.id,
            urls: this.data.detail.files
        });
    },
    afterAvatarChoose: function(a) {
        var t = this;
        t.data.detail.avatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            detail: t.data.detail
        }), e.saveDetail(t.data.detail), this.setData({
            disabled: !0
        }), l.uploadSingleB({
            path: a,
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(a) {
            a ? (s.checkImage(a.url), t.data.detail.avatar = a.url/* + "?imageView2/1/w/150/h/150"*/, 
            t.setData({
                detail: t.data.detail
            }), e.saveDetail(t.data.detail)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    avatarMenu: function(t) {
        console.log(t);
        var i = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(t) {
        //         if (1 == t.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(a) {
                        i.afterAvatarChoose(a.tempFilePaths[0]);
                    }
                }); /*else if (0 == t.tapIndex) wx.navigateTo({
                    url: "/pages/selectUser/selectUser?from=detail"
                }); else if (2 == t.tapIndex) {
                    var l = "oldlogin";
                    a.default.isLogin && a.default.userInfo && (l = "login"), s[l](function(a) {
                        i.data.detail.avatar = a.avatar, i.data.detail.name = a.user_name, i.setData({
                            detail: i.data.detail
                        }), e.saveDetail(i.data.detail);
                    }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
                } else 3 == t.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
                    title: "Loading……",
                    duration: 2e3,
                    icon: "loading"
                }), s.random(1, function(a) {
                    console.log(a), i.data.detail.avatar = a.user[0].avatar, i.data.detail.name = a.user[0].name, 
                    i.setData({
                        detail: i.data.detail
                    }), e.saveDetail(i.data.detail), wx.hideToast(), wx.hideNavigationBarLoading();
                }));
            },
            fail: function(a) {}
        });*/
    },
    bindName: function(a) {
        this.data.detail.name = a.detail.value, e.saveDetail(this.data.detail);
    },
    bindContent: function(a) {
        var t = this;
        o.WxEmojiTextareaBlur(t, a), this.data.detail.content = this.data.WxEmojiObjs, console.log(this.data.detail.content), 
        e.saveDetail(this.data.detail);
    },
    deleteImage: function(a) {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "要删除这张图片吗？",
            confirmText: "删除",
            success: function(i) {
                if (i.confirm) {
                    for (var s = 0; s < t.data.detail.files.length; s++) if (t.data.detail.files[s].url == a.currentTarget.id) {
                        t.data.detail.files.splice(s, 1), t.setData({
                            detail: t.data.detail
                        }), e.saveDetail(t.data.detail);
                        break;
                    }
                } else i.cancel;
            }
        });
    },
    nav: function(a) {
        this.saveData(), console.log(a), wx.navigateTo({
            url: a.currentTarget.id
        });
    },
    saveData: function() {
        e.saveDetail(this.data.detail);
    },
    formSubmit: function(a) {
        a.detail.formId && e.dealFormIds(a.detail.formId);
        var i = t.globalData.gloabalFomIds;
        i && i.length > 2 && s.saveformids(JSON.stringify(i), function() {
            t.globalData.gloabalFomIds = [];
        }), this.saveData(this.data.detail);
        var l = this.data.detail;
        l.avatar ? l.name ? l.content ? wx.navigateBack() : this.showZanToast("内容必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    },
    WxEmojiTextareaFocus: function(a) {
        var t = this;
        o.WxEmojiTextareaFocus(t, a), this.setData({
            isShowEmoji: !1
        });
    },
    wxPreEmojiTap: function(a) {
        var t = this;
        o.wxPreEmojiTap(t, a), this.data.detail.content = this.data.WxEmojiObjs;
    },
    showEmoji: function() {
        this.setData({
            isShowEmoji: !this.data.isShowEmoji
        });
    },
    hideWxEmojiTextarea: function() {
        this.setData({
            isShowEmoji: !1
        });
    }
}));