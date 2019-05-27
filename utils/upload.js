function e(e) {
    e = e || 32;
    for (var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", i = t.length, a = "", n = 0; n < e; n++) a += t.charAt(Math.floor(Math.random() * i));
    return a;
}

function t(e) {
    var t = e.lastIndexOf("."), i = e.length;
    return e.substring(t, i);
}

function i(i, n, o) {
    var l = t(i.tempFilePath);
    a.getQiniuVideoTokenApi(function(t) {
        o(i);
    });
}

var a = require("../api.js"), n = require("util.js");

module.exports = {
    uploadSingleB: function(i, n, o) {
        var l = t(i.path);
        wx.getImageInfo({
            src: i.path,
            success: function(res) {
                i.width = res.width;
                i.height = res.height;

                // if(i.state == 4) {
                if(i.uname) {
                    //将临时文件保存到本地
                    wx.saveFile({
                        tempFilePath: i.path,
                        success: res => {
                            // console.log("保存文件成功：", res.savedFilePath);
                            var storeData = wx.getStorageSync("storeData");
                            if(!storeData) {
                                storeData = {};
                            }
                            if(!storeData[i.uname]) {
                                storeData[i.uname] = [];
                            }
                            storeData[i.uname].push(res.savedFilePath);
                            wx.setStorageSync("storeData", storeData);
                            i.url = res.savedFilePath;
                            i.state = 2;
                            o(i);
                        },
                        fail: err => {
                            console.log("保存文件失败！！！");
                            i.state = 3;
                            o();
                        }
                    })
                }else{
                    var s = i.path.split("//")[1];
                    var u = n + e(32);
                    wx.uploadFile({
                        url: getApp().globalData.ip + "wjtq/image/upload",
                        filePath: i.path,
                        name: "file",
                        formData: {
                            token: "H1mZo5YAluX1n3Ic_gWFzQFAty0DedVK24gYWbvq:03lRVVNJY…iLCJkZWFkbGluZSI6MTU0MjE2MjkxNCwiZmlsZVR5cGUiOjB9",//t.token,
                            file: s,
                            key: u + l
                        },
                        success: function(e) {
                            // console.log("上传图片返回的数据", e);
                            if("string" === typeof e.data) {
                                var t = JSON.parse(e.data);
                                if(t.success) {
                                    i.url = t.url;
                                    i.state = 2;
                                    o(i);
                                }else {
                                    console.log(t.message);
                                    i.state = 3;
                                    o();
                                }
                            }else {
                                console.log("返回图片数据错误");
                                i.state = 3;
                                o();
                            }
                        },
                        fail: function(e) { 
                            console.log(e);
                            i.state = 3; 
                            o();
                        }
                    });
                }
            },
            fail: function() {
                i.state = 3; 
                o();
            }
        });
    },
    uploadVideo: function(e, t, a) {
        wx.canIUse && wx.canIUse("getFileInfo") ? wx.getFileInfo({
            filePath: e.tempFilePath,
            success: function(o) {
                console.log(o.size), o.size > 6e6 ? (wx.hideNavigationBarLoading(), wx.hideToast(), 
                n.showTips("视频最大限制为5M哦")) : i(e, t, a);
            },
            fail: function() {
                i(e, t, a);
            }
        }) : i(e, t, a);
    }
};