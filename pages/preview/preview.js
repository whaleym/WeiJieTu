var i, t, e, a, o, n, s, l = function(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}(require("../../utils/user")), r = require("../../utils/util.js"), c = require("../../api.js"), h = getApp(), u = require("../../zanui/index");

var picUrl;
var tools = require("../../utils/tools.js");
Page(Object.assign({}, u.Toast, {
    data: {
        platform: h.globalData.system_info.platform,
        showGetPhoneNumber: false,
        hasPhoneNumber: true
    },
    getPhoneNumber: function(e){
        var self = this;
        wx.login({
            success: function(res) {
                decodeByServer(res.code);
            }
        })
        function decodeByServer(code){
            if(e.detail.iv){
                tools.request("https://api.hmset.com/App/decode","post",{
                    code: code,
                    openid: h.globalData.user.openId,
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData,
                    gameid:"9045"
                }).then((res)=>{
                    // console.log("getPhoneNumber success",res)
                    if(res.data.status==1){
                        self.setData({
                            hasPhoneNumber: true,
                            showGetPhoneNumber: false
                        })
                        wx.setStorageSync("hasPhoneNumber", true);
                        self.save({
                            detail:{
                                formId: "the formId is a mock one"
                            }
                        })
                    }
                }).catch((err)=>{console.log("getPhoneNumber fail",err)})
            }else{
                console.log("用户拒绝授权");
            }
        }
    },
    save: function(i) {
        if(wx.canIUse('button.open-type.getPhoneNumber')){
            if(!this.data.hasPhoneNumber){
                this.setData({
                    showGetPhoneNumber: true
                })
                return;
            }
        }

        // console.log("e", i);
        var t = i.detail.formId;
        r.dealFormIds(t);
        wx.saveImageToPhotosAlbum ? wx.saveImageToPhotosAlbum({
            filePath: s,
            success: function(i) {
                wx.showToast({
                    title: "保存到相册啦",
                    icon: "success",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 2e3);
            },
            fail: function(i) {
                // console.log(i);
                wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function(i) {
                        console.log(i);
                    },
                    error: function(i) {
                        r.previewSingalPic(s), console.log(i);
                    },
                    fail: function(i) {
                        r.previewSingalPic(s), console.log(i);
                    }
                });
            }
        }) : r.previewSingalPic(s);
    },
    preview: function(i) {
        r.previewSingalPic(s);
    },
    onShareAppMessage: function() {
        return {
            title: a,
            path: o + "&sharerId=" + l.default.openId,
            imageUrl: s
        };
    },
    dashang: function() {
        wx.navigateToMiniProgram({
            appId: "wx18a2ac992306a5a4",
            path: "pages/apps/largess/detail?accountId=3300"
        });
    },
    select: function(i) {
        // console.log("e", i);
        var t = i.detail.formId;
        r.dealFormIds(t), wx.navigateTo({
            url: "/pages/about/about?type=vip"
        });
    },
    onShow: function() {
        getApp().globalData.hasPreviews = true;
        wx.showNavigationBarLoading(), wx.showToast({
            title: "loading",
            duration: 2e4,
            icon: "loading"
        });
        var a = this;
        a.setData({
            is_verify: wx.getStorageSync("is_verify")
        }), h.globalData.system_info = wx.getSystemInfoSync();
        var o = h.globalData.system_info.windowHeight / h.globalData.system_info.windowWidth * 750;
        var l = e;
        s = e;

        if(a.data.hasShow) {
            a.setData({
                pic_url: s
            });
            wx.hideToast();
            wx.hideNavigationBarLoading();
            return;
        }

        c.getUser(function(e) {
            a.setData({
                isVip: e.isVip
            });
            // console.log("图片路径", l);
            /*"zhuangx" == n ? wx.downloadFile({
                url: r.replaceQiniuHttps(l),
                success: function(n) {
                    wx.getImageInfo({
                        src: n.tempFilePath,
                        success: function(c) {
                            t = o - 300; 
                            i = c.width / c.height * t; 
                            a.setData({
                                pic_url: n.tempFilePath,
                                height: t,
                                width: i
                            });
                            s = n.tempFilePath; 
                            wx.hideToast(); 
                            wx.hideNavigationBarLoading();
                        }
                    });
                }
            }) : */
            wx.getImageInfo({
                src: l,
                success: function(e) {
                    t = o - 300; 
                    i = e.width / e.height * t;
                    if(a.data.template) {
                        a.setData({
                            pic_url: l,
                            height: t,
                            width: i
                        });
                        wx.hideToast();
                        wx.hideNavigationBarLoading();
                    } else {
                        wx.downloadFile({
                            url: picUrl,
                            success: res => {
                                // console.log("保存文件成功", res, res.tempFilePath);
                                a.data.hasShow = true;
                                s = res.tempFilePath;
                                a.setData({
                                    pic_url: res.tempFilePath,
                                    height: t,
                                    width: i
                                });
                                wx.hideToast();
                                wx.hideNavigationBarLoading();
                            },
                            fail: err => {
                                console.log("保存文件失败", err);
                                wx.showToast({
                                    title: "预览失败",
                                    icon: "none",
                                    duration: 3000
                                });
                                wx.navigateBack();
                            }
                        });
                    }
                },
                fail: function(err) {
                    //预览之后返回该页面，服务器上的infoUrl已经失效，此时将保存的临时文件展示出来
                    console.log("获取图片失败");
                    wx.showToast({
                        title: "预览失败",
                        icon: "none",
                        duration: 3000
                    });
                    wx.navigateBack();
                }
            });
        }, function() {
            wx.hideToast();
            wx.hideNavigationBarLoading();
        });
    },
    onLoad: function(i) {
        // console.log("预览界面onLoad", i);
        if(i.pic) {
            this.setData({
                template: true
            });
            e = decodeURIComponent(i.pic);
            a = i.title; 
            o = decodeURIComponent(i.path); 
            (n = i.comfrom) && this.setData({
                showVip: !0
            });
        }else {
            e = decodeURIComponent(i.infoUrl); 
            picUrl = decodeURIComponent(i.url);
            a = i.title; 
            o = decodeURIComponent(i.path); 
            (n = i.comfrom) && this.setData({
                showVip: !0
            });
        }
        let haspn = wx.getStorageSync("hasPhoneNumber");
        haspn = haspn?true:false;
        this.setData({
            hasPhoneNumber: haspn
        })
    },
    hideGetPhoneNumber: function(){
        this.setData({
            showGetPhoneNumber: false
        })
    }
}));