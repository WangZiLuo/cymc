// pages/order_detail/order_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        states: ['订单待付款','订单进行中','订单已完成'],
        request: {
            goodsInfo: [
                {
                    imgUrl: '/image/assets/order_bg.png',
                    name: '抹茶千层',
                    price: 188.50,
                    norm: ['6寸', '收货时间: 10:00-11:30'],
                    amount: 1
                },
                {
                    imgUrl: '/image/assets/order_bg.png',
                    name: '抹茶千层',
                    price: 188.50,
                    norm: ['6寸', '收货时间: 10:00-11:30'],
                    amount: 1
                },
                {
                    imgUrl: '/image/assets/order_bg.png',
                    name: '抹茶千层',
                    price: 188.50,
                    norm: ['6寸', '收货时间: 10:00-11:30'],
                    amount: 1
                }
            ]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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