Page({
    onLoad: function(a) {
        var p = {
            appId: a.appid
        };
        a.path && (p.path = a.path), wx.navigateToMiniProgram(p);
    }
});