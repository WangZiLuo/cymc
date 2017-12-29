// pages/addressManage/addressManage.js
Page({ 

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [
            {
                id: 12,
                isChecked: 1,
                name: '跳跳糖',
                phone: 13566666666,
                address: '浙江省杭州市江干区创客基地浙江省杭州市浙江'
            },
            {
                id: 13,
                isChecked: 0,
                name: '跳跳糖',
                phone: 13566666666,
                address: '浙江省杭州市江干区创客基地浙江省杭州市浙江'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    toLink(e) {
        const page = e.currentTarget.dataset.page
        wx.navigateTo({
            url: '../' + page + '/' + page
        })
    },
    chooseAddress(e) {
        wx.navigateBack({
            delta: 1
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