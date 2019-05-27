function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

var e = i(require("../../utils/user")),
    a = (i(require("../../utils/create-page")),
        require("../../wux/wux")),
    t = getApp(),
    n = require("../../api.js"),
    c = require("../../utils/wcache.js"),
    o = require("../../utils/config.js"),
    s = require("../../utils/util.js"),
    p = !1;
var unlockindex = 0;
var tools = require("../../utils/tools.js");
var g = [];
// var g = [{
//     "title": "微信截图",
//     "list": [{
//             "background": "#8FA0FB",
//             "url": "/pages/selectTemplate/selectTemplate?type=4",
//             "type": "link",
//             "hot": 1,
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixindanliao_icon.png",
//             "name": "微信单聊",
//             "unlockCount": 1
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/selectTemplate/selectTemplate?type=3",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinqunliao_icon.png",
//             "name": "微信群聊",
//             "unlockCount": 1
//         }, {
//             "background": "#FFD36B",
//             "url": "/pages/selectTemplate/selectTemplate?type=2",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/pengyouquanshouye_icon.png",
//             "name": "朋友圈首页",
//             "unlockCount": 2
//         }, {
//             "background": "#FFD36B",
//             "url": "/pages/selectTemplate/selectTemplate?type=1",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/xiangqingye_icon.png",
//             "name": "朋友圈详情页",
//             "unlockCount": 2
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45e9",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinqianbao_icon.png",
//             "name": "微信钱包",
//             "unlockCount": 3
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b4602",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinhongbao_icon.png",
//             "name": "微信红包",
//             "unlockCount": 3
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45ea",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinlingqian_icon.png",
//             "name": "微信零钱",
//             "unlockCount": 3
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a0060a27727bcc67a8b465d",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinzhuanzhang_icon.png",
//             "name": "微信转账",
//             "unlockCount": 3
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a20182f7727bc667b8b45d4",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixintixian_icon.png",
//             "name": "微信提现",
//             "unlockCount": 3
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a1bdcc77727bcc63c8b4593",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinjiaoyijilu_icon.png",
//             "name": "微信交易记录",
//             "unlockCount": 3
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a221c857727bc3d358b4628",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinjiahaoyou_icon.png",
//             "name": "微信朋友添加",
//             "unlockCount": 4
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45fb",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinyuyinshipin_icon.png",
//             "name": "语音视频聊天",
//             "unlockCount": 4
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a6ea7db7727bc767f8b458e",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/weixinhaoyoushu_icon.png",
//             "name": "微信好友数量",
//             "unlockCount": 4
//         }, {
//             "background": "#8FA0FB",
//             "url": "/pages/zhuangx/edit/edit?scene=5a6dd2687727bce2598b5162",
//             "type": "link",
//             "pic": "https://wsgroup.hmset.com/images/wjtq/other/shipinfengmian_icon.png",
//             "name": "微信视频封面图",
//             "unlockCount": 4
//         }
//         /*, {
//                 background: "#F99BBC",
//                 url: "/pages/zhuangx/edit/edit?scene=5a28e43d7727bc64768b4595",
//                 type: "link",
//                 pic: "https://wsgroup.hmset.com/images/wjtq/other/jizan_icon.png",
//                 name: "朋友圈详情页集赞"
//             }*/
//     ]
// }, {
//     "title": "QQ截图",
//     "list": [{
//         "background": "#F99BBC",
//         "url": "/pages/zhuangx/edit/edit?scene=5a2230bd7727bcc4328b4570",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/qqhongbao_icon.png",
//         "name": "QQ红包",
//         "unlockCount": 5
//     }, {
//         "background": "#F99BBC",
//         "url": "/pages/zhuangx/edit/edit?scene=5a22a60c7727bcce4f8b4575",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/qqtixian_icon.png",
//         "name": "QQ提现",
//         "unlockCount": 5
//     }, {
//         "background": "#F99BBC",
//         "url": "/pages/zhuangx/edit/edit?scene=5a0060a27727bcc67a8b466e",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/qqqianbao_icon.png",
//         "name": "QQ钱包",
//         "unlockCount": 5
//     }]
// }, {
//     "title": "支付宝截图",
//     "list": [{
//         "background": "#8FA0FB",
//         "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45ed",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/zhifubaoyue_icon.png",
//         "name": "支付宝余额",
//         "unlockCount": 6
//     }, {
//         "background": "#8FA0FB",
//         "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45ee",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/zhifubaohuabei_icon.png",
//         "name": "支付宝花呗",
//         "unlockCount": 6
//     }, {
//         "background": "#8FA0FB",
//         "url": "/pages/zhuangx/edit/edit?scene=5a23934d7727bc81668b4598",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/zhifubaozhuanzhang_icon.png",
//         "name": "支付宝转账",
//         "unlockCount": 6
//     }, {
//         "background": "#8FA0FB",
//         "url": "/pages/zhuangx/edit/edit?scene=5a22b10a7727bcfe208b45d3",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/zhifubaohongbao_icon.png",
//         "name": "支付宝红包",
//         "unlockCount": 6
//     }, {
//         "background": "#8FA0FB",
//         "url": "/pages/zhuangx/edit/edit?scene=5a0060a27727bcc67a8b4624",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/zhifubaozongzichan_icon.png",
//         "name": "支付宝总资产",
//         "unlockCount": 6
//     }, {
//         "background": "#8FA0FB",
//         "url": "/pages/zhuangx/edit/edit?scene=5a22ba347727bca41d8b45ff",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/zhifubaoqianbao_icon.png",
//         "name": "支付宝提现",
//         "unlockCount": 6
//     }]
// }, {
//     "title": "其它截图",
//     "list": [{
//         "background": "#F99BBC",
//         "url": "/pages/zhuangx/edit/edit?scene=5a0060a17727bcc67a8b45f9",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/laidianxianshi_icon.png",
//         "name": "来电显示",
//         "unlockCount": 7
//     }, {
//         "background": "#F99BBC",
//         "url": "/pages/zhuangx/edit/edit?scene=5a73133b7727bca2048b4fe8",
//         "type": "link",
//         "pic": "https://wsgroup.hmset.com/images/wjtq/other/weibofensishu_icon.png",
//         "name": "微博粉丝数",
//         "unlockCount": 7
//     }]
// }];

