// pages/goods_detail/goods_detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        actInx: 0,
        isShow: false,
        goodsInfo: {
            id: '34',
            name: '抹茶千层',
            banner: [
                '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png'
            ],
            info: '描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述',
            price: 188,
            imgHtml: ['/image/assets/html_01.jpg', '/image/assets/html_02.jpg', '/image/assets/html_03.jpg', '/image/assets/html_04.jpg', '/image/assets/html_05.jpg', '/image/assets/html_06.jpg', '/image/assets/html_07.jpg', '/image/assets/html_08.jpg', '/image/assets/html_09.jpg']
        },
        paramselect: {
            discountPrice: 260,
            price: 277,
            normHtml: '6寸',
            amount: 1,
            schTime: '提前5小时预订',
            norm: [
                {
                    html: '6寸',
                    isCheck: 1
                },
                {
                    html: '8寸',
                    isCheck: 0
                }
            ],
            recTime: [
                {
                    startTime: 1000,
                    endTime: 1130,
                    html:'10:00 - 11:30',
                    optional: 0,
                    isCheck: 0
                },
                {
                    startTime: 1600,
                    endTime: 1830,
                    html: '16:00 - 18:30',
                    optional: 1,
                    isCheck: 0
                },
                {
                    startTime: 2100,
                    endTime: 2200,
                    html: '21:00 - 22:00',
                    optional: 1,
                    isCheck: 0
                }
            ]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) { 

    },
    noTouch(e) {
        
    },
    popup() {
        this.data.isShow ? this.data.isShow = false : this.data.isShow = true
        this.setData({
            isShow: this.data.isShow
        })
    },
    listenSwiper(e) {
        this.setData({
            actInx: e.detail.current
        })
    },
    toLink(e) {
        const page = e.currentTarget.dataset.page
        wx.switchTab({
            url: '../'+page+'/'+page
        })
    },
    add() {
        this.setData({
            'paramselect.amount': ++this.data.paramselect.amount
        })
    },
    minus() {
        console.log(this.data.paramselect.amount)
        if (!(this.data.paramselect.amount==1)) {
            this.setData({
                'paramselect.amount': --this.data.paramselect.amount
            })
        }
    },
    chooseNorm(e) {
        const _index = e.currentTarget.dataset.index
        this.data.paramselect.norm.forEach((item,index) => {
            if (index == _index) {
                item.isCheck = 1
                this.setData({
                    'paramselect.normHtml': item.html
                })
            } else {
                item.isCheck = 0
            }
        })
        this.setData({
            'paramselect.norm': this.data.paramselect.norm
        })
    },
    chooseRecTime(e) {
        const _index = e.currentTarget.dataset.index
        this.data.paramselect.recTime.forEach((item, index) => {
            if (!item.optional) {
                return
            }
            if (index == _index) {
                item.isCheck = 1
            } else {
                item.isCheck = 0
            }
        })
        this.setData({
            'paramselect.recTime': this.data.paramselect.recTime
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
            title: '商品详情'
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