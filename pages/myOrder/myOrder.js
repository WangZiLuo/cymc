// pages/myOrder/myOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        load: {
            isLoad: false
        },
        orderList: [
            {
                list: [
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/order_bg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '1'
                    },
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '2'
                    }
                ]
            },
            {
                list: [
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '1'
                    },
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '1'
                    }
                ]
            },
            {
                list: [
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '2'
                    },
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '2'
                    }
                ]
            },
            {
                list: [
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '3'
                    },
                    {
                        goodsList: [
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 1,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            },
                            {
                                name: '抹茶千层',
                                id: 34,
                                imgUrl: '/image/assets/cart_imgBg.png',
                                price: 188.50,
                                amount: 2,
                                norm: ['6寸', '收货时间: 10:00-11:30']
                            }
                        ],
                        total: 565.50,
                        status: '3'
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
    loadMore(e) {
        // return
        if (this.data.load.isLoad) return 
        this.setData({
            'load.isLoad': true
        })
        const type = e.currentTarget.dataset.type
        // const url = this.getUrl(type)

        setTimeout( ()=> {
            this.data.orderList[type].list.push(this.data.orderList[type].list[0])
            this.setData({
                orderList: this.data.orderList,
                'load.isLoad': false
            })
        },1000)
        
    },
    getUrl(type) {
        switch (type) {
            case 0:

                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            default:

        }
        return 
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
            title: '我的订单',
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