var a, t = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../utils/user")), e = getApp(), i = require("../../zanui/index"), s = require("../../utils/util.js"), n = require("../../api.js"), d = require("../../utils/upload.js");

Page(Object.assign({}, i.Toast, {
    data: {
        detail: {},
        fname: ""
    },
    onLoad: function(a) {
        this.setData({
            disabled: !1
        }), a && a.fname && (this.data.fname = a.fname);
    },
    onShow: function(t) {
        this.data.detail = s.getDetail(), a = wx.getStorageSync("current_comment_index"), 
        s.isEmptyObject(this.data.detail.comments) && (this.data.detail.comments = []), 
        a || (a = 0), s.isEmptyObject(this.data.detail.comments[a]) && (this.data.detail.comments[a] = {}), 
        this.data.detail.comments[a].time || (this.data.detail.comments[a].time = a + 1 + "分钟前"), 
        this.data.fname && (this.data.detail.comments[a].fName = this.data.fname, console.log(this.data.detail.comments[a])), 
        this.setData({
            detail: this.data.detail,
            index: a
        });
    },
    afterAvatarChoose: function(t) {
        var e = this;
        e.data.detail.comments[a].avatar = "https://wsgroup.hmset.com/images/wjtq/other/uploading.png", e.setData({
            detail: e.data.detail
        }), s.saveDetail(e.data.detail), this.setData({
            disabled: !0
        }), d.uploadSingleB({
            path: t,
            state: 1,
            uname: wx.getStorageSync("current_detail_index") == 99 ? "details" : "circles"
        }, "jietu_picture_", function(t) {
            t ? (n.checkImage(t.url), e.data.detail.comments[a].avatar = t.url/* + "?imageView2/1/w/150/h/150"*/, 
            e.setData({
                detail: e.data.detail
            }), s.saveDetail(e.data.detail)) : e.showZanToast("上传失败，请稍后再试呢"), e.setData({
                disabled: !1
            });
        });
    },
    avatarMenu: function(e) {
        var i = this;
        // wx.showActionSheet({
        //     itemList: [ "选择系统人物", "从相册选择", "选择我自己", "随机来一个" ],
        //     success: function(e) {
        //         if (1 == e.tapIndex) 
                wx.chooseImage({
                    sizeType: [ "original", "compressed" ],
                    sourceType: [ "album", "camera" ],
                    count: 1,
                    success: function(a) {
                        i.afterAvatarChoose(a.tempFilePaths[0]);
                    }
                }); /*else if (0 == e.tapIndex) wx.navigateTo({
                    url: "/pages/selectUser/selectUser?from=comment"
                }); else if (2 == e.tapIndex) {
                    var d = "oldlogin";
                    t.default.isLogin && t.default.userInfo && (d = "login"), n[d](function(t) {
                        console.log(t), i.data.detail.comments[a].avatar = t.avatar, i.data.detail.comments[a].name = t.user_name, 
                        i.setData({
                            detail: i.data.detail
                        }), s.saveDetail(i.data.detail);
                    }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
                } else 3 == e.tapIndex && (wx.showNavigationBarLoading(), wx.showToast({
                    title: "Loading……",
                    duration: 2e3,
                    icon: "loading"
                }), n.random(1, function(t) {
                    console.log(t), i.data.detail.comments[a].avatar = t.user[0].avatar, i.data.detail.comments[a].name = t.user[0].name, 
                    i.setData({
                        detail: i.data.detail
                    }), s.saveDetail(i.data.detail), wx.hideToast(), wx.hideNavigationBarLoading();
                }));
            },
            fail: function(a) {}
        });*/
    },
    bindName: function(t) {
        this.data.detail.comments[a].name = t.detail.value, s.saveDetail(this.data.detail);
    },
    bindContent: function(t) {
        this.data.detail.comments[a].content = t.detail.value, s.saveDetail(this.data.detail);
    },
    nav: function(a) {
        this.saveData(), wx.navigateTo({
            url: a.currentTarget.id
        });
    },
    saveData: function() {
        s.saveDetail(this.data.detail);
    },
    formSubmit: function(t) {
        t.detail.formId && s.dealFormIds(t.detail.formId);
        var i = e.globalData.gloabalFomIds;
        i && i.length > 2 && n.saveformids(JSON.stringify(i), function() {
            e.globalData.gloabalFomIds = [];
        }), this.saveData();
        var d = this.data.detail;
        d.comments[a].avatar ? d.comments[a].name ? d.comments[a].content ? wx.navigateBack() : this.showZanToast("内容必填哦") : this.showZanToast("昵称必填哦") : this.showZanToast("必须选择头像呢");
    }
}));