function i(i) {
    return i && i.__esModule ? i : {
        default: i
    };
}

var t, e, a = i(require("../../utils/navigation-bar")), n = i(require("../../utils/app-config")), l = getApp(), s = (require("../../utils/upload.js"), 
require("../../utils/util.js")), h = require("../../api.js"), c = require("../../zanui/index"), o = "", u = 0;

Page(Object.assign({}, c.Toast, {
    data: {
        dianliang: [ "31%", "46%", "68%", "85%" ],
        dianliangIndex: 0,
        yunyingshang: [ "中国联通", "中国移动", "中国电信" ],
        yunyingshangIndex: 0,
        localFilePath: "",
        screenshotHeight: "100vh",
        processing: !1,
        setUnread: !1,
        unreadCount: 0
    },
    binddianliangChange: function(i) {
        this.setData({
            dianliangIndex: i.detail.value
        });
    },
    bindyunyingshangChange: function(i) {
        this.setData({
            yunyingshangIndex: i.detail.value
        });
    },
    onLoad: function(i) {
        console.log("截图处理界面", i);
        var a = {
            1: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/ios_pengyouquan_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/ios_pengyouquan_chulihou.jpg"
            },
            2: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/ios_xiangqingyewenzi_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/ios_xiangqingyewenzi_chulihou.jpg"
            },
            3: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/ios_danliao_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/ios_danliao_chulihou.jpg"
            },
            4: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/ios_qunliao_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/ios_qunliao_chulihou.jpg"
            },
            5: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/ios_xiangqingye_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/ios_xiangqingye_chulihou.jpg"
            }
        };
        "android" == l.globalData.system_info.platform && (a = {
            1: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/az_pengyouquan_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/az_pengyouquan_chulihou.jpg"
            },
            2: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/az_xiangqingye_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/az_xiangqingye_chulihou.jpg"
            },
            3: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/az_danliao_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/az_danliao_chulihou.jpg"
            },
            4: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/az_qunliao_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/az_qunliao_chulihou.jpg"
            },
            5: {
                left: "https://wsgroup.hmset.com/images/wjtq/other/az_xiangqingye_chuliqian.jpg",
                right: "https://wsgroup.hmset.com/images/wjtq/other/az_xiangqingye_chulihou.jpg"
            }
        }), t = i.cat, e = i.id, i.title && (o = i.title), h.getUser(function(i) {
            i.isVip && (u = i.isVip);
        }, function() {}), this.cat = t, this.ctx = wx.createCanvasContext("navCanvas");
        var s = {
            list: a[t],
            screenshotHeight: n.default.systemInfo.screenHeight + "px"
        };
        "3" !== t && "4" !== t || "ios" !== n.default.systemInfo.platform && "devtools" !== n.default.systemInfo.platform || (s.setUnread = !0), 
        this.setData(s);
    },
    bindUnreadInput: function(i) {
        this.setData({
            unreadCount: i.detail.value
        });
    },
    selectScreenshot: function(i) {
        var t = this;
        wx.chooseImage({
            sizeType: [ "original" ],
            sourceType: [ "album" ],
            count: 1,
            success: function(i) {
                var e = i.tempFilePaths[0];
                t.setData({
                    localFilePath: e
                });
                t.initCanvas(e);
            }
        });
    },
    clearSelect: function() {
        this.setData({
            localFilePath: ""
        });
    },
    initCanvas: function(i) {
        var e = this;
        wx.showLoading({
            title: "截图处理中...",
            mask: !0
        });
        n.default.init().then(function() {
            var l = e.ctx;
            l.drawImage(i, 0, 0, n.default.systemInfo.screenWidth, n.default.systemInfo.screenHeight);
            var s = a.default.getSystemToolRect(),
                h = "1" === t ? "#F2F2F2" : "#3a393f";
            if (l.setFillStyle(h), l.fillRect(s.x, s.y, s.w, s.h), "3" === e.cat || "4" === e.cat) 
                a.default.getMoreButtonImage().then(function(i) {
                    if (l.drawImage(i.src, i.x, i.y, i.w, i.h), "android" !== n.default.systemInfo.platform) {
                        var t = e.ctx,
                            s = a.default.getBackButtonTextPosition();
                        t.setTextBaseline("middle");
                        t.setFontSize(16);
                        t.setFillStyle("white");
                        t.fillText("微信", s.x, s.y);
                        var h = e.data.unreadCount;
                        if (h > 0) {
                            t.setFontSize(15);
                            var c = s.x + 32;
                            h > 999 ? h = "999+" : h += "";
                            t.fillText("(", c, s.y - 1);
                            c += 7;
                            t.fillText(h, c, s.y);
                            c += 7 * h.length + Math.round(1.6 * (h.length - 1)) + 2;
                            t.fillText(")", c, s.y - 1);
                        }
                    }
                    l.draw(!1, e.exportPicture);
                }); 
            else if ("1" === t)
                a.default.getCameraButtonImage().then(function(i) {
                    l.drawImage(i.src, i.x, i.y, i.w, i.h), l.draw(!1, e.exportPicture);
                });
            else if ("2" === t || "5" === t) {
                if ("android" !== n.default.systemInfo.platform) {
                    var c = a.default.getBackButtonTextPosition();
                    "5" === t ? (l.setFillStyle(h), l.setTextBaseline("middle"), l.setFontSize(16), 
                    l.fillRect(0, c.y - 20, c.x, 40), l.setFillStyle("#31D633"), l.fillText("完成", 11, c.y)) : (l.setTextBaseline("middle"), 
                    l.setFontSize(16), l.setFillStyle("white"), l.fillText("相册", c.x, c.y));
                }
                l.draw(!1, e.exportPicture);
            } else 
                l.draw(!1, e.exportPicture);
        });
    },
    exportPicture: function() {
        wx.canvasToTempFilePath({
            canvasId: "navCanvas",
            success: function(i) {
                wx.hideLoading();
                console.log("截取屏幕生成的路径", i.tempFilePath);
                s.downloadAndPreview(i.tempFilePath, "生成朋友圈界面；生成微信对话；装X神器；", "/pages/index/index", "生成中...");
            },
            fail: function(i) {
                console.log(i);
            }
        });
    }
}));