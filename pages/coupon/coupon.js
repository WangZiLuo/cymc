// pages/coupon/coupon.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        coupon: [
            {
                list: [
                    {
                        id: 11,
                        name: '优惠券',
                        content: '满100减120',
                        status: 0
                    },
                    {
                        id: 12,
                        name: '优惠券',
                        content: '满100减120',
                        status: 0
                    },
                    {
                        id: 13,
                        name: '优惠券',
                        content: '满100减120',
                        status: 0
                    }
                ]
            },
            {
                list: [
                    {
                        id: 21,
                        name: '优惠券',
                        content: '满100减120',
                        status: 1
                    },
                    {
                        id: 22,
                        name: '优惠券',
                        content: '满100减120',
                        status: 1
                    },
                    {
                        id: 23,
                        name: '优惠券',
                        content: '满100减120',
                        status: 1
                    }
                ]
            },
            {
                list: [
                    {
                        id: 31,
                        name: '优惠券',
                        content: '满100减120',
                        status: 2
                    },
                    {
                        id: 32,
                        name: '优惠券',
                        content: '满100减120',
                        status: 2
                    },
                    {
                        id: 33,
                        name: '优惠券',
                        content: '满100减120',
                        status: 2
                    }
                ]
            }
        ]
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    swichNav(e) {
        const index = e.currentTarget.dataset.current
        this.setData({
            currentTab: index
        })
    },
    switchTab(event) {
        this.setData({
            currentTab: event.detail.current
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
            title: '优惠券',
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