var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/user")), t = getApp(), e = require("../../zanui/index"), i = require("../../api.js"), s = require("../../utils/util.js"), d = require("../../utils/upload.js");

Page(Object.assign({}, e.Toast, {
    data: {
        detail: {}
    },
    onLoad: function(a) {},
    onShow: function(a) {
        var t = wx.getStorageSync("current_detail_index");
        99 != t && t || (t = 0), this.data.detail = s.getDetail(), this.data.detail.time || (this.data.detail.time = t + 1 + "分钟前"), 
        s.isEmptyObject(this.data.detail.ad) && (this.data.detail.ad = {}), s.isEmptyObject(this.data.detail.files) && (this.data.detail.files = []), 
        this.setData({
            detail: this.data.detail,
            disabled: !1
        });
    },
    afterAvatarChoose: function(a) {
        var t = this;
        t.data.detail.avatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", t.setData({
            detail: t.data.detail
        }), s.saveDetail(t.data.detail), this.setData({
            disabled: !0
        }), d.uploadSingleB({
            path: a,
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(a) {
            a ? (i.checkImage(a.url), t.data.detail.avatar = a.url/* + "?imageView2/1/w/150/h/150"*/, 
            t.setData({
                detail: t.data.detail
            }), s.saveDetail(t.data.detail)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    avatarMenu: function(t) {
        var e = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(t) {
        //         if (1 == t.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(a) {
                        e.afterAvatarChoose(a.tempFilePaths[0]);
                    }
                }); /*else if (0 == t.tapIndex) wx.navigateTo({
                    url: "/pages/selectUser/selectUser?from=detail"
                }); else if (2 == t.tapIndex) {
                    var d = "oldlogin";
                    a.default.isLogin && a.default.userInfo && (d = "login"), i[d](function(a) {
                        e.data.detail.avatar = a.avatar, e.data.detail.name = a.user_name, e.setData({
                            detail: e.data.detail
                        }), s.saveDetail(e.data.detail);
                    }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
                } else 3 == t.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
                    title: "Loading……",
                    duration: 2e3,
                    icon: "loading"
                }), i.random(1, function(a) {
                    console.log(a), e.data.detail.avatar = a.user[0].avatar, e.data.detail.name = a.user[0].name, 
                    e.setData({
                        detail: e.data.detail
                    }), s.saveDetail(e.data.detail), wx.hideToast(), wx.hideNavigationBarLoading();
                }));
            },
            fail: function(a) {}
        });*/
    },
    afterAdAvatarChoose: function(a) {
        var t = this;
        t.data.detail.files[0] = {
            url: "https://wsgroup.hmset.com/images/wjtq/other/uploading.png",
            width: 300,
            height: 300
        }, t.setData({
            detail: t.data.detail
        }), s.saveDetail(this.data.detail), this.setData({
            disabled: !0
        }), d.uploadSingleB({
            path: a,
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(a) {
            a ? (i.checkImage(a.url), console.log(t.data.detail.files), t.data.detail.files[0] = {
                url: a.url,
                width: a.width,
                height: a.height
            }, t.setData({
                detail: t.data.detail
            }), s.saveDetail(t.data.detail)) : t.showZanToast("上传失败，请稍后再试呢"), t.setData({
                disabled: !1
            });
        });
    },
    adAvatar: function(a) {
        var t = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(a) {
                t.afterAdAvatarChoose(a.tempFilePaths[0]);
            }
        });
    },
    bindName: function(a) {
        this.data.detail.name = a.detail.value, s.saveDetail(this.data.detail);
    },
    bindContent: function(a) {
        this.data.detail.content = a.detail.value, s.saveDetail(this.data.detail);
    },
    bindadContent: function(a) {
        this.data.detail.ad.content = a.detail.value, s.saveDetail(this.data.detail);
    },
    nav: function(a) {
        this.saveData(), console.log(a), wx.navigateTo({
            url: a.currentTarget.id
        });
    },
    saveData: function() {
        s.saveDetail(this.data.detail);
    },
    help: function() {
        s.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/jiaguanggao.png?" + Date.parse(new Date()));
    },
    formSubmit: function(a) {
        a.detail.formId && s.dealFormIds(a.detail.formId);
        var e = t.globalData.gloabalFomIds;
        e && e.length > 2 && i.saveformids(JSON.stringify(e), function() {
            t.globalData.gloabalFomIds = [];
        }), this.saveData();
        var d = this.data.detail;
        d.avatar ? d.name ? d.content ? !s.isEmptyObject(d.files) && d.files.length ? d.ad.content ? wx.navigateBack() : this.showZanToast("广告链接文字必填哦") : this.showZanToast("必须选择广告图呢") : this.showZanToast("内容必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    }
}));