Page({
    data: {
        showDialog: !1,
        name: o.config.app_name,
        platform: t.globalData.system_info.platform,
        version: "1.0.0",
        MainPageCount: 0,
        AdvertCount: 0,
        navLists: [{
            "appid": "wx6c29f2e1437e3eb4",
            "img": "apppic1.png"
        }, {
            "appid": "wx6c29f2e1437e3eb4",
            "img": "apppic2.png"
        }],
        showAdvert: false,
        advertImg: "advertimg1.jpg",
        advertId: 1,
        advertIdList:["wx6c29f2e1437e3eb4","wx6c29f2e1437e3eb4","wx6c29f2e1437e3eb4"]
    },
    onShareAppMessage: function() {
        // console.log(t.globalData.from,t.globalData.user.openId)
        return {
            title: "生成微信对话、生成朋友圈界面、红包转账截图制作",
            path: "/pages/index/index?from=" + t.globalData.from + "&sharerId=" + t.globalData.user.openId, // */e.default.openId,
            imageUrl: "../../styles/huiyuanguanggao.png"
        };
    },
    go_tuijian: function(i) {
        // console.log('111111111111')

        wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
            appId: "wxab0b8413a26e53cf",
            path: i.currentTarget.dataset.url
        }) : s.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/xcxm_zhizuoqi.jpg");
    },
    swipeUrl: function(i) {
        // console.log('111111111111')

        "/pages/share/share" == i.target.dataset.url ? wx.switchTab({
            url: i.target.dataset.url
        }) : i.target.dataset.appid ? wx.navigateToMiniProgram({
            appId: i.target.dataset.appid,
            path: i.target.dataset.url
        }) : wx.navigateTo({
            url: i.target.dataset.url
        });
    },
    itemClick: function() {
        // console.log('111111111111')

        this.toggleDialog();
    },
    menu: function(i) {
        // console.log('111111111111')

        // console.log(i);
        wx.showActionSheet({
            itemList: ["生成红包照片", "生成红包视频"],
            success: function(i) {
                1 == i.tapIndex ? wx.navigateTo({
                    url: "/pages/dashangtu/index/index?type=video"
                }) : 0 == i.tapIndex && wx.navigateTo({
                    url: "/pages/dashangtu/index/index?type=pic"
                });
            }
        });
    },
    pyqMenu: function(i) {
        var e = this;
        wx.showActionSheet({
            itemList: ["朋友圈详情页", "朋友圈首页"],
            success: function(i) {
                1 == i.tapIndex ? "jietuwang" == e.data.name ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: "wxab0b8413a26e53cf",
                    path: "/pages/selectTemplate/selectTemplate?type=2"
                }) : s.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/xcxm_zhizuoqi.jpg") : wx.navigateTo({
                    url: "/pages/selectTemplate/selectTemplate?type=2"
                }) : 0 == i.tapIndex && ("jietuwang" == e.data.name ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: "wxab0b8413a26e53cf",
                    path: "/pages/selectTemplate/selectTemplate?type=1"
                }) : s.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/xcxm_zhizuoqi.jpg") : wx.navigateTo({
                    url: "/pages/selectTemplate/selectTemplate?type=1"
                }));
            }
        });
    },
    liaotianMenu: function(i) {
        var e = this;
        wx.showActionSheet({
            itemList: ["微信单聊", "微信群聊"],
            success: function(i) {
                0 == i.tapIndex ? "jietuwang" == e.data.name ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: "wxab0b8413a26e53cf",
                    path: "/pages/selectTemplate/selectTemplate?type=4"
                }) : s.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/xcxm_zhizuoqi.jpg") : wx.navigateTo({
                    url: "/pages/selectTemplate/selectTemplate?type=4"
                }) : 1 == i.tapIndex && ("jietuwang" == e.data.name ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: "wxab0b8413a26e53cf",
                    path: "/pages/selectTemplate/selectTemplate?type=3"
                }) : s.previewSingalPic("https://wsgroup.hmset.com/images/wjtq/other/xcxm_zhizuoqi.jpg") : wx.navigateTo({
                    url: "/pages/selectTemplate/selectTemplate?type=3"
                }));
            }
        });
    },
    showNotification: function() {
        // console.log('showNotification--------------')

        var i = this;
        n.tiaozhuan("zhizuoqi_index", function(e) {
            s.tiaozhuan(a.$wuxNotification, i, e, "has_show_tiaozhuan_tip");
        }, function(i) {});
    },
    initPage: function() {
        // console.log('initpage------------------')

        var i = this;
        var a = c.get("isVip");
        for (let key1 in g) {
            for (let key2 in g[key1].list) {
                g[key1].list[key2].showLocked = (i.data.unlockCounts.indexOf(g[key1].list[key2].unlockCount) == -1);
            }
        }
        n.getUser(function(e) {
            // console.log(e);
            e.isVip || a ? (t.globalData.user_is_vip = 1, /*console.log("lists123", g), */
                i.setData({
                    isVip: 1,
                    lists: g
                })) : p ? i.setData({
                isVip: 0,
                lists: g
            }) : i.setData({
                isVip: 0,
                lists: g.slice(2, g.length)
            }), wx.hideToast(), wx.hideNavigationBarLoading();
        }, function() {
            p ? i.setData({
                isVip: 0,
                lists: g
            }) : i.setData({
                isVip: 0,
                lists: g.slice(2, g.length)
            }), wx.hideToast(), wx.hideNavigationBarLoading();
        });
        // let unlockStr = "";
        // for(let key1 in i.data.lists){
        //     for(let key2 in i.data.lists[key1].list){
        //         if(i.data.lists[key1].list[key2].unlockCount==i.data.shareCount+1){
        //             unlockStr+=("\n"+i.data.lists[key1].list[key2].name);
        //         }
        //     }
        // }
        i.setData({
            isLogin: true
        })
        // i.setData({
        //     is_verify: 0
        // }); 
        1 && wx.getStorageSync("has_show_tiaozhuan_tip") < 4 && ( /*console.log("show tiaozhuan"), */ i.showNotification());
        // wx.setStorageSync("is_verify", 0);
    },
    onPullDownRefresh: function() {
        // console.log('onPullDownRefresh-*------------------')

        t.globalData.user = null, wx.removeStorageSync("user");
        c.remove("cache_init"), this.initPage();
    },
    onShow: function() {
        let self = this;
        // console.log('onshow--------------------------')
        let shareDate = wx.getStorageSync("shareDate");
        this.data.MainPageCount = wx.getStorageSync("MainPageCount") || 0;
        this.data.AdvertCount = wx.getStorageSync("AdvertCount")||0;
        let unlockCounts = wx.getStorageSync("unlockCounts");
        if (t.globalData.lockedCount == 0 || !unlockCounts) {
            unlockCounts = [];
            wx.setStorageSync("unlockCounts", [])
        }
        // let shareCount = wx.getStorageSync("shareCount");
        // if(!shareCount)
        //     shareCount = 0;
        this.data.MainPageCount++;
        let currDate = tools.getNowFormatDate();
        if (!shareDate || shareDate != currDate) {
            shareDate = currDate;
            wx.setStorageSync("shareDate", shareDate);
            unlockCounts = [1, 2, 3, 4, 5, 6, 7, 8];
            wx.setStorageSync("unlockCounts", [1, 2, 3, 4, 5, 6, 7, 8])
            // shareCount = 0;
            // wx.setStorageSync("shareCount",shareCount);
            // 
            wx.setStorageSync("todaylockedCount", t.globalData.lockedCount);
            this.data.MainPageCount = 1;
            this.data.AdvertCount = 0;
        } else {
            let lc = wx.getStorageSync("todaylockedCount");
            if (lc) {
                t.globalData.lockedCount = lc;
            }
        }
        if(this.data.MainPageCount >= 2+parseInt(this.data.AdvertCount*1.5)){
            this.data.MainPageCount = 0;
            this.data.AdvertCount++;
            var randomid = parseInt(Math.random()*3);
            this.setData({
                showAdvert: true,
                advertImg: "advertimg"+(randomid+1)+".jpg",
                advertId: this.data.advertIdList[randomid]
            })
        }
        wx.setStorageSync("MainPageCount", this.data.MainPageCount);
        wx.setStorageSync("AdvertCount", this.data.AdvertCount);
        // let hasss = wx.getStorageSync("has_show_mianze_guide");
        this.setData({
            comefrom: p,
            unlockCounts: unlockCounts
        }), this.initPage(), wx.getStorageSync("has_show_login") || this.openGuide();
        // var i = this;
        // wx.getStorage({
        //     key: "hasShowJoinMini_jietu_list",
        //     complete: function(e) {
        //         e.data || wx.getStorage({
        //             key: "willShowJoinMini_jietu_list",
        //             complete: function(e) {
        //                 e.data && i.setData({
        //                     showJoinMini: !0
        //                 });
        //             }
        //         });
        //     }
        // });
    },
    closeAdvert: function(){
        this.setData({
            showAdvert: false
        })
    },
    openGuide: function() {
        /*wx.setStorageSync("has_show_mianze_guide", 1), */
        this.guide("open");
    },
    close: function() {
        this.guide("close");
    },
    guide: function(i) {
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.opacity(0).rotateX(-100).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(1).rotateX(0).step(), this.setData({
                animationData: e
            }), "close" == i && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == i && this.setData({
            showModalStatus: !0
        });
    },
    onLoad: function(i) {
        i.from && (p = !0);
        let self = this;
        tools.request("https://wsgroup.hmset.com/images/wjtq/share/PagesConfig.txt?t=" + Date.now(), "get").then((res) => {
            if (res.statusCode == 200) {
                t.globalData.lockedCount = res.data.lockedCount;
                t.globalData.ServerLockedCount = res.data.lockedCount;
                g = res.data.lists;

                let shareDate = wx.getStorageSync("shareDate");
                let currDate = tools.getNowFormatDate();
                if (shareDate == currDate) {
                    let lc = wx.getStorageSync("todaylockedCount");
                    if (lc) {
                        t.globalData.lockedCount = lc;
                    }
                }
                if (t.globalData.lockedCount == 0) {
                    wx.setStorageSync("unlockCounts", [])
                    self.setData({
                        unlockCounts: []
                    })
                }

                self.initPage();
            }
        }).catch((err) => {
            console.log("err", err)
        });
        let hasshowlogin = wx.getStorageSync("has_show_login")
        if (hasshowlogin) {
            t.globalData.user = wx.getStorageSync("userinfo") || {}
        }
    },
    showZhuanqian: function() {
        this.setData({
            showZhuanqian: !0
        });
    },
    getUserInfo_navigate: function(i) {
        this.setData({
            isLogin: e.default.isLogin
        }), wx.navigateTo({
            url: i.currentTarget.dataset.url
        });
    },
    getUserInfo_tap: function(i) {
        this.setData({
            isLogin: e.default.isLogin
        }), this[i.currentTarget.dataset.event]();
    },
    joinMiniConfirm: function() {
        this.setData({
            showJoinMini: !1
        }), wx.setStorage({
            key: "hasShowJoinMini_jietu_list",
            data: 1
        });
    },
    onGotUserInfo: function(res) {
        let self = this;
        wx.login({
            success: function(res1) {
                let tools = require('../../utils/tools')
                tools.request("https://api.hmset.com/app/saveUser", "post", {
                    code: res1.code,
                    gameid: "9045",
                    userinfo: res.detail.userInfo ? JSON.stringify(res.detail.userInfo) : ""
                }).then((result) => {
                    console.log("登录成功：", result);
                    if (result.data.status == 1) {
                        t.globalData.user = res.detail.userInfo || {};
                        t.globalData.user.openId = result.data.openid;
                        if (res.detail.userInfo) {
                            wx.setStorageSync("has_show_login", 1);
                            wx.setStorageSync("userinfo", res.detail.userInfo);
                        }
                        wx.setStorageSync("hasPhoneNumber", result.data.hasPhoneNumber);
                    }
                }).catch((err) => {
                    console.log("登录失败：", err)
                });
                self.guide("close");
                self.setData({
                    is_verify: 1
                });
            }
        });
    },
    UnlockItem: function(e) {
        // console.log("UnlockItem",e);
        unlockindex = e.currentTarget.dataset.unlockindex;
        let unlockStr = "";
        for (let key1 in this.data.lists) {
            for (let key2 in this.data.lists[key1].list) {
                if (this.data.lists[key1].list[key2].unlockCount == unlockindex) {
                    unlockStr += ("\n" + this.data.lists[key1].list[key2].name);
                }
            }
        }
        // console.log("unlockStr",unlockStr)
        this.setData({
            showUnlock: true,
            unlockStr: unlockStr
        })
    },
    closeUnlock: function() {
        this.setData({
            showUnlock: false,
            unlockStr: ""
        })
    },
    unlockShare: function() {
        setTimeout(() => {
            // let shareCount = this.data.shareCount;
            // shareCount++
            // this.setData({
            //     shareCount: shareCount
            // })
            // wx.setStorageSync("shareCount",shareCount);
            let unlockCounts = this.data.unlockCounts;
            unlockCounts.push(unlockindex);
            this.setData({
                unlockCounts: unlockCounts
            })
            t.globalData.lockedCount = t.globalData.ServerLockedCount;
            wx.setStorageSync("todaylockedCount", t.globalData.lockedCount);
            wx.setStorageSync("unlockCounts", unlockCounts);
            this.closeUnlock();
            this.initPage();
        }, 3000)
    },
    gotoUrl: function() {
        if (t.globalData.lockedCount > 0) {
            t.globalData.lockedCount--;
            wx.setStorageSync("todaylockedCount", t.globalData.lockedCount);
        }
    }
});