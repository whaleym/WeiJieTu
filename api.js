const app = getApp()

function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

function e(i, e, t) {
    return e in i ? Object.defineProperty(i, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[e] = t, i;
}

var t = i(require("./utils/user")), n = i(require("./apis/zhuangx")), a = require("./utils/system.js"), p = require("./utils/util.js"), o = require("./utils/wcache.js");

module.exports = {
    wuser: function(i, e, t, n, p) {
        
    },
    getStaticApi: function(i, e) {
       
    },
    template: function(i, e, t, n, p) {
        //获取模板信息
        var u = "cache_templatelist_cat_" + i + "_type_" + e;
        o.get(u) && 1 == t ? n(o.get(u)) : a.myRequest(
            app.globalData.ip + "wjtq/image/templates", 
            {
                cat: i,
                type: e,
                page: t
            }, n, p, 1 == t ? u : "", 600);
    },
    woshishui: function(i, e, t, n) {
    },
    getUrl: function(i, e, t) {
    },
    tousu: function(i, e, t) {
    },
    getQiniuImageTokenApi: function(i) {
    },
    getQiniuVideoTokenApi: function(i) {
    },
    random: function(i, e, t) {
    },
    sendPayTemplate: function(i, e, t, n, p, o, u, s, r) {
    },
    getPayParamsApi: function(i, e, t, n, p, o) {
    },
    getLoginApi: function(i, t, n, p, o, u) {
    },
    newHongbaoitem: function(i, e, t, n, p, o, u, s, r) {
    },
    Hongbaoiteminfo: function(i, e, t) {
    },
    init: function(i, e) {
    },
    tiaozhuan: function(i, e, t) {
    },
    Newduser: function(i, e) {
    },
    newGet:function(data, id, type, s, f){
        // console.log(data,id,type)
        var string = "&";
        for(var i=0;i<data.length;i++){
            string += "t" + i + "=" + data[i] + "&";
        }
        wx.request({
            url: app.globalData.ip + "wjtq/image/create?id="+ id + "&type=" + type + "&num=" + data.length + string,
            data: "",
            header:{
                "Content-Type": "application/json"
            },
            success:res=>{
                // console.log(res)
                s(res);
            },
            fail:res=>{
                console.log(res)
                f(res);
            }
        })
    },
    login: function(i, e, a, p) {
        return void e();
    },
    oldlogin: function(i, e, t) {
        e();
    },
    tixian: function(i, e, t, n, p) {
    },
    mingxi: function(i, e) {
    },
    sharelist: function(i, e, t, n) {
    },
    zanshare: function(i, e) {
    },
    newSharelist: function(i, e, t, n, p, o) {
    },
    getUser: function(i, e) {
        i({
            isVip: 1
        });
    },
    xiezi: function(i, e, t, n, o, u, s, r) {
    },
    profile: function(i, e, t, n) {
    },
    ScreenshotDeal: function(i, t, n, p, o, u, s, r, h, c) {
    },
    getQiniuAvatar: function(i, e, t) {
    },
    cover: function(i, e) {
    },
    zhuangxlist: function(i, e, t, n, p, u) {
    },
    zhuangxinfo: function(i, e, t) {
        //获取页面信息
        var n = "cache_zhuangxinfo_" + i;
        o.get(n) ? e(o.get(n)) : a.myRequest(app.globalData.ip + "wjtq/image/templates2?id="+i+"&version=4.8&platform=devtools&app=weijietuqi&unionid=ohDXKv1gwmpV_xPObOVLM7EFfmss&sid=5bd69e887727bc58228c381b&user_id=oLduJ5ZgztqwORr1adE7b9WhvOH4", {
            id: i
        }, e, t, n, 300);
    },
    zhuangxadd: function(i, e, t) {
    },
    bianLian: function(i, e, t, n) {
    },
    saveformids: function(i, e) {
    },
    zhuangxgif: function(i, e, t) {
    },
    pay: function(i, e, t, n) {
    },
    vippay: function(i, e, t, n) {
    },
    templatePay: function(i, e, t, n) {
    },
    sticker: function(i, e, t, n) {
    },
    getIcons: function(i) {
    },
    decoration: function(i, e, t, n) {
    },
    templateinfo: function(i, e, t) {
    },
    cosmetic: function(i, e, t, n) {
    },
    peopleFilter: function(i, e, t, n, o) {
    },
    flower: function(i, e, t, n) {
    },
    pet: function(i, e, t, n) {
    },
    checkText: function(i, e, t) {
    },
    checkImage: function(i, e, t) {
    },
    getwxacode: function(i, e, t, n, p, o, u, s) {
    },
    messagefrom: function(i, e, t) {
    }
};