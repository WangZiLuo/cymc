// pages/order_detail/order_detail.js
let app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        status: '',
        states: ['订单待付款', '订单进行中', '订单已完成'],
        addressInfo: {
            address: '',
            name: '',
            phone: ''
        },
        orderInfo: {
            fare: '',
            coupon: '',
            total: '',
            orderNumber: '',
            orderCreateTime: '',
            orderid: ''
        },
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
        console.log(options)
        const id = options.orderid || ''
        const _number = options.number || ''
        this.initData(id,_number)
    },
    initData(id,_number) {
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                domyorderlist: 1,
                token: app.globalData.token,
                orderid: id,
                ordernumber: _number
            },
            success: (res) => {
                if (res.data.msg == 17) {
                    console.log(res)
                    let _list = []
                    this.setData({
                        status: res.data.list[0].orderstatus,
                        states: getStatus(res.data.list[0].orderstatus),
                        'addressInfo.address': res.data.list[0].address,
                        'addressInfo.name': res.data.list[0].name,
                        'addressInfo.phone': res.data.list[0].phone,
                        'orderInfo.orderid': res.data.list[0].orderid,
                        'orderInfo.fare': res.data.list[0].freightmoney,
                        'orderInfo.coupon': res.data.list[0].couponmoney,
                        'orderInfo.total': res.data.list[0].ordertotalfee,
                        'orderInfo.orderNumber': res.data.list[0].ordernumber,
                        'orderInfo.orderCreateTime': res.data.list[0].ordercreatetime,
                        'request.goodsInfo': getGoodsList(res.data.list[0].list)
                    })
                }
            }
        })
        function getStatus(status) {
            let str
            if (status == 2) {
                str = '订单待付款'
            } else if (status == 1) {
                str = '订单进行中'
            } else if (status == 5) {
                str = '订单已完成'
            } else if (status == 0) {
                str = '订单已取消'
            }
            return str
        }
        function getGoodsList(item) {
            let arr = []
            item.forEach( (ele) => {
                arr.push({
                    imgUrl: ele.listimg,
                    name: unescape(ele.listtit),
                    price: ele.listpre,
                    norm: [ele.onevalue, ele.twovalue],
                    amount: ele.counter
                })
            })
            return arr
        }
    },
    cancelOrder(e) {
        const id = e.currentTarget.dataset.orderid
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dochangestatus: 1,
                token: app.globalData.token,
                status: 0,
                orderid: id
            },
            success: (res) => {
                if (res.data.msg == 18) {
                    wx.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout( () => {
                        wx.navigateBack({
                            
                        })
                    },1000)
                } else {
                    wx.showToast({
                        title: '操作失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        })
    },
    confirmOrder(e) {
        const index = e.currentTarget.dataset.index
        const id = e.currentTarget.dataset.orderid
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dochangestatus: 1,
                token: app.globalData.token,
                status: 5,
                orderid: id
            },
            success: (res) => {
                if (res.data.msg == 18) {
                    wx.showToast({
                        title: '操作成功',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout(() => {
                        wx.navigateBack({

                        })
                    }, 1000)
                } else {
                    wx.showToast({
                        title: '操作失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        })
    },
    toPay(e) { 
        wx.showLoading({
            title: '加载中',
        })
        const index = e.currentTarget.dataset.index
        const orderNum = e.currentTarget.dataset.ordernumber
        //创建订单成功了就发起预支付API
        wx.request({
            url: app.globalData.subDomain + '/PlugIn/WeChatPay/WXAPPPay.aspx',
            data: {
                dounifiedorder: '1',
                token: app.globalData.token,
                ordernumber: orderNum
            },
            success: (res2) => {
                if (res2.data.code == 0) {
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 500)
                    wx.requestPayment({
                        timeStamp: res2.data.timeStamp,
                        nonceStr: res2.data.nonceStr,
                        package: res2.data.package,
                        signType: res2.data.signType,
                        paySign: res2.data.paySign,
                        'success': (res) => {
                            wx.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 1000
                            })
                            setTimeout(() => {
                                wx.navigateBack({

                                })
                            }, 1000)
                            //支付成功发送模版消息
                            wx.setStorageSync('orderliststatus', 3);
                            // wx.switchTab({
                            //     url: '../order-list/index'
                            // })
                        },
                        'fail': function (res) {
                            wx.showToast({
                                title: '支付失败',
                                icon: 'none',
                                duration: 2000
                            })
                            ///判断是订单详情页跳转过来的 还是 购物车/直接购买跳转过来的
                            // if (that.data.isorder)
                            //     wx.navigateBack(-1);
                            // else {
                            //     wx.setStorageSync('orderliststatus', 2);
                            //     wx.switchTab({
                            //         url: '../order-list/index'
                            //     })
                            // }
                        }
                    })
                }
            }
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
            title: '订单详情'
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