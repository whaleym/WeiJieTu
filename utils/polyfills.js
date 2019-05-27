Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    if (void 0 === t || null === t) throw new TypeError("Cannot convert undefined or null to object");
    for (var n = Object(t), e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        if (void 0 !== r && null !== r) for (var o in r) r.hasOwnProperty(o) && (n[o] = r[o]);
    }
    return n;
}, n = function(t, n) {
    return t >>= 0, n = String(n || " "), this.length > t ? String(this) : ((t -= this.length) > n.length && (n += n.repeat(t / n.length)), 
    n.slice(0, t) + String(this));
};

exports.default = {
    add: function() {
        "function" != typeof Object.assign && (Object.assign = t), "function" != typeof String.prototype.padStart && (String.prototype.padStart = n);
    }
};