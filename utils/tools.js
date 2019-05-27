module.exports = {
	request: function(url, method, data){
        // console.log("request-------",url,method,data);
        return new Promise(function(resolve, reject){
	        wx.request({
	            url: url,
	            dataType: 'json',
	            method: method,
	            header: {
	                "content-type": "application/x-www-form-urlencoded"
	            },
	            data: data,
	            success: function (res) {
	            	resolve(res);
	            },
	            fail: function(err){
	            	reject(err);
	            }
	        });
        })
    },
    getNowFormatDate: function() {
	    var date = new Date();
	    var seperator1 = "-";
	    var year = date.getFullYear();
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    var currentdate = year + seperator1 + month + seperator1 + strDate;
	    return currentdate;
	}
}