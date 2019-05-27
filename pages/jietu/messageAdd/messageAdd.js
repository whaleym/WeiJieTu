var t, a, e, i = getApp(), s = require("../../../zanui/index"), n = require("../../../utils/util.js"), l = require("../../../api.js"), o = {
    qunliao: [ {
        value: 1,
        name: "邀请入群",
        text: '"张三"邀请"李四"加入了群聊'
    }, {
        value: 2,
        name: "扫二维码入群",
        text: '"张三"通过扫描"李四"分享的二维码加入群聊'
    }, {
        value: 3,
        name: "消息撤回提示",
        text: '"张三"撤回了一条消息'
    }, {
        value: 4,
        name: "修改群名提示",
        text: '你修改群名为"群聊"'
    }, {
        value: 6,
        name: "隐私安全提示",
        text: '"张三"与群里其他人都不是微信朋友关系，请注意隐私安全'
    } ],
    danliao: [ {
        value: 1,
        name: "消息撤回提示",
        text: '"张三"撤回了一条消息'
    }, {
        value: 2,
        name: "加好友提示",
        text: '你已添加了"张三"，现在可以开始聊天了。'
    }, {
        value: 3,
        name: "打招呼提示",
        text: "以上是打招呼的内容"
    }, {
        value: 4,
        name: "陌生人提示",
        text: "如果陌生人主动添加你为朋友，请谨慎核实对方身份。"
    }, {
        value: 5,
        name: "被删除好友",
        text: "王尼玛开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。"
    } ]
};

Page(Object.assign({}, s.Toast, {
    data: {
        app: {}
    },
    onLoad: function(t) {
        console.log(t), a = t.app, e = t.type, this.init(), this.setData({
            disabled: !1,
            app_name: a,
            type: e
        });
    },
    onShow: function(t) {
        a ? this.init() : console.log("dd");
    },
    init: function() {
        var i = wx.getStorageSync(a);
        n.isEmptyObject(i) && (i = {}), n.isEmptyObject(i[e]) && (i[e] = {}), n.isEmptyObject(i[e].list) && (i[e].list = []), 
        (t = wx.getStorageSync("current_" + a + "_" + e + "_index")) || (t = 0), n.isEmptyObject(i[e].list[t]) && (i[e].list[t] = {}), 
        this.data[a] = i, this.setData({
            types: o[e],
            app: this.data[a],
            index: t
        });
    },
    bindContent: function(i) {
        this.data[a][e].list[t].message = i.detail.value, wx.setStorageSync(a, this.data[a]);
    },
    typeChange: function(i) {
        console.log(i), console.log(o[e][i.detail.value]), this.data[a][e].list[t].typeIndex = o[e][i.detail.value].value, 
        this.data[a][e].list[t].message = o[e][i.detail.value].text, this.setData({
            app: this.data[a]
        }), wx.setStorageSync(a, this.data[a]);
    },
    saveData: function() {
        wx.setStorageSync(a, this.data[a]);
    },
    formSubmit: function(s) {
        s.detail.formId && n.dealFormIds(s.detail.formId);
        var o = i.globalData.gloabalFomIds;
        o && o.length > 2 && l.saveformids(JSON.stringify(o), function() {
            i.globalData.gloabalFomIds = [];
        }), this.data[a][e].list[t].message ? (this.saveData(), wx.navigateBack()) : this.showZanToast("内容必填哦");
    }
}));