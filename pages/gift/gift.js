// pages/gift/gift.js
let app = getApp()
Page({ 

    /**
     * 页面的初始数据
     */
    data: {
        request: {
            banner: '/image/assets/detail-img.png',
            giftList: [
               
            ]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData()
    },
    initData() {
        let _this = this
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetproductdetail: '1',
                ptid: '2'
            },
            success: function (res) {  
                if (res.data.msg == 3) {
                    res.data.list.forEach((ele) => {
                        let giftListObj = {
                            id: ele.wpid,
                            imgUrl: ele.wptwopic,
                            title: ele.wpvicename,
                            name: ele.wpname,
                            content: ele.wpdescribe
                        }
                        _this.data.request.giftList.push(giftListObj)
                    })
                    _this.setData({
                        'request.giftList': _this.data.request.giftList
                    })
                }
            }
        })
    },
    toGoodsDetail(e) {
        const parms = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../goods_detail/goods_detail?wpid=' + parms
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '伴手礼订制',
        })
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})