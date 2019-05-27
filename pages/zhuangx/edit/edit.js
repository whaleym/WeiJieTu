require("../../../wux/wux");
var pagesNum = 0;

var e, t, a, i = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../utils/user")), n = require("../../../api.js"), o = require("../../../utils/util.js"), r = (require("../../../utils/common.js"), 
require("../../../zanui/index")), l = require("../../../utils/upload.js"), s = {}, u = [], d = getApp(), c = [ "仿宋", "黑体", "楷体", "宋体", "微软雅黑" ], g = [];

Page(Object.assign({}, r.Toast, {
    data: {
        pickerIndex: [],
        disabled: !0,
        date: [],
        time: [],
        buttonText: "生成图片",
        avatar: [],
        lb: [ "cur", "r1", "r2", "l1", "l2" ],
        platform: d.globalData.system_info.platform,
        choice:0
    },
    afterAvatarChoose: function(t) {
        var i = this;
        if ("avatar" == a) 
            o = i.data.avatarIndex; 
        else if ("image" == a) 
            var o = i.data.imageindex;
        o >= 0 && (e[o].localSrc = t); 
        i.setData({
            contentItem: e,
            disabled: !0
        });
        l.uploadSingleB({
            path: t,
            state: 1
        }, "jietu_picture_", function(t) {
            t ? (n.checkImage(t.url), /*console.log(o),*/ o >= 0 && (e[o].value = t.url), /*console.log("更新图片后", e),*/ i.setData({
                contentItem: e
            })) : i.showZanToast("上传失败，请稍后再试呢"), i.setData({
                disabled: !1
            });
        });
    },
    avatarMenu: function(t) {
        a = "avatar";
        var r = t.currentTarget.dataset.avatarindex;
        this.setData({
            avatarIndex: r
        });
        var s = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(t) {
                // console.log("选择照片成功", t.tempFilePaths[0]);
                e[r].width ? wx.navigateTo({
                    url: "../cutInside/cutInside?src=" + t.tempFilePaths[0] + "&width=" + e[r].width + "&height=" + e[r].height
                }) : (e[r].localSrc = t.tempFilePaths[0], s.setData({
                    contentItem: e,
                    disabled: !0
                }), l.uploadSingleB({
                    path: t.tempFilePaths[0],
                    state: 1
                }, "jietu_picture_", function(t) {
                    t ? (n.checkImage(t.url), e[r].value = t.url, s.setData({
                        contentItem: e
                    })) : s.showZanToast("上传失败，请稍后再试呢"), s.setData({
                        disabled: !1
                    });
                }));
            }
        }); 
    },
    imageMenu: function(t) {
        a = "image";
        var i = t.currentTarget.dataset.imageindex;
        this.setData({
            imageindex: i
        });
        var o = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            count: 1,
            success: function(t) {
                e[i].width ? wx.navigateTo({
                    url: "../cutInside/cutInside?src=" + t.tempFilePaths[0] + "&width=" + e[i].width + "&height=" + e[i].height
                }) : (e[i].localSrc = t.tempFilePaths[0], o.setData({
                    contentItem: e,
                    disabled: !0
                }), l.uploadSingleB({
                    path: t.tempFilePaths[0],
                    state: 1
                }, "jietu_picture_", function(t) {
                    t ? (n.checkImage(t.url), e[i].value = t.url, o.setData({
                        contentItem: e
                    })) : o.showZanToast("上传失败，请稍后再试呢"), o.setData({
                        disabled: !1
                    });
                }));
            }
        });
    },
    pickerChange: function(t) {
        // console.log(t);
        this.data.pickerIndex[t.target.dataset.name] = t.detail.value, "自定义" == e[t.target.dataset.name].options[t.detail.value].name ? e[t.target.dataset.name].selfDefine = !0 : e[t.target.dataset.name].selfDefine = !1, 
        this.setData({
            contentItem: e,
            pickerIndex: this.data.pickerIndex
        });
        var a = this;
        e.forEach(function(i, n, o) {
            if (i.relate) {
                var r = i.relate, l = void 0, s = o.filter(function(e, t, a) {
                    if (e.title == r) return l = t, e;
                });
                "select" == s[0].type && s[0].options[t.detail.value[l]] && (e[n].value = s[0].options[t.detail.value[l]].value ? s[0].options[t.detail.value[l]].value : s[0].options[t.detail.value[l]].name, 
                a.setData({
                    contentItem: e
                }));
            }
        });
    },
    bindDateChange: function(t) {
        this.data.date[t.target.dataset.name] = t.detail.value, e[t.target.dataset.name].value = t.detail.value, 
        this.setData({
            date: this.data.date
        });
    },
    inputBlur: function(t) {
        e[t.target.id].value = t.detail.value;
    },
    bindTimeChange: function(e) {
        g[e.target.dataset.name] = e.detail.value, this.setData({
            time: g
        });
    },
    onShow: function() {
        if(getApp().globalData.hasPreviews) {
            this.setData({
                contentItem: this.data.content[this.data.choice].items
            });
            getApp().globalData.hasPreviews = false;
        }

        var t = this;
        wx.getStorage({
            key: "zhuangx_clipImageUrl",
            success: function(e) {
                // console.log("读取本地存档的头像图片路径:", e.data);
                t.afterAvatarChoose(e.data), wx.removeStorage({
                    key: "zhuangx_clipImageUrl",
                    success: function(e) {}
                });
            }
        });
        var a = wx.getStorageSync("zhuangx_user");
        if (!o.isEmptyObject(a)) {
            var i = this.data.avatarIndex;
            i >= 0 && (e[i + 1] && "user_name" == e[i + 1].type && (e[i + 1].value = a.user_name), 
            e[i].width == e[i].height ? (n.checkImage(a.avatar), e[i].value = a.avatar, e[i].localSrc = a.avatar) : wx.navigateTo({
                url: "../cutInside/cutInside?src=" + o.replaceQiniuHttps(a.avatar) + "&width=" + e[i].width + "&height=" + e[i].height
            }), this.setData({
                contentItem: e
            })), wx.removeStorage({
                key: "zhuangx_user",
                success: function(e) {}
            });
        }
    },
    nofityRedirect: function(e) {
        wx.getStorage({
            key: "has_show_jietu_ad",
            complete: function(e) {
                if (e.data) t = e.data + 1; else var t = 1;
                wx.setStorage({
                    key: "has_show_jietu_ad",
                    data: t
                });
            }
        });
    },
    getData: function(e) {
        //获取数据
        var t = this;
        wx.showNavigationBarLoading();
        wx.showToast({
            title: "Loading……",
            duration: 2e4,
            icon: "loading"
        });
        n.zhuangxinfo(e, function(e) {
            (s = e).cat_str && "测一测" == s.cat_str && t.setData({
                buttonText: "测一测"
            }); 
            wx.setNavigationBarTitle({
                title: e.name
            }); 
            t.commonPart(); 
            t.setData({
                disabled: !1
            }); 
            wx.hideNavigationBarLoading(); 
            wx.hideToast();
        }, function() {
            wx.hideNavigationBarLoading(), wx.hideToast(), t.showZanToast("数据不存在或者被删除"), setTimeout(function() {
                // wx.navigateTo({
                //     url: "/pages/zhuangx/list/list?type=1"
                // });
                wx.navigateBack();
            }, 1500);
        });
    },
    onLoad: function(e) {
        // console.log("场景加载", e);
        d.globalData.system_info = wx.getSystemInfoSync();
        var a = this;
        1 == getCurrentPages().length ? a.setData({
            homeLinkText: "去首页看看"
        }) : a.setData({
            homeLinkText: "回到首页"
        });
        !d.globalData.user_is_vip && wx.getStorageSync("has_show_jietu_ad") < 20 && n.tiaozhuan("jietu_edit", function(e) {
            a.setData({
                notifyImage: e.image,
                notifyText: e.text,
                notifyPath: e.path,
                notifyIstab: e.istab,
                notifyAppid: e.appid
            });
        }, function(e) {});
        if(e.scene) {
            t = decodeURIComponent(e.scene);
            n.login(function(e) {
                a.getData(t);
            }, function() {
                a.getData(t);
            }, "必须授权登录之后才能操作呢，是否重新授权登录？");
        }else {
            s = wx.getStorageSync("current_zhuangx_template");
            wx.setNavigationBarTitle({
                title: s.name
            });
            this.commonPart();
        }
    },
    //数据处理
    commonPart: function() {
        // console.log(JSON.stringify(s));
        pagesNum = s.content.length;
        var a = this;
        if ("string" == typeof s.content && (s.content = JSON.parse(o.decode(o.decode(o.decode(s.content))))), (u = s.content.slice())[0].target)
            var i = u[0].target.url;
        if (e = u[0].items, u[0].title && wx.setNavigationBarTitle({
            title: u[0].title
        }), u.length > 1) {
            u.length < 5 && (u = 2 == u.length ? u.concat(u, u) : u.concat(u));
            for (var n = a.data.lb.slice(0, 4), r = 0; r < u.length - 5; r++) 
                n.push("l1");
            n.push("l2");
        }
        var l = u[0].preview.width, 
            c = u[0].preview.height, 
            g = o.getSize(l, c, 400, d.globalData.system_info);
        // console.log(g);
        this.getUserInfo(); 
        t = s.id; 
        this.setData({
            content: u,
            contentItem: e,
            size: g,
            lb: n || "",
            select: i || ""
        });
        // console.log(this.data,'this');
    },
    getUserInfo: function() {
        var t = this, a = !1, i = [], o = [];
        e.forEach(function(e, t, n) {
            "user_name" == e.type && (e.value || (a = !0, i.push(t))); 
            "avatar" == e.type && (e.value || (a = !0, o.push(t)));
        });
        // a && n.login(function(a) {
        //     wx.showNavigationBarLoading();
        //     n.getQiniuAvatar(a.avatar, function(r) {
        //         wx.hideNavigationBarLoading();
        //         for (var l = 0; l < i.length; l++) i[l] >= 0 && (e[i[l]].value = a.user_name);
        //         console.log(r.avatar), n.checkImage(r.avatar);
        //         for (var s = 0; s < o.length; s++) 
        //             o[s] >= 0 && (e[o[s]].value = r.avatar);
        //         t.setData({
        //             contentItem: e
        //         });
        //     }, function() {
        //         t.showZanToast("头像加载失败，请重新上传哦");
        //     });
        // }, function() {}, "必须授权登录之后才能操作呢，是否重新授权登录？");
    },
    onUnload: function() {
        // var e = getCurrentPages();
        // e && e.length && e.length - 2 >= 0 && wx.getStorage({
        //     key: "hasShowJoinMini_jietu_list",
        //     complete: function(t) {
        //         t.data || "pages/index/index" == e[e.length - 2].route && wx.setStorage({
        //             key: "willShowJoinMini_jietu_list",
        //             data: 1
        //         });
        //     }
        // });
    },
    onShareAppMessage: function() {
        return {
            title: s.name,
            path: "/pages/zhuangx/edit/edit?scene=" + s.id + "&sharerId=" + i.default.openId,
            imageUrl: s.avatar.url
        };
    },
    preview: function(e) {
        // console.log(e);
        var t = e.detail.formId;
        o.dealFormIds(t), o.previewSingalPic(e.target.dataset.src);
    },
    textWatermark: function(e, t) {
        var a = "", i = e.gravity, n = e.size;
        e.font && -1 != c.indexOf(e.font) && (n *= 20);
        var r = "/fill/" + o.urlSafe(o.encode(e.color)) + "/fontsize/" + n + "/gravity/" + i + "/dx/" + e.dx + "/dy/";
        if (e.lineLenght) {
            var l = o.spliteByLength(t, 0, e.lineLenght);
            if (e.lineHeight) for (var s = 0; s < l.length; s++) a += "/text/" + o.urlSafe(o.encode(l[s])) + r + (e.dy + e.lineHeight * s), 
            e.font && (a += "/font/" + o.urlSafe(o.encode(e.font))); else a += "/text/" + o.urlSafe(o.encode(l.join("\r\n"))) + r + e.dy, 
            e.font && (a += "/font/" + o.urlSafe(o.encode(e.font)));
            return a;
        }
        return a += "/text/" + o.urlSafe(o.encode(t)) + r + e.dy, e.font && (a += "/font/" + o.urlSafe(o.encode(e.font))), 
        a;
    },
    formSubmit: function(e) {
        // console.log("生成图片");
        this.submit(e);
    },
    submit: function(a) {
        var i = this;
        // console.log(i.data)
        //s为页面的数据，e为上传的数据
        // console.log(s), console.log(e);
        var r = a.detail.formId;
        o.dealFormIds(r);
        var l = d.globalData.gloabalFomIds;
        //发协议保存了一个星期的时间戳
        // n.saveformids(JSON.stringify(l), function() {
        //     d.globalData.gloabalFomIds = [];
        // });
        var g = "has_show_jietu_preview_tip", h = i.data.select + "?watermark/3", f = "生成中……";
        s.cat_str && "测一测" == s.cat_str && (f = "计算中……");
        var v = s.id;
        var id = v;
        e.forEach(function(e, t, i) {
            e.disabled || (v += a.detail.value[t]);
        });
        var m = wx.getStorageSync(v);
        if (m) 
            o.downloadAndPreview(m.result, s.name, "/pages/zhuangx/edit/edit?scene=" + s.id, f); 
        else {
            if (u[0].apiurl) {
                wx.showToast({
                    title: f,
                    duration: 2e4,
                    icon: "loading"
                });
                var p = {}, x = !1, w = [];
                if (e.forEach(function(e, t, n) {
                    var r = void 0;
                    "select" == e.type && e.options[a.detail.value[t]] ? (
                        r = e.options[a.detail.value[t]].value ? e.options[a.detail.value[t]].value : e.options[a.detail.value[t]].name, 
                    r = o.stringTrim(r + "")) : r = a.detail.value[t], r || (x = !0, wx.hideToast(), /*wx.hideLoading(),*/
                    i.showZanToast(e.title + "必填哦")), p[e.name] = r, "image" != e.type && "avatar" != e.type && w.push(r);
                }), x) 
                    return;
                var y = "";
                w.forEach(function(e, t, a) {
                    y += e;
                });
                n.checkText(y, function(e) {
                    // console.log(u[0].apiurl);
                    n.zhuangxgif(u[0].apiurl.replace("random", o.randdomDomain()), p, function(e) {
                        n.zhuangxadd(t, function(e) {}); 
                        if(-1 != e.url.indexOf(".gif")) {
                            o.showPreviewTip(g, "长按图片发送给朋友哦", e.url);
                        }else {
                            o.downloadAndPreview(e.url, s.name, "/pages/zhuangx/edit/edit?scene=" + s.id, "生成中...");
                        }
                        wx.hideToast();
                    });
                }, function() {
                    wx.hideToast(), i.showZanToast("输入内容有违禁词");
                });
            } else {
                wx.showLoading({
                    title: "生成中...",
                    mask: true
                });

                var I = [];
                if (e.forEach(function(e, t, i) {
                    if (e.ramdomRelate) for (var n = e.options[a.detail.value[t]].value, o = 0; o < e.ramdomRelate.length; o++) I.push({
                        key: e.ramdomRelate[o],
                        value: n
                    });
                }), /*console.log("ramdomRelates", I), */u[0].targets) {
                    for (var T = void 0, S = 0; S < I.length; S++) if ("targets" == I[S].key) {
                        T = I[S].value;
                        break;
                    }
                    if (T) _ = u[0].targets.value[T]; else var _ = u[0].targets.value;
                    var b = parseInt(Math.random() * _.length, 10);
                    h = _[b] + "?watermark/3";
                }
                var D = !1;
                // console.log("pic_url", h);
                var k = [], z = [];
                var resultArr = new Array();
                // var resultUrl = new Array();
                //遍历要发送数据的数组
                if (/*console.log("contentItem", e), */e.forEach(function(e, t, r) {

                    if (!e.ramdomRelate) {
                        var l = "";
                        if ("select" == e.type && e.options[a.detail.value[t]]) l = e.options[a.detail.value[t]].value ? e.options[a.detail.value[t]].value : e.options[a.detail.value[t]].name, 
                        l = o.stringTrim(l + ""); else if ("avatar" == e.type) l = e.value ? o.stringTrim(e.value + "") : ""; else if ("random" == e.type) {
                            for (var s = void 0, u = 0; u < I.length; u++) if (I[u].key == e.title) {
                                s = I[u].value;
                                break;
                            }
                            if (s) d = e.value[s]; else var d = e.value;
                            var g = parseInt(Math.random() * d.length, 10);
                            l = d[g]/*, console.log(l)*/;
                        } else if (e.relate) {
                            var f = e.relate, v = void 0, m = r.filter(function(e, t, a) {
                                if (e.title == f) return v = t, e;
                            });
                            l = "select" == m[0].type && m[0].options[a.detail.value[v]] ? (m[0].options[a.detail.value[v]].value ? m[0].options[a.detail.value[v]].value : m[0].options[a.detail.value[v]].name) + "" : m[0].value + "", 
                            l = o.stringTrim(l + "");
                        } else /*console.log(a.detail.value), console.log(t), */l = o.stringTrim(a.detail.value[t] + "");
                        if (/*console.log(l), */!l) 
                            return D = !0, wx.hideLoading(), void i.showZanToast(e.title + "必填哦");
                        "image" != e.type && "avatar" != e.type && z.push(l);
                        var p = e.gravity;
                        if ("select" == e.type && e.options[a.detail.value[t]]) l = (e.prefix ? e.prefix : "") + (e.options[a.detail.value[t]].value ? e.options[a.detail.value[t]].value : e.options[a.detail.value[t]].name) + (e.suffix ? e.suffix : ""); else if ("avatar" == e.type) l = e.value; else if ("random" == e.type) ; else if (e.relate) {
                            var x = e.relate, w = void 0, y = r.filter(function(e, t, a) {
                                if (e.title == x) return w = t, e;
                            });
                            l = "select" == y[0].type && y[0].options[a.detail.value[w]] ? y[0].options[a.detail.value[w]].value ? y[0].options[a.detail.value[w]].value : y[0].options[a.detail.value[w]].name : y[0].value, 
                            l = (e.prefix ? e.prefix : "") + l + (e.suffix ? e.suffix : "");
                        } else {
                            l = (e.prefix ? e.prefix : "") + a.detail.value[t] + (e.suffix ? e.suffix : "")
                        }
                        //数据的文字 颜色大小
                        // console.log(l);
                        resultArr.push(l);
                        if(resultArr.length == r.length){
                            // console.log('所有数据都存入完毕')
                            // console.log(resultArr,'--------------------------', i.data.choice, pagesNum, i.data.choice % pagesNum)
                            n.newGet(resultArr, id, i.data.choice % pagesNum, function(s){
                                // resultUrl.push(s.data.url)
                                console.log("上传返回的数据", s);
                                o.downloadAndPreview(s.data, s.name, "/pages/zhuangx/edit/edit?scene=" + s.id, f, "zhuangx")
                            },function(f){
                                console.log(f,'=======')
                            });
                        }
                    }
                }), D) return;
            }
            wx.removeStorageSync("zhuangx_" + t);
        }
    },
    touchstart: function(e) {
        var t = this;
        o.lunTouchstart(e, t);
    },
    touchmove: function(e) {
        var t = this;
        o.lunTouchmove(e, t);
    },
    touchend: function(e) {
        var t = this;
        o.lunTouchend(e, t);
    },
    scrollLeft: function(t) {
        var a = this;
        if (t.detail) {
            var i = t.detail.formId;
            o.dealFormIds(i);
        }
        o.lunScrollLeft(u, a); 
        e = this.data.contentItem;
        this.getUserInfo();
    },
    scrollRight: function(t) {
        var a = this;
        if (t.detail) {
            var i = t.detail.formId;
            o.dealFormIds(i);
        }
        o.lunScrollRight(u, a);
        e = this.data.contentItem; 
        this.getUserInfo();
    }
}));