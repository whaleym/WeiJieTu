function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function l(e, l) {
    if (!(e instanceof l)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, l) {
        for (var n = 0; n < l.length; n++) {
            var i = l[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(l, n, i) {
        return n && e(l.prototype, n), i && e(l, i), l;
    };
}(), i = e(require("./cache")), t = e(require("./md5.min")), a = function() {
    function e() {
        l(this, e), this.cache = new i.default("file_station_", !0), this.localFileMap = {}, 
        this.localFileCheck = {};
        try {
            var n = this.cache.get("local_file_map");
            n && (this.localFileMap = n);
        } catch (e) {
            console.log(e);
        }
    }
    return n(e, [ {
        key: "getLocalFileUrl",
        value: function(e) {
            var l = this, n = (0, t.default)(e);
            return new Promise(function(i, t) {
                var a = l.localFileMap[n];
                a ? l.localFileCheck[n] ? wx.getFileInfo({
                    filePath: a,
                    success: function() {
                        l.localFileCheck[n] = !0, i(a);
                    },
                    fail: function() {
                        l.downloadAndSaveFile(e, n).then(function(e) {
                            i(e);
                        }, t);
                    }
                }) : i(a) : l.downloadAndSaveFile(e, n).then(function(e) {
                    i(e);
                }, t);
            });
        }
    }, {
        key: "downloadAndSaveFile",
        value: function(e, l) {
            var n = this;
            return new Promise(function(i, t) {
                wx.downloadFile({
                    url: e,
                    success: function(e) {
                        if (console.log(e), 200 === e.statusCode) {
                            var a = e.tempFilePath;
                            wx.saveFile({
                                tempFilePath: a,
                                success: function(e) {
                                    var t = e.savedFilePath;
                                    n.cacheLocalFile(l, t), i(t);
                                },
                                fail: function() {
                                    t(new Error("加载资源失败，请联系客服"));
                                }
                            });
                        } else t(new Error("加载资源失败，请联系客服"));
                    },
                    fail: function() {
                        t(new Error("加载资源失败，请联系客服"));
                    }
                });
            });
        }
    }, {
        key: "cacheLocalFile",
        value: function(e, l) {
            this.localFileMap[e] = l, this.localFileCheck[e] = !0, this.cache.set("local_file_map", this.localFileMap);
        }
    } ]), e;
}();

exports.default = new a();