function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function a(t) {
    if ("object" !== (void 0 === t ? "undefined" : u(t))) return !0;
    var e;
    for (e in t) return !1;
    return !0;
}

function n() {
    var t = [];
    return t = wx.getStorageSync("details"), a(t) ? [] : t;
}

function i(t) {
    t = t.replace(/\r\n/g, "\n");
    for (var e = "", a = 0; a < t.length; a++) {
        var n = t.charCodeAt(a);
        n < 128 ? e += String.fromCharCode(n) : n > 127 && n < 2048 ? (e += String.fromCharCode(n >> 6 | 192), 
        e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), 
        e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128));
    }
    return e;
}

function o(t) {
    for (var e = "", a = 0, n = 0, i = 0, o = 0; a < t.length; ) (n = t.charCodeAt(a)) < 128 ? (e += String.fromCharCode(n), 
    a++) : n > 191 && n < 224 ? (i = t.charCodeAt(a + 1), e += String.fromCharCode((31 & n) << 6 | 63 & i), 
    a += 2) : (i = t.charCodeAt(a + 1), o = t.charCodeAt(a + 2), e += String.fromCharCode((15 & n) << 12 | (63 & i) << 6 | 63 & o), 
    a += 3);
    return e;
}

function r(t, e, a) {
    var n = l(t, e, a);
    if (g.push(n), e + s(n) >= s(t)) {
        var i = g;
        return g = [], i;
    }
    return r(t, e + s(n), a);
}

function s(t) {
    for (var e = t.length, a = 0, n = 0; n < e; n++) t.charCodeAt(n) > 128 ? a += 2 : a += 1;
    return a;
}

function l(t, e, a, n) {
    e = e > 0 ? e : 0, a = a > 0 ? a : null;
    for (var i = 0, o = "", r = 0; r < t.length; r++) {
        var s = 0, l = 0;
        if (s = t.charCodeAt(r), l = s > 255 ? 2 : 1, i += l, !(e >= i)) {
            if (!(null == a || (a -= l) >= 0)) {
                n && (o += n);
                break;
            }
            o += String.fromCharCode(s);
        }
    }
    return o;
}

function c(t, e, a, n, i) {
    "zhuangx" == i ? wx.navigateTo({
        // url: "/pages/preview/preview?pic=" + encodeURIComponent(t) + "&title=" + e + "&path=" + encodeURIComponent(a) + "&comfrom=" + i
        url: "/pages/preview/preview?infoUrl=" + t.infoUrl + "&url=" + t.url

    }) : -1 != t.indexOf("http") ? (wx.showNavigationBarLoading(), wx.showToast({
        title: n,
        duration: 2e4,
        icon: "loading"
    }), wx.downloadFile({
        url: h(t),
        success: function(t) {
            wx.hideToast(), wx.hideNavigationBarLoading(), console.log(t.tempFilePath), wx.navigateTo({
                url: "/pages/preview/preview?pic=" + encodeURIComponent(t.tempFilePath) + "&title=" + e + "&path=" + encodeURIComponent(a)
            });
        }
    })) : (wx.navigateTo({
        url: "/pages/preview/preview?pic=" + encodeURIComponent(t) + "&title=" + e + "&path=" + encodeURIComponent(a)
    }))
}

function h(t) {
    
}

