function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    };
}(), n = function() {
    function n() {
        t(this, n), this._systemInfo = null;
    }
    return e(n, [ {
        key: "init",
        value: function() {
            var t = this;
            return new Promise(function(e, n) {
                wx.getSystemInfo({
                    success: function(n) {
                        if (n.statusBarHeight) {
                            var i = n.screenHeight - n.windowHeight - n.statusBarHeight;
                            i > 90 && (i -= 54), i > 50 && (i = 50), n.navigationBarHeight = i;
                        } else "android" === n.platform ? n.navigationBarHeight = 48 : n.navigationBarHeight = 44, 
                        n.statusBarHeight = 20;
                        t.systemInfo = n, e();
                    }
                });
            });
        }
    }, {
        key: "systemInfo",
        get: function() {
            return this._systemInfo;
        },
        set: function(t) {
            this._systemInfo = t;
        }
    } ]), n;
}();

exports.default = new n();