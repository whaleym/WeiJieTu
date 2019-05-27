function n(n) {
    if (Array.isArray(n)) {
        for (var o = 0, e = Array(n.length); o < n.length; o++) e[o] = n[o];
        return e;
    }
    return Array.from(n);
}

function o() {
    for (var n = arguments.length, o = Array(n), e = 0; e < n; e++) o[e] = arguments[e];
    if (0 === o.length) return function(n) {
        return n;
    };
    if (1 === o.length) return o[0];
    var t = o[o.length - 1], r = o.slice(0, -1);
    return function() {
        return r.reduceRight(function(n, o) {
            return o(n);
        }, t.apply(void 0, arguments));
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}(require("./event")), t = function(n) {
    return "function" == typeof n;
}, r = function() {}, a = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage" ], i = function(n) {
    this.onBeforeLoad(n), this.onNativeLoad(n), this.onAfterLoad(n);
}, u = function(n) {
    this.onNativeUnload(n), e.default.remove(null, this);
}, f = function(n) {
    var o = {};
    return n.forEach(function(n) {
        var e = n.data, t = void 0 === e ? {} : e;
        Object.keys(t).forEach(function(n) {
            o[n] = t[n];
        });
    }), o;
}, c = function(n) {
    var o = {};
    return n.forEach(function(n) {
        var e = n.methods, r = void 0 === e ? {} : e;
        Object.keys(r).forEach(function(n) {
            if (t(r[n])) {
                if ("onLoad" === n) return;
                o[n] = r[n];
            }
        }), a.forEach(function(e) {
            t(n[e]) && (o[e] ? o[e] = o[e].concat(n[e]) : o[e] = [ n[e] ]);
        });
    }), o;
}, d = function(n, o) {
    return Object.keys(n).forEach(function(e) {
        void 0 === o[e] && (o[e] = n[e]);
    }), o;
}, l = function(e, r) {
    return Object.keys(e).forEach(function(i) {
        if (a.includes(i)) {
            var u = e[i];
            t(r[i]) && u.push(r[i]), r[i] = function() {
                var e = this;
                o.apply(void 0, n(u.reverse().map(function(n) {
                    return n.bind(e);
                }))).apply(void 0, arguments);
            };
        } else null == r[i] && (r[i] = e[i]);
    }), r;
};

exports.default = function(n) {
    var o = n, e = o.mixins, t = void 0 === e ? [] : e, a = o.onBeforeLoad, s = void 0 === a ? r : a, v = o.onAfterLoad, h = void 0 === v ? r : v, y = n.onLoad || r, p = n.onUnload || r, L = n.data || {}, g = f(t), A = c(t);
    return Object.assign(n, {
        data: d(g, L),
        onLoad: i,
        onUnload: u,
        onBeforeLoad: s,
        onAfterLoad: h,
        onNativeLoad: y,
        onNativeUnload: p
    }), n = l(A, n);
};