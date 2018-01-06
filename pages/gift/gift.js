// pages/gift/gift.js
Page({ 

    /**
     * 页面的初始数据
     */
    data: {
        request: {
            banner: '/image/assets/detail-img.png',
            giftList: [
                {
                    id: 11,
                    imgUrl: '/image/assets/detail-img.png',
                    title: '初壹订制',
                    content: '初壹特制抹茶曲奇订制'
                },
                {
                    id: 12,
                    imgUrl: '/image/assets/detail-img.png',
                    title: '初壹订制',
                    content: '初壹特制抹茶曲奇订制'
                },
                {
                    id: 13,
                    imgUrl: '/image/assets/detail-img.png',
                    title: '初壹订制',
                    content: '初壹特制抹茶曲奇订制'
                },
                {
                    id: 14,
                    imgUrl: '/image/assets/detail-img.png',
                    title: '初壹订制',
                    content: '初壹特制抹茶曲奇订制'
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