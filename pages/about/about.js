var t, i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/user")), a = require("../../api.js"), e = require("../../utils/util.js"), n = require("../../utils/config.js"), o = require("../../utils/wcache.js"), s = require("../../zanui/index"), c = getApp();

Page(Object.assign({}, s.Toast, {
    data: {
        list: [ {
            background: "#f5fef1",
            iconBackground: "#a1dc84",
            appid: "wx56879de57d90dcca",
            preview: "https://wsgroup.hmset.com/images/wjtq/other/xiaoxiaojietu_ma.jpg",
            color: "#5da639",
            url: "",
            event: "navigate",
            type: "tap",
            pic: "https://wsgroup.hmset.com/images/wjtq/other/xiaojietu1_icon.png",
            name: "小小截图",
            desc: "朋友圈、微信对话截图，微商截图"
        }, {
            background: "#fcf0f5",
            iconBackground: "#f089ac",
            appid: "wxf222b478fe10dbe0",
            preview: "https://wsgroup.hmset.com/images/wjtq/other/xiaozhuangx1_ma.jpg",
            color: "#eb3e6f",
            url: "",
            event: "navigate",
            type: "tap",
            pic: "https://wsgroup.hmset.com/images/wjtq/other/xiaozhuangx1_icon.png",
            name: "小装X",
            desc: "一键生成各种装逼图"
        } ],
        appTitle: n.config.app_title
    },
    openContact: function() {
        a.messagefrom("vip_goumai", function() {}, function() {});
    },
    cancelContactMenu: function() {
        this.setData({
            showContactMenu: !1
        });
    },
    navigate: function(t) {
        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.appid
        }) : e.previewSingalPic(t.currentTarget.dataset.preview);
    },
    onShow: function() {
        this.data.showContactMenu && this.cancelContactMenu(), this.setData({
            isLogin: i.default.isLogin
        }), i.default.isLogin && this.setData({
            user: i.default.userInfo
        });
    },
    onLoad: function(i) {
       
        t = i.type, this.setData({
            type: t,
            tuijian: wx.getStorageSync("tuijian"),
            platform: c.globalData.system_info.platform
        }), "tixian" == t ? wx.setNavigationBarTitle({
            title: "提现"
        }) : "share_success" == t ? wx.setNavigationBarTitle({
            title: "分享成功"
        }) : "vip" == t ? wx.setNavigationBarTitle({
            title: "VIP会员"
        }) : "vipsuccess" == t ? wx.setNavigationBarTitle({
            title: "购买成功"
        }) : "contactvip" == t ? wx.setNavigationBarTitle({
            title: "联系客服"
        }) : "tuijian" == t ? wx.setNavigationBarTitle({
            title: "精品小程序推荐"
        }) : "video_help" == t ? wx.setNavigationBarTitle({
            title: "视频说明"
        }) : "video_help_woshishui" == t ? wx.setNavigationBarTitle({
            title: "视频说明"
        }) : "help" == t && wx.setNavigationBarTitle({
            title: "使用说明"
        });
        var a = c.globalData.system_info.SDKVersion;
        if (a) {
            var e = "";
            a.split(".").forEach(function(t, i, a) {
                e += 0 === i ? t + "." : t;
            }), e >= 2.07 && this.setData({
                canUse_navigatorTarget: !0
            });
        }
    },
    onReady: function() {},
    tiaozhuan: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: t.currentTarget.dataset.id
        }) : e.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/xcxm_jietuwang_1.jpg");
    },
    buy: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "终身永久VIP（128元）", "365天VIP（68元）", "30天VIP（48元）", "7天VIP（25元）", "联系客服购买" ],
            success: function(i) {
                4 == i.tapIndex ? wx.navigateTo({
                    url: "/pages/about/about?type=contactvip"
                }) : a.login(function(e) {
                    var n = [ 128, 68, 48, 25 ], s = [ 15768e5, 31536e3, 2678400, 604800 ], r = i.tapIndex;
                    a.vippay(e.openid, n[r], "购买VIP", function(i) {
                        console.log(i), wx.hideToast(), wx.hideNavigationBarLoading(), wx.requestPayment({
                            timeStamp: i.timeStamp,
                            nonceStr: i.nonceStr,
                            package: i.package,
                            signType: i.signType,
                            paySign: i.paySign,
                            success: function(t) {
                                console.log(s[r]), o.put("isVip", 1, s[r]), wx.redirectTo({
                                    url: "/pages/about/about?type=vipsuccess"
                                });
                            },
                            fail: function(i) {
                                "ios" == c.globalData.system_info.platform ? wx.navigateTo({
                                    url: "/pages/about/about?type=contactvip"
                                }) : t.showZanToast("支付失败，请稍后再试");
                            }
                        });
                    });
                }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
            },
            fail: function(i) {
                t.showZanToast("支付失败，请稍后再试");
            }
        });
    },
    switchTab: function(t) {
        var i = t.target.dataset.url;
        wx.switchTab({
            url: i
        });
    }
}));