function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e, t) {
    var i = {};
    i.showWxEmojiChooseView = 1, void 0 === (u = t) && (u = ""), i.WxEmojiTextArray = a(t), 
    i.textAreaText = u, i.emojiArray = s, n = i, o.setData({
        WxEmojiObjs: i
    });
}

function a(e) {
    for (var t = e.split(r), a = e.match(r), i = [], o = 0; o < t.length; o++) if (i.push({
        node: "text",
        text: t[o]
    }), o < t.length - 1) {
        var n = a[o].split("[")[1].split("]")[0];
        i.push({
            node: "element",
            tag: "emoji",
            text: x[n]
        });
    }
    return i;
}

var i, o, r, n, x = {}, s = [], u = "";

module.exports = (i = {
    init: function(e, t) {
        r = e, x = t, s = [];
        for (var a in x) s.push({
            key: a,
            value: x[a]
        });
    },
    bindThis: function(e) {
        o = e;
        var t = {};
        t.showWxEmojiChooseView = 1, t.textAreaText = u, t.emojiArray = s, n = t, o.setData({
            WxEmojiObjs: t
        });
    },
    text: u,
    transEmojiStr: a,
    buildTextObjs: function(e, t) {
        var i = {};
        i.WxEmojiTextArray = a(t), o.setData({
            WxEmojiObjs: i
        });
    },
    buildTextAreaObjs: t
}, e(i, "buildTextAreaObjs", t), e(i, "WxEmojiTextareaFocus", function(e, t) {
    o = e;
}), e(i, "WxEmojiTextareaBlur", function(e, a) {
    o = e, 0 != a.detail.value.length && (console.log(a.detail.value), t(o, a.detail.value));
}), e(i, "wxPreEmojiTap", function(e, a) {
    o = e;
    var i = a.target.dataset.text;
    0 != i.length && (u += i, n.textAreaText = u, o.setData({
        WxEmojiObjs: n
    }), t(o, u));
}), i);