var d = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, g = [], m = function() {
    function e(a) {
        t(this, e), this.canvasId = a.canvasId, this.contentItem = a.contentItem, this.size = a.size, 
        this.radio = a.radio, this.imageUrls = a.imageUrls, this.scaleSmall = 1;
    }
    return d(e, [ {
        key: "touchStart",
        value: function(t) {
            this.startPoint = {
                x: t.touches[0].x,
                y: t.touches[0].y
            };
            var e = this.contentItem, a = this.radio, n = this;
            e.forEach(function(t, e, a) {
                n.contentItem[e].disabled = 1;
            });
            for (var i = 0; i < e.length; i++) {
                var o = e[i], r = this.calculateW_H(o), s = (r.w, r.h, a * o.dx), l = a * o.dy, c = {
                    x: s + o.rbX,
                    y: l + o.rbY
                }, h = {
                    x: s - o.rbX,
                    y: l - o.rbY
                }, d = [ {
                    x: s - o.rbX,
                    y: l - o.rbY
                }, {
                    x: s - o.rbX,
                    y: l + o.rbY
                }, {
                    x: s + o.rbX,
                    y: l + o.rbY
                }, {
                    x: s + o.rbX,
                    y: l - o.rbY
                }, {
                    x: s - o.rbX,
                    y: l - o.rbY
                } ], u = this.jugeInCicle(this.startPoint, h, 20), g = this.jugeInCicle(this.startPoint, c, 20), m = this.judgeInPoly(this.startPoint, d, 4);
                if (g) {
                    this.resetParams(!0, !1, i), console.log("isRotate");
                    break;
                }
                if (u && o.cancel) {
                    this.contentItem.splice(i, 1), this.imageUrls.splice(i, 1);
                    break;
                }
                if (m) {
                    this.resetParams(!1, !0, i), console.log("isMove");
                    break;
                }
            }
            return this.drawElements(), {
                contentItem: this.contentItem
            };
        }
    }, {
        key: "touchMove",
        value: function(t) {
            var e = getApp().globalData.system_info.windowWidth / 375 * .5, a = e * this.size.width, n = e * this.size.height, i = [ {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: n
            }, {
                x: a,
                y: n
            }, {
                x: a,
                y: 0
            }, {
                x: 0,
                y: 0
            } ], o = t.touches[0].x, r = t.touches[0].y;
            if (this.judgeInPoly({
                x: o,
                y: r
            }, i, 4)) {
                var s = this.contentItem, l = this.selectedIndex;
                l >= 0 && s[l] && (s[l].isRotate ? this.scaleSmall ? (this.calculateScale(o, r), 
                this.calculateRotate(o, r)) : this.calculateRotate(o, r) : s[l].isMove && (this.contentItem[l].dx += (o - this.startPoint.x) / this.radio, 
                this.contentItem[l].dy += (r - this.startPoint.y) / this.radio, this.startPoint = {
                    x: o,
                    y: r
                })), this.drawElements();
            }
        }
    }, {
        key: "touchEnd",
        value: function() {
            var t = this.selectedIndex;
            t >= 0 && this.contentItem[t] && (this.contentItem[t].isRotate = !1, this.contentItem[t].isMove = !1, 
            this.contentItem[t].isShowSymbol = !1);
        }
    }, {
        key: "setParams",
        value: function(t, e, a) {
            var n = .5 * Math.sqrt(Math.pow(t, 2) + Math.pow(e, 2)), i = Math.atan(e / t);
            this.contentItem[a].oldDistance = n, this.contentItem[a].r = n, this.contentItem[a].rbX = n * Math.cos(i), 
            this.contentItem[a].rbY = n * Math.sin(i), this.contentItem[a].original_w = t;
        }
    }, {
        key: "resetParams",
        value: function(t, e, a) {
            this.contentItem[a].isRotate = t, this.contentItem[a].isMove = e, this.contentItem[a].isShowSymbol = !0, 
            this.contentItem[a].disabled = 0, this.selectedIndex = a;
        }
    }, {
        key: "drawElements",
        value: function(t) {
            var e = wx.createCanvasContext(this.canvasId), a = getApp().globalData.system_info.windowWidth / 375 * .5;
            t && t.circle ? (e.save(), e.arc(t.circle.x, t.circle.y, t.circle.R, 0, 2 * Math.PI), 
            e.clip(), t.src ? e.drawImage(this.imageUrls[this.imageUrls.length - 1], 0, 0, a * this.size.width, a * this.size.height) : (e.rect(0, 0, a * this.size.width, a * this.size.height), 
            e.setFillStyle("white"), e.fill()), e.restore()) : t && t.rectangle && (t.src ? e.drawImage(this.imageUrls[this.imageUrls.length - 1], 0, 0, a * this.size.width, a * this.size.height) : (e.rect(0, 0, a * this.size.width, a * this.size.height), 
            e.setFillStyle("white"), e.fill()));
            var n = this.radio, i = this;
            this.contentItem.forEach(function(t, a, o) {
                var s = i.calculateW_H(t), l = s.w, c = s.h, h = Math.atan(c / l);
                if ("image" == t.type || t.watermark) t.angle ? (e.save(), e.translate(n * t.dx, n * t.dy), 
                e.rotate(t.angle - h), e.drawImage(i.imageUrls[a], -.5 * l, -.5 * c, l, c), t.isShowSymbol && i.symbolAction(e, t, l, c), 
                e.translate(-n * t.dx, -n * t.dy), e.restore()) : e.drawImage(i.imageUrls[a], n * t.dx - .5 * l, n * t.dy - .5 * c, l, c); else if ("text" == t.type) t.angle ? (e.save(), 
                e.translate(n * t.dx, n * t.dy), e.rotate(t.angle - h), e.setFillStyle(t.color), 
                e.setFontSize(n * t.size), e.setTextBaseline("top"), e.fillText(t.value, -.5 * l, -.5 * c), 
                t.isShowSymbol && i.symbolAction(e, t, l, c), e.translate(-n * t.dx, -n * t.dy), 
                e.restore()) : (e.save(), e.setFillStyle(t.color), e.setFontSize(n * t.size), e.setTextBaseline("top"), 
                e.fillText(t.value, n * t.dx - .5 * l, n * t.dy - .5 * c), e.restore()); else if ("textarea" == t.type) {
                    var d = r(t.value, 0, t.lineLenght);
                    if (t.angle) {
                        e.save(), e.translate(n * t.dx, n * t.dy), e.rotate(t.angle - h), e.setFillStyle(t.color), 
                        e.setFontSize(n * t.size), e.setTextBaseline("top");
                        for (var u = 0; u < d.length; u++) e.fillText(d[u], -.5 * l, -.5 * c + n * u * t.lineHeight);
                        t.isShowSymbol && i.symbolAction(e, t, l, c), e.translate(-n * t.dx, -n * t.dy), 
                        e.restore();
                    } else {
                        e.save(), e.setFillStyle(t.color), e.setFontSize(n * t.size), e.setTextBaseline("top");
                        for (var g = 0; g < d.length; g++) e.fillText(d[g], n * t.dx - .5 * l, n * (t.dy + g * t.lineHeight) - .5 * c);
                        e.restore();
                    }
                }
                t.isShowSymbol && !t.angle && i.symbolAction(e, t, l, c);
            }), e.draw();
        }
    }, {
        key: "symbolAction",
        value: function(t, e, a, n) {
            var i = this.radio;
            t.setStrokeStyle("black"), e.angle ? (t.strokeRect(-.5 * a, -.5 * n, a, n), t.drawImage("/styles/lashen.png", .5 * a - 15, .5 * n - 15, 30, 30), 
            e.cancel && t.drawImage("/styles/quxiao.png", -.5 * a - 15, -.5 * n - 15, 30, 30)) : (t.strokeRect(i * e.dx - .5 * a, i * e.dy - .5 * n, a, n), 
            t.drawImage("/styles/lashen.png", i * e.dx + .5 * a - 15, i * e.dy + .5 * n - 15, 30, 30), 
            e.cancel && t.drawImage("/styles/quxiao.png", i * e.dx - .5 * a - 15, i * e.dy - .5 * n - 15, 30, 30));
        }
    }, {
        key: "calculateScale",
        value: function(t, e) {
            var a = this.contentItem, n = this.selectedIndex, i = this.radio, o = Math.sqrt(Math.pow(t - i * a[n].dx, 2) + Math.pow(e - i * a[n].dy, 2)), r = o / a[n].oldDistance;
            "image" == a[n].type || a[n].watermark ? (this.contentItem[n].width *= r, this.contentItem[n].height *= r) : "text" != a[n].type && "textarea" != a[n].type || (this.contentItem[n].size *= r), 
            this.contentItem[n].oldDistance = o, this.calculateW_H(a[n]).w / a[n].original_w <= .5 && (this.scaleSmall = 0);
        }
    }, {
        key: "calculateRotate",
        value: function(t, e) {
            var a = this.contentItem, n = this.selectedIndex, i = this.radio;
            Math.sqrt(Math.pow(t - i * a[n].dx, 2) + Math.pow(e - i * a[n].dy, 2)) / a[n].oldDistance > 1 && (this.scaleSmall = 1);
            var o = this.calculateW_H(a[n]), r = o.w, s = o.h;
            this.contentItem[n].angle = Math.atan2(e - i * a[n].dy, t - i * a[n].dx);
            var l = .5 * Math.sqrt(Math.pow(r, 2) + Math.pow(s, 2));
            this.contentItem[n].r = l, this.contentItem[n].rbX = l * Math.cos(a[n].angle), this.contentItem[n].rbY = l * Math.sin(a[n].angle);
        }
    }, {
        key: "jugeInCicle",
        value: function(t, e, a) {
            return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2) <= Math.pow(a, 2) ? 1 : 0;
        }
    }, {
        key: "judgeInPoly",
        value: function(t, e, a) {
            for (var n = 0, i = 0; i < a; i++) if (e[i].y <= t.y && e[i + 1].y > t.y || e[i].y > t.y && e[i + 1].y <= t.y) {
                var o = (t.y - e[i].y) / (e[i + 1].y - e[i].y);
                t.x < e[i].x + o * (e[i + 1].x - e[i].x) && ++n;
            }
            return n % 2;
        }
    }, {
        key: "calculateW_H",
        value: function(t) {
            var e = this.radio;
            if ("image" == t.type || t.watermark) var a = e * t.width, n = e * t.height; else if ("text" == t.type) var i = s(t.value), a = .5 * e * t.size * i, n = 1.5 * e * t.size; else if ("textarea" == t.type) var o = r(t.value, 0, t.lineLenght), a = e * t.size * o[0].length, n = e * o.length * t.lineLenght;
            return {
                w: a,
                h: n
            };
        }
    } ]), e;
}();

