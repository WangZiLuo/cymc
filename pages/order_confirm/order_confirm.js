// pages/order_confirm/order_confirm.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderInfo: {
            list: [
                {
                    name: '抹茶千层',
                    id: 34,
                    imgUrl: '/image/assets/cart_imgBg.png',
                    price: 188.50,
                    amount: 3,
                    norm: ['6寸', '收货时间: 10:00-11:30'],
                    check: 0,
                    txtStyle: ''
                },
                {
                    name: '抹茶千层',
                    id: 34,
                    imgUrl: '/image/assets/cart_imgBg.png',
                    price: 188.50,
                    amount: 3,
                    norm: ['6寸', '收货时间: 10:00-11:30'],
                    check: 0,
                    txtStyle: ''
                }
            ]
        },
        requestData: {
            address: 1,
            comments: '',
        },
        region: ['全部', '全部', '全部'],
        customItem: '全部'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    toLink(e) {
        const page = e.currentTarget.dataset.page
        console.log(page)
        wx.navigateTo({
            url: '../' + page + '/' + page
        })
    },
    bindKeyInput(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    bindRegionChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
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