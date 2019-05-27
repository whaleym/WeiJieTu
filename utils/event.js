function r(r, a) {
    var n = e[r];
    Array.isArray(n) && (e[r] = a ? n.filter(function(r) {
        return r[0] != a;
    }) : []);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {};

exports.default = {
    on: function(r, a, n) {
        var t = [ a, n ], i = e[r];
        Array.isArray(i) ? i.push(t) : e[r] = [ t ];
    },
    remove: function(a, n) {
        if (a) r(a, n); else for (var t in e) r(t, n);
    },
    emit: function(r, a) {
        var n = e[r];
        Array.isArray(n) && n.map(function(r) {
            var e = r[0];
            r[1].call(e, a);
        });
    }
};