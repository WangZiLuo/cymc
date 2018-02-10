//app.js
App({ 
    onLaunch: function () { 
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // wx.getUserInfo({
        //     success: res => {
        //         // 可以将 res 发送给后台解码出 unionId
        //         this.globalData.userInfo = res.userInfo
        //     }
        // })

        var that = this;
        //  获取商城名称
        wx.request({
            url: that.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetmallname: '1',
                microid: that.globalData.microid
            },
            success: function (res) {
                wx.setStorageSync('mallName', res.data.data.value);
            }
        })
        this.login();
    },
    onShow: function () {
        // this.login();
    },
    login: function () {
        var that = this;
        var token = that.globalData.token;
        if (token) {
            wx.request({
                url: that.globalData.subDomain + '/API/WxAppApi.ashx',
                data: {
                    rtype: 'checktoken',
                    token: token
                },
                success: function (res) {
                    if (res.data.code != 0) {
                        that.globalData.token = null;
                        that.login();
                    }
                }
            })
            return;
        }
        wx.login({
            success: function (res) {
                var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
                wx.getUserInfo({
                    success: function (res2) {
                        var iv = res2.iv;
                        var encryptedData = res2.encryptedData;
                        var signature = res2.signature;
                        var rawData = res2.rawData;

                        wx.request({
                            url: that.globalData.subDomain + '/API/WxAppApi.ashx',
                            data: {
                                rtype: 'login',
                                code: code,
                                encryptedData: encryptedData,
                                iv: iv,
                                signature: signature,
                                rawData: rawData,
                                microid: that.globalData.microid
                            },
                            success: function (res3) {
                                if (res3.data.code != 1) {
                                    // 登录错误 
                                    wx.hideLoading();
                                    wx.showModal({
                                        title: '提示',
                                        content: '无法登录，请重试',
                                        showCancel: false
                                    })
                                    return;
                                }

                                that.globalData.token = res3.data.data.token;
                            }
                        })
                    }
                })
            }
        })
    },
    globalData: {
        token: '',
        microid: '1',
        userInfo: null,
        subDomain: "https://wx.ajiuqian.com/chuyimocha"
    }
})