module.exports = {
    urlSafe: function(t) {
        return t.replace(/[+\/]/g, function(t) {
            return "+" === t ? "-" : "_";
        });
    },
    showTips: function(t) {
        var e = arguments[1] ? arguments[1] : 2e3;
        wx.showToast({
            image: "/style/info_icon.png",
            title: t.toString(),
            duration: e
        });
    },
    isEmptyObject: a,
    formatTime: function(t) {
        var a = t.getFullYear(), n = t.getMonth() + 1, i = t.getDate(), o = t.getHours(), r = t.getMinutes(), s = t.getSeconds();
        return [ a, n, i ].map(e).join("/") + " " + [ o, r, s ].map(e).join(":");
    },
    getTimeStr: function() {
        var t = new Date(), e = t.getHours().toString(), a = t.getMinutes().toString();
        return e.length < 2 && (e = "0" + e), a.length < 2 && (a = "0" + a), e + ":" + a;
    },
    formateDateTime: function(t, e) {
        if (!t) return t;
        var a = t.split(" ");
        if (2 != a.length) return t;
        var n = a[0], i = a[1], o = n.split("-");
        if (3 != o.length) return t;
        var r = new Date(), s = r.getFullYear(), l = r.getMonth(), c = r.getDate(), h = new Date(s, l, c), d = h.getTime() - new Date(o[0], o[1] - 1, o[2]).getTime();
        // console.log(t), console.log(n), console.log(h), console.log(o), console.log(new Date(o[0], o[1] - 1, o[2])), 
        // console.log(d);
        var u = Math.floor(d / 864e5);
        if (/*console.log(u), */0 == u) return i;
        if (1 == u) return "昨天 " + i;
        if (!(u > 0 && u < 7)) return "android" == e ? o[0] < s ? o[0] + "年" + (0 == o[1][0] ? o[1][1] : o[1]) + "月" + (0 == o[2][0] ? o[2][1] : o[2]) + "日 " + i : (0 == o[1][0] ? o[1][1] : o[1]) + "月" + (0 == o[2][0] ? o[2][1] : o[2]) + "日 " + i : o[0] + "年" + (0 == o[1][0] ? o[1][1] : o[1]) + "月" + (0 == o[2][0] ? o[2][1] : o[2]) + "日 " + i;
        var g = new Date(n).getDay();
        return 0 == g ? "星期日 " + i : 1 == g ? "星期一 " + i : 2 == g ? "星期二 " + i : 3 == g ? "星期三 " + i : 4 == g ? "星期四 " + i : 5 == g ? "星期五 " + i : 6 == g ? "星期六 " + i : void 0;
    },
    getDetail: function() {
        var t = [], e = wx.getStorageSync("current_detail_index");
        return "" === e && (e = 99), t = wx.getStorageSync("details"), a(t) ? {} : t[e] ? t[e] : {};
    },
    tiaozhuan: function(t, e, a, n) {
        e.closeNotification = t.show({
            image: a.image,
            title: a.title,
            text: a.text,
            data: {
                message: "逗你玩的!!!"
            },
            timer: 3e5,
            onClick: function(t) {
                e.closeNotification(), a.appid ? wx.navigateToMiniProgram ? wx.navigateToMiniProgram({
                    appId: a.appid,
                    path: a.path
                }) : util.previewSingalPic(a.preview) : a.istab ? wx.switchTab({
                    url: a.path
                }) : wx.redirectTo({
                    url: a.path
                });
            },
            onClose: function(t) {
                wx.getStorageSync(n) ? wx.setStorageSync(n, parseInt(wx.getStorageSync(n)) + 1) : wx.setStorageSync(n, 1);
            }
        });
    },
    replaceQiniuHttps: h,
    saveDetail: function(t) {
        var e = [], 
            n = wx.getStorageSync("current_detail_index");
        "" === n && (n = 99), a(e = wx.getStorageSync("details")) && (e = []), e[n] = t, 
        wx.setStorageSync("details", e);
    },
    getDetails: n,
    randomNum: function(t, e) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * t + 1, 10);

          case 2:
            return parseInt(Math.random() * (e - t + 1) + t, 10);

          default:
            return 0;
        }
    },
    encode: function(t) {
        var e, a, n, o, r, s, l, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", h = "", d = 0;
        for (t = i(t); d < t.length; ) o = (e = t.charCodeAt(d++)) >> 2, r = (3 & e) << 4 | (a = t.charCodeAt(d++)) >> 4, 
        s = (15 & a) << 2 | (n = t.charCodeAt(d++)) >> 6, l = 63 & n, isNaN(a) ? s = l = 64 : isNaN(n) && (l = 64), 
        h = h + c.charAt(o) + c.charAt(r) + c.charAt(s) + c.charAt(l);
        return h;
    },
    getDateStr: function() {
        var t = new Date();
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    getVideoAvatar: function(t) {
    },
    getSize: function(t, e, a, n) {
        var i, o, r = n.windowHeight / n.windowWidth * 730 - a, s = 0;
        return e / t > n.windowHeight / n.windowWidth ? (/*console.log(e / t), console.log(n.windowHeight / n.windowWidth), */
        i = r, o = t / e * r) : (/*console.log(e / t), console.log(n.windowHeight / n.windowWidth), */
        o = 730, i = e / t * 730), i < r && (s = (r - i) / 2), {
            width: o,
            height: i,
            marginTop: s
        };
    },
    getTrueLength: s,
    byteSub: l,
    spliteByLength: r,
    setDuihuaIndex: function(t, e) {
        var a = wx.getStorageSync(t);
        this.isEmptyObject(a) && (a = {}), this.isEmptyObject(a[e]) && (a[e] = {}), this.isEmptyObject(a[e].list) && (a[e].list = []);
        // console.log(a[e]);
        var n = a[e].list.length;
        wx.setStorageSync("current_" + t + "_" + e + "_index", parseInt(n));
    },
    setDetailIndex: function() {
        var t = 0, e = n();
        for (var a in e) 99 != a && e[a] && t++;
        wx.setStorageSync("current_detail_index", t);
    },
    removeCircle: function() {
        wx.setStorageSync("info", {});
        var t = n();
        for (var e in t) 99 != e && t[e] && (t[e] = null);
        wx.setStorageSync("details", t);
    },
    emptyDeatails: function() {
        var t = n(), e = !0;
        for (var a in t) 99 != a && t[a] && t[a].content && (e = !1);
        return e;
    },
    endWith: function(t, e) {
        return new RegExp(e + "$").test(t);
    },
    getThumbnailUrl: function(t, e, a, n, i) {
    },
    previewSingalPic: function(t) {
        wx.previewImage({
            current: t,
            urls: [ t ]
        });
    },
    savePic: function(t, e) {
        wx.saveFile({
            tempFilePath: t,
            success: function(t) {
                // console.log(t.savedFilePath);
                e(t.savedFilePath);
            }
        });
    },
    //base64解密
    decode: function(t) {
        var e, a, n, i, r, s, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = "", h = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < t.length; ) e = l.indexOf(t.charAt(h++)) << 2 | (i = l.indexOf(t.charAt(h++))) >> 4, 
        a = (15 & i) << 4 | (r = l.indexOf(t.charAt(h++))) >> 2, n = (3 & r) << 6 | (s = l.indexOf(t.charAt(h++))), 
        c += String.fromCharCode(e), 64 != r && (c += String.fromCharCode(a)), 64 != s && (c += String.fromCharCode(n));
        return c = o(c);
    },
    showPreviewTip: function(t, e, a) {
        var n = getApp();
        "ios" != n.globalData.system_info.platform && n.globalData.system_info.SDKVersion < "1.5.0" && (e = e.replace(/长按/, '点右上角"┇"')), 
        wx.getStorageSync(t) ? c(a) : (wx.setStorageSync(t, 1), wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1,
            confirmText: "知道了",
            complete: function(t) {
                c(a);
            }
        }));
    },
    getDataRange: function() {
        var t = new Date(), e = t.getFullYear(), a = t.getMonth() + 1, n = t.getDate();
        return [ e - 10 + "-" + a + "-" + n, e + "-" + a + "-" + n ];
    },
    randomPrice: function(t, e) {
        var a = (Math.random() * (e - t) + t).toFixed(2);
        return "0.00" == a ? "0.01" : a;
    },
    lunTouchstart: function(t, e) {
        e.data.touchDot = t.touches[0].pageX, e.data.interval = setInterval(function() {
            e.data.time += 1;
        }, 100);
    },
    lunTouchmove: function(t, e) {
        var a = t.touches[0].pageX, n = e.data.touchDot, i = e.data.time;
        a - n <= -40 && i < 10 && !e.data.done && (e.data.done = !0, e.scrollRight(t)), 
        a - n >= 40 && i < 10 && !e.data.done && (e.data.done = !0, e.scrollLeft(t));
    },
    lunTouchend: function(t, e) {
        clearInterval(e.data.interval), e.data.time = 0, e.data.done = !1;
    },
    lunScrollLeft: function(t, e) {
        if (0 != e.data.index) {
            e.setData({
                index: !1
            }), setTimeout(function() {
                e.setData({
                    index: !0
                });
            }, 500);
            var a = e.data.lb, n = a.shift();
            a.push(n);
            for (var i = "", o = "", r = 0; r < a.length; r++) if ("cur" == a[r]) {
                t[r].model ? (o = t[r].model, i = t[r].type) : o = t[r].target.url, t[r].items && t[r].items.length && e.setData({
                    contentItem: t[r].items
                }), t[r].title && wx.setNavigationBarTitle({
                    title: t[r].title
                });
                break;
            }
            e.setData({
                lb: a,
                select: o,
                type: i,
                choice:r

            });
        }
    },
    downloadAndPreview: c,
    lunScrollRight: function(t, e) {
        if (0 != e.data.index) {
            e.setData({
                index: !1
            }), setTimeout(function() {
                e.setData({
                    index: !0
                });
            }, 500);
            var a = e.data.lb, n = a.pop();
            a.unshift(n);
            for (var i = "", o = "", r = 0; r < a.length; r++) if ("cur" == a[r]) {
                t[r].model ? (o = t[r].model, i = t[r].type) : o = t[r].target.url, t[r].items && t[r].items.length && e.setData({
                    contentItem: t[r].items
                }), t[r].title && wx.setNavigationBarTitle({
                    title: t[r].title
                });
                break;
            }
            e.setData({
                lb: a,
                select: o,
                type: i,
                choice:r
            });
        }
    },
    dealFormIds: function(t) {
        var e = getApp(), a = e.globalData.gloabalFomIds;
        a || (a = []);
        var n = {
            formId: t,
            expire: parseInt(new Date().getTime() / 1e3) + 604800
        };
        a.push(n), /*console.log("formIds", a), */e.globalData.gloabalFomIds = a;
    },
    toucheAction: m,
    randdomDomain: function() {
        var t = [ "lvjing", "zhuang", "datoutie", "data", "ai" ];
        return t[Math.floor(Math.random() * t.length)];
    },
    stringTrim: function(t) {
        return t.replace(/(^\s*)|(\s*$)/g, "");
    }
};