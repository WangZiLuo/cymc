// pages/myOrder/myOrder.js
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        status: '',
        pageNo: 1,
        noData: false,
        load: {
            isLoad: false
        },
        orderList: [
            {
                
            },
            {
                
            },
            {
                
            },
            {
                
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.initData()
    },
    initData() {
        wx.showLoading({
            title: '加载中',
        })
        const index = this.data.currentTab
        this.setData({
            pageNo: 1
        })
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                domyorderlist: 1,
                token: app.globalData.token,
                status: this.data.status,
                p: this.data.pageNo
            },
            success: (res) => {
                if (res.data.msg == 17) {
                    console.log(res)
                    let _list = []
                    res.data.list.forEach( (ele) => {
                        _list.push({
                            goodsList: this.orderGoodsList(ele.list),
                            orderid: ele.orderid,
                            ordernumber: ele.ordernumber,
                            total: ele.ordertotalfee,
                            status: ele.orderstatus,
                            type: toTypeName(ele.orderstatus)
                        })
                    })
                    this.data.orderList[index] = { list: _list }
                    this.setData({
                        'orderList': this.data.orderList,
                        pageNo: ++this.data.pageNo,
                        noData: false
                    })
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 500)
                }
            }
        })
        function toTypeName(status) {
            let str
            if (status == 2) {
                str = '待付款'
            } else if (status == 1) {
                str = '进行中'
            } else if (status == 5) {
                str = '已完成'
            } else if (status == 0) {
                str = '已取消'
            }
            return str
        }
    },
    orderGoodsList(arr) {
        let goodsList = []
            arr.forEach((ele) => {
            goodsList.push({
                name: unescape(ele.listtit),
                imgUrl: ele.listimg,
                price: ele.listpre,
                amount: ele.counter,
                norm: [ele.onevalue, ele.twovalue]
            })
        })
        return goodsList
    },
    toOrderDetail(e) {
        const id = e.currentTarget.dataset.orderid
        wx.navigateTo({
            url: '../order_detail/order_detail?orderid=' + id,
        })
    },
    swichNav(e) {
        let _this = this
        const index = e.currentTarget.dataset.current
        if (index == this.data.currentTab) return
        this.setData({
            currentTab: index,
            pageNo: 1
        })
        this.getUrl(index)
        this.initData(index)
    },
    loadMore(e) {
        if (this.data.load.isLoad) return 
        this.setData({
            'load.isLoad': true
        })

        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                domyorderlist: 1,
                token: app.globalData.token,
                status: this.data.status,
                p: this.data.pageNo
            },
            success: (res) => {

                if (res.data.msg == 17) {
                    if (res.data.list.length == 0) {
                        this.setData({
                            noData: true
                        })
                        setTimeout( () => {
                            this.setData({
                                'load.isLoad': false
                            })
                        },2000)
                        return
                    }
                    let _list = []
                    const _index = this.data.currentTab
                    res.data.list.forEach((ele) => {
                        _list.push({
                            goodsList: this.orderGoodsList(ele.list),
                            orderid: ele.orderid,
                            ordernumber: ele.ordernumber,
                            total: ele.ordermoney,
                            status: ele.orderstatus,
                            type: toTypeName(ele.orderstatus)
                        })
                    })
                    this.data.orderList[_index].list = this.data.orderList[_index].list.concat(_list)
                    this.setData({
                        'orderList': this.data.orderList,
                        'load.isLoad': false,
                        noData: false,
                        pageNo: ++this.data.pageNo
                    })
                }
            }
        })
        function toTypeName(status) {
            let str
            if (status == 2) {
                str = '待付款'
            } else if (status == 1) {
                str = '进行中'
            } else if (status == 5) {
                str = '已完成'
            } else if (status == 0) {
                str = '已取消'
            }
            return str
        }
    },
    getUrl(index) {
        if (index == 0) {
            this.setData({
                status: ''
            })
        }
        if (index == 1) {
            this.setData({
                status: 2
            })
        }
        if (index == 2) {
            this.setData({
                status: 1
            })
        }
        if (index == 3) {
            this.setData({
                status: 5
            })
        }
    },
    cancelOrder(e) { 
        const index = e.currentTarget.dataset.index
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
                    const arr = this.data.orderList[this.data.currentTab].list
                    arr.splice(index,1)
                    this.data.orderList[this.data.currentTab].list = arr
                    this.setData({
                        orderList: this.data.orderList
                    })
                    wx.showToast({
                        title: '操作成功',
                        icon: 'success',
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
                    //当在全部Tab页 更新列表状态  当在待付款   移除操作订单
                    if (this.data.currentTab == 0) {
                        this.data.orderList[this.data.currentTab].list[index].status = 5
                        this.data.orderList[this.data.currentTab].list[index].type = '已完成'
                        this.setData({
                            orderList: this.data.orderList
                        })
                    } else if (this.data.currentTab == 2) {
                        const arr = this.data.orderList[this.data.currentTab].list
                        arr.splice(index, 1)
                        this.data.orderList[this.data.currentTab].list = arr
                        this.setData({
                            orderList: this.data.orderList
                        })
                    }
                    wx.showToast({
                        title: '操作成功',
                        icon: 'success',
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
                                duration: 2000
                            })
                            //当在全部Tab页 更新列表状态  当在待付款   移除操作订单
                            if (this.data.currentTab == 0) {
                                this.data.orderList[this.data.currentTab].list[index].status = 1
                                this.data.orderList[this.data.currentTab].list[index].type = '进行中'
                                this.setData({
                                    orderList: this.data.orderList
                                })
                            } else if (this.data.currentTab == 1) {
                                const arr = this.data.orderList[this.data.currentTab].list
                                arr.splice(index, 1)
                                this.data.orderList[this.data.currentTab].list = arr
                                this.setData({
                                    orderList: this.data.orderList
                                })
                            }
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
            title: '我的订单',
        })
        this.initData()
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