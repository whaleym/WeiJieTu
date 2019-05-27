function t(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}

var e, i, a, n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/user")), o = (require("../../wux/wux"), getApp()), s = 1, l = require("../../api.js"), c = require("../../zanui/index"), r = require("../../utils/util.js"), d = void 0, u = void 0, g = void 0, x = void 0, w = void 0, p = void 0, f = void 0, h = void 0, v = void 0, m = void 0;

Page(Object.assign({}, c.Tab, {
    data: {
        gridPicSize: "?imageView2/1/w/" + Math.ceil(o.globalData.system_info.windowWidth / 2 * o.globalData.system_info.pixelRatio) + "/h/" + Math.ceil(o.globalData.system_info.windowWidth / 2 * o.globalData.system_info.pixelRatio)
    },
    onShow: function(t) {
        this.setData({
            isLogin: n.default.isLogin
        }), n.default.isLogin && this.setData({
            user: n.default.userInfo
        });
        var e = this;
        i = 100, s = 1, d = r.getDetail(), x = r.getDetails(), w = wx.getStorageSync("weixin"), 
        (r.isEmptyObject(w) || "string" == typeof w) && (w = {}), r.isEmptyObject(w.danliao) && (w.danliao = {}), 
        r.isEmptyObject(w.qunliao) && (w.qunliao = {}), 
        !r.isEmptyObject(x[99]) && x[99].content && 1 == u && (wx.setStorageSync("current_detail_index", 99), 
        this.setData({
            hasDetail: 1,
            url: "/pages/detail/detail",
            text: "编辑中的详情页"
        })), 
        g = wx.getStorageSync("info"), 
        r.isEmptyObject(g) && r.emptyDeatails() || 2 != u || this.setData({
            hasDetail: 1,
            url: "/pages/circle/circle",
            text: "编辑中的朋友圈"
        }), 
        r.isEmptyObject(w.qunliao) || 3 != u || this.setData({
            hasDetail: 1,
            url: "/pages/jietu/weixin/qunliao/qunliao",
            text: "编辑中的群聊"
        }), 
        r.isEmptyObject(w.danliao) || 4 != u || this.setData({
            hasDetail: 1,
            url: "/pages/jietu/weixin/danliao/danliao",
            text: "编辑中的单聊"
        }), a = !1, 
        l.login(function(t) {
            e.getList(i);
        }, function() {
            e.getList(i);
        }, "必须授权登录之后才能操作呢，是否重新授权登录？");
    },
    onLoad: function(t) {
        // console.log("模板选择页面加载", t.type);
        1 == (u = t.type) ? (wx.setNavigationBarTitle({
            title: "选择朋友圈模板"
        }), this.setData({
            key: "weishengcheng_help"
        })) : 2 == u ? (wx.setNavigationBarTitle({
            title: "选择朋友圈模板"
        }), this.setData({
            key: "weishengcheng_help"
        })) : (wx.setNavigationBarTitle({
            title: "选择聊天模板"
        }), this.setData({
            key: "duihuajietu_help"
        }));
    },
    onUnload: function() {
        // var t = getCurrentPages();
        // t && t.length && t.length - 2 >= 0 && wx.getStorage({
        //     key: "hasShowJoinMini_jietu_list",
        //     complete: function(e) {
        //         e.data || "pages/index/index" == t[t.length - 2].route && wx.setStorage({
        //             key: "willShowJoinMini_jietu_list",
        //             data: 1
        //         });
        //     }
        // });
    },
    selectTemplate: function(t) {
        var e = this;
        if(r.isEmptyObject(x[99]) && 1 == u || r.isEmptyObject(g) && r.emptyDeatails() && 2 == u || u > 2) {
            this.gotoEdit(t.currentTarget.id)
        }else {
            wx.showModal({
                title: "提示",
                content: "还有编辑中的朋友圈哦，要覆盖掉么？",
                confirmText: "覆盖",
                cancelText: "继续编辑",
                success: function(i) {
                    if(i.confirm) {
                        //覆盖编辑中的朋友圈
                        e.cleanUpStore(u);
                        e.gotoEdit(t.currentTarget.id)
                    }else {
                        if(1 == u) {
                            wx.setStorage({
                                key: "current_detail_index",
                                data: 99,
                                success: function() {
                                    wx.navigateTo({
                                        url: "/pages/detail/detail"
                                    });
                                }
                            })
                        }else if(2 == u) {
                            wx.navigateTo({
                                url: "/pages/circle/circle"
                            });
                        }
                    }
                    // i.confirm ? e.gotoEdit(t.currentTarget.id) : 1 == u ? wx.setStorage({
                    //     key: "current_detail_index",
                    //     data: 99,
                    //     success: function() {
                    //         wx.navigateTo({
                    //             url: "/pages/detail/detail"
                    //         });
                    //     }
                    // }) : 2 == u && wx.navigateTo({
                    //     url: "/pages/circle/circle"
                    // });
                }
            });
        }
    },
    saveWeixin: function(t, e) {
        wx.setStorage({
            key: "weixin",
            data: t,
            success: function() {
                wx.navigateTo({
                    url: e
                });
            }
        });
    },
    dealData: function(t) {
        var e = this;
        v = e.data.list[t].price; 
        m = e.data.list[t].id;
        if (1 == u) {
            p = JSON.parse(e.data.list[t].content); 
        }else if (2 == u) {
            var i = JSON.parse(e.data.list[t].content);
            if (f[99]) {
                var a = f[99];
                (f = i.details)[99] = a;
            } else f = i.details;
            h = i.info;
        } else if (3 == u) {
            var n = JSON.parse(e.data.list[t].content), 
                o = "/pages/jietu/weixin/qunliao/qunliao";
            r.isEmptyObject(w.qunliao) ? (w.qunliao = n, e.saveWeixin(w, o + "?price=" + v + "&id=" + m)) : wx.showModal({
                title: "提示",
                content: "还有编辑中的对话哦，要覆盖掉么？",
                confirmText: "覆盖",
                cancelText: "继续编辑",
                success: function(t) {
                    if(t.confirm){
                        wx.showToast({
                            title: "Loading……",
                            icon: "loading"
                        })
                        e.cleanUpStore(u);
                        w.qunliao = n; 
                        e.saveWeixin(w, o + "?price=" + v + "&id=" + m);
                    }else {
                        wx.navigateTo({
                            url: o
                        });
                    }
                }
            });
        } else {
            var s = JSON.parse(e.data.list[t].content), 
                o = "/pages/jietu/weixin/danliao/danliao";
            r.isEmptyObject(w.danliao) ? (w.danliao = s, e.saveWeixin(w, o + "?price=" + v + "&id=" + m)) : wx.showModal({
                title: "提示",
                content: "还有编辑中的对话哦，要覆盖掉么？",
                confirmText: "覆盖",
                cancelText: "继续编辑",
                success: function(t) {
                    if(t.confirm){
                        //覆盖原有单聊
                        wx.showToast({
                            title: "Loading……",
                            icon: "loading"
                        })
                        e.cleanUpStore(u);
                        w.danliao = s; 
                        e.saveWeixin(w, o + "?price=" + v + "&id=" + m);
                    }else {
                        wx.redirectTo({
                            url: o
                        });
                    }
                }
            });
        }
    },
    gotoEdit: function(t) {
        // console.log("前往编辑页面", t);
        var e = this;
        p = r.getDetail(); 
        f = r.getDetails(); 
        h = wx.getStorageSync("info"); 
        r.isEmptyObject(h) && (h = {});
        if ("0" != t) {
            for (var i = 0; i < e.data.list.length; i++) {
                !function(i) {
                    e.data.list[i].id == t && (
                        wx.showNavigationBarLoading(),
                        l.login(function(t) {
                            e.data.list[i].content = e.data.list[i].content.replace(/\%user_name\%/g, t.user_name).replace(/\%avatar\%/g, t.avatar);
                            e.dealData(i);
                            wx.hideNavigationBarLoading(); 
                            e.saveAndRedirect();
                        }, function() {
                            e.data.list[i].content = e.data.list[i].content.replace(/\%user_name\%/g, "无名氏").replace(/\%avatar\%/g, "https://wsgroup.hmset.com/images/wjtq/other/default_avatar.png");
                            e.dealData(i), wx.hideNavigationBarLoading(), e.saveAndRedirect();
                        }, "必须授权登录之后才能操作呢，是否重新授权登录？"));
                }(i); 
            }
        }else if (1 == u) {
            p = {}; 
            e.saveAndRedirect(); 
        }else if (2 == u) {
            if (f[99]) {
                var a = f[99];
                (f = [])[99] = a;
            } else {
                f = [];
            }
            h = {}; 
            e.saveAndRedirect();
        }else if(4 == u) {
            r.isEmptyObject(w.danliao) ? wx.navigateTo({
                url: "/pages/jietu/weixin/danliao/danliao"
            }) : wx.showModal({
                title: "提示",
                content: "还有编辑中的对话哦，要覆盖掉么？",
                confirmText: "覆盖",
                cancelText: "继续编辑",
                success: function(t) {
                    t.confirm ? (w.danliao = {}, e.saveWeixin(w, "/pages/jietu/weixin/danliao/danliao")) : wx.navigateTo({
                        url: "/pages/jietu/weixin/danliao/danliao"
                    });
                }
            })
        }else {
            r.isEmptyObject(w.qunliao) ? wx.navigateTo({
                url: "/pages/jietu/weixin/qunliao/qunliao"
            }) : wx.showModal({
                title: "提示",
                content: "还有编辑中的对话哦，要覆盖掉么？",
                confirmText: "覆盖",
                cancelText: "继续编辑",
                success: function(t) {
                    t.confirm ? (w.qunliao = {}, e.saveWeixin(w, "/pages/jietu/weixin/qunliao/qunliao")) : wx.navigateTo({
                        url: "/pages/jietu/weixin/qunliao/qunliao"
                    });
                }
            });
        }
    },
    saveAndRedirect: function() {
        1 == u ? wx.setStorage({
            key: "current_detail_index",
            data: 99,
            success: function() {
                r.saveDetail(p), wx.navigateTo({
                    url: "/pages/detail/detail?price=" + v + "&id=" + m
                });
            }
        }) : 2 == u && (wx.setStorageSync("details", f), 
            wx.setStorageSync("info", h), 
            wx.navigateTo({
                url: "/pages/circle/circle?price=" + v + "&id=" + m
            }));
    },
    getList: function(t) {
        var i = this;
        r.isEmptyObject(i.data.list) && (i.data.list = []), 
        a || (a = !0, wx.showNavigationBarLoading(), 
        wx.showToast({
            title: "Loading……",
            duration: 2e3,
            icon: "loading"
        }), 
        l.template(t, u, s, function(n) {
            s = n.page, e = n.pageCount > n.page, a = !1, n.cats.selectedId = t, n.cats.scroll = !0, 
            n.cats.height = 45, 
            1 == s && (i.data.list = []);
            // console.log("获取list内容", i.data.list.concat(n.list));
            i.setData({
                tabs: n.cats,
                list: i.data.list.concat(n.list),
                hasMore: e
            }), wx.hideToast(), wx.hideNavigationBarLoading();
        }));
    },
    onReachBottom: function() {
        e && (s++, this.getList(i));
    },
    handleZanTabChange: function(e) {
        var a, n = e.componentId;
        s = 1, i = e.selectedId, this.setData((a = {}, t(a, n + ".selectedId", i), t(a, "list", null), 
        a)), this.getList(i);
    },
    //清除缓存的图片文件
    cleanUpStore: function(a) { //by yuximin 2018/11/9 16:20
        var storeData = wx.getStorageSync("storeData");
        if(!storeData) {
            //没有缓存图片
            return;
        }else {
            switch(a) {
                case "1":
                    //清除朋友圈详情
                    if(storeData.details && storeData.details.length > 0) {
                        this.cleanUpSingleStore(storeData.details);
                        storeData.details = [];
                        wx.setStorageSync("storeData", storeData);
                    }
                break;
                case "2":
                    //清除朋友圈首页
                    if(storeData.circles && storeData.circles.length > 0) {
                        this.cleanUpSingleStore(storeData.circles);
                        storeData.circles = [];
                        wx.setStorageSync("storeData", storeData);
                    }
                break;
                case "3":
                    //清除群聊
                    if(storeData.qunliao && storeData.qunliao.length > 0) {
                        this.cleanUpSingleStore(storeData.qunliao);
                        storeData.qunliao = [];
                        wx.setStorageSync("storeData", storeData);
                    }
                break;
                case "4":
                    //清除单聊
                    if(storeData.danliao && storeData.danliao.length > 0) {
                        this.cleanUpSingleStore(storeData.danliao);
                        storeData.danliao = [];
                        wx.setStorageSync("storeData", storeData);
                    }
                break;
            }
        }
    },
    //清除单项缓存图片
    cleanUpSingleStore: function(data) {
        for(let i = 0; i < data.length; i++) {
            this.delFile(data[i]);
        }
    },
    // //删除编辑中对话的缓存文件（单聊或群聊）
    // cleanWxStore: function(a) { //by yuximin 2018/11/8 20:15
    //     var data;
    //     if(a == 4) {
    //         data = wx.getStorageSync("weixin").danliao;
    //     }else {
    //         data = wx.getStorageSync("weixin").qunliao;
    //     }
    //     for(let i = 0; i < data.users.length; i++) {
    //         if(data.users[i].avatar.substring(0, 13) === "http://store/") {
    //             this.delFile(data.users[i].avatar);
    //         }
    //     }
    //     if(data.bg.url && data.bg.url.substring(0, 13) === "http://store/") {
    //         this.delFile(data.bg.url);
    //     }
    //     for(let i = 0; i < data.list.length; i++) {
    //         if(data.list[i].avatar.substring(0, 13) === "http://store/") {
    //             this.delFile(data.list[i].avatar);
    //         }
    //         if(data.list[i].pic && data.list[i].pic.url && data.list[i].pic.url.substring(0, 13) === "http://store/") {
    //             this.delFile(data.list[i].pic.url);
    //         }
    //     }
    // },
    // //删除编辑中朋友圈的缓存文件（朋友圈首页或朋友圈详情页）
    // cleanCircleStore: function(a) { //by yuximin 2018/11/9 9:43
    //     var details = wx.getStorageSync("details");
    //     var info = wx.getStorageSync("info");
    //     if(a == 2) {
    //         //删除朋友圈首页缓存文件
    //         for(let i = 0; i < 99; i++) {
    //             if(details[i]) {
    //                 this.cleanSingleCirStore(details[i]);
    //             }
    //         }
    //         for(let item in info) {
    //             if(info[item].substring(0, 13) === "http://store/") {
    //                 this.delFile(info[item]);
    //             }
    //         }
    //     }else if(a == 1) {
    //         //删除朋友圈详情页缓存文件
    //         this.cleanSingleCirStore(details[99]);
    //     }
    // },
    // //删除朋友圈单个图文的缓存文件
    // cleanSingleCirStore: function(det) { //by yuximin 2018/11/9 9:48
    //     //头像
    //     if(det.avatar && det.avatar.substring(0, 13) === "http://store/") {
    //         this.delFile(det.avatar);
    //     }
    //     //评论
    //     if(det.comments) {
    //         for(let i = 0; i < det.comments.length; i++) {
    //             if(det.comments[i].avatar && det.comments[i].avatar.substring(0, 13) === "http://store/") {
    //                 this.delFile(det.comments[i].avatar);
    //             }
    //         }
    //     }
    //     //点赞
    //     if(det.likes && typeof(det.likes) === "object") {
    //         for(let i = 0; i< det.likes.length; i++) {
    //             if(det.likes[i] && det.likes[i].substring(0, 13) === "http://store/") {
    //                 this.delFile(det.likes[i]);
    //             }
    //         }
    //     }
    //     //图片
    //     if(det.files) {
    //         for(let i = 0; i < det.files.length; i++) {
    //             if(det.files[i].url && det.files[i].url.substring(0, 13) === "http://store/") {
    //                 this.delFile(det.files[i].url);
    //             }
    //         }
    //     }
    //     //链接图
    //     if(det.link && det.link.avatar && det.link.avatar.substring(0, 13) === "http://store/") {
    //         this.delFile(det.link.avatar);
    //     }
    // },
    //删除缓存文件函数
    delFile: function(file) { //by yuximin 2018/11/8 20:19
        file = file.split("?")[0];
        wx.removeSavedFile({
            filePath: file,
            success: function(res) {
                console.log("删除缓存文件成功", res);
            },
            fail: function(err) {
                console.log("删除缓存文件失败", err);
            }
        })
    }
}));