// pages/order_confirm/order_confirm.js
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCouponShow: false,
        isRecTimeShow: false,
        orderInfo: {
            list: [
                // {
                //     name: '抹茶千层',
                //     id: 34,
                //     imgUrl: '/image/assets/cart_imgBg.png',
                //     price: 188.50,
                //     amount: 3,
                //     norm: ['6寸', '收货时间: 10:00-11:30'],
                // }
            ],
            address: {},
            fare: '',
            couponStatus: '',
            coupmoney: '',
            total: ''
        },
        couponList: [],
        recTime: [
                {
                    startTime: 1000,
                    endTime: 1130,
                    html: '10:00 - 11:30',
                    optional: 0,
                    isCheck: 0
                },
                {
                    startTime: 1600,
                    endTime: 1830,
                    html: '16:00 - 18:30',
                    optional: 0,
                    isCheck: 0
                },
                {
                    startTime: 2100,
                    endTime: 2200,
                    html: '21:00 - 22:00',
                    optional: 0,
                    isCheck: 0
                }
            ],
        requestData: {
            wsid: '',           //商品属性Id 
            wpid: '',           //商品ID
            number: '',         //数量
            addressid: '',      //地址ID
            couponid: '',       //优惠券ID
            remark: '',        //留言
            shtime: '',         //选择时间
        },
        leavePage: {
            addressid: '',      //地址ID
            couponid: '',       //优惠券ID
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        //跳页参数赋值给请求参数
        Object.assign(this.data.requestData,options) 
        this.initData(options)
        this.checkRecTime()
        console.log('token---------->', app.globalData.token)
    },
    initData(options) {
        let _this = this
        //获取默认地址
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                doaddress: 1,
                token: app.globalData.token,
                isdefalut: 1
            },
            success: (res) => {
                let addId = ''
                if (res.data.msg == 10) {
                    console.log(res)
                    if (res.data.list[0]) {
                        addId = res.data.list[0].addressid
                        this.setData({
                            'orderInfo.address': res.data.list[0],
                            'requestData.addressid': res.data.list[0].addressid
                        })
                    }
                }
                getOrderData(addId, options)
            }
        })
        //获取订单信息
        function getOrderData(addId, options) {
            wx.request({
                url: app.globalData.subDomain + '/API/ProgramApi.aspx',
                data: {
                    doshoworderlist: 1,
                    token: app.globalData.token,
                    wcids: options.wcid || '',
                    wsids: options.wsid || '',
                    nums: options.number || '',
                    addressid: addId
                },
                success: (res) => {
                    if (res.data.msg == 9) {
                        let orderArr = [],
                            _total = 0
                        res.data.list.forEach( (ele) => {
                            orderArr.push({
                                name: unescape(ele.listtit),
                                imgUrl: ele.listimg,
                                price: ele.listpre,
                                amount: ele.counter,
                                norm: [ele.onevalue, ele.twovalue]
                            })
                            _total += (Number(ele.listpre) * 100 * Number(ele.counter) )/100
                        })
                        _total += Number(res.data.freightmoney)
                        _this.setData({
                            'orderInfo.list': orderArr,
                            'orderInfo.fare': res.data.freightmoney,
                            'orderInfo.coupmoney': res.data.coupmoney,
                            'orderInfo.total': _total
                        })
                        getCouponData(_total)
                    }
                }
            })
        }
        //获取优惠券信息
        function getCouponData(total) {
            wx.request({
                url: app.globalData.subDomain + '/API/ProgramApi.aspx',
                data: {
                    dogetcoupon: 1,
                    token: app.globalData.token,
                    money: total,
                },
                success: (res) => {
                    if (res.data.msg == 15) {
                        let unusedArr = []
                        res.data.list.forEach( (ele) => {
                            const nowTime = new Date(ele.nowtime.replace(/-/g, "/")).getTime();
                            const starttime = new Date(ele.starttime.replace(/-/g, "/")).getTime();
                            const endtime = new Date(ele.endtime.replace(/-/g, "/")).getTime();
                            if (nowTime <= endtime && nowTime >= starttime && ele.userstatus ==1 ) {
                                unusedArr.push({
                                    id: ele.couponid,
                                    name: ele.name,
                                    money: ele.breakmoney,
                                    status: 1,
                                    startTim: lineToDot(ele.starttime),
                                    endTim: lineToDot(ele.endtime),
                                    isCheck: 0,
                                })
                                _this.setData({ 
                                    'orderInfo.couponStatus': '可用'
                                })
                            }
                        })
                        if (_this.data.orderInfo.couponStatus == '') {
                            _this.setData({
                                'orderInfo.couponStatus': '无可用'
                            })
                        }
                        _this.setData({
                            'couponList': unusedArr
                        })
                        setTimeout(function () {
                            wx.hideLoading()
                        }, 500)
                    }
                }
            })
        }
        function lineToDot(str) {
            return str.replace(/-/g, '.')
        }
    },
    checkRecTime() { 
        var now = new Date(); 
        const hh = now.getHours() + 5;
        let mm = now.getMinutes().toString();
        if (mm.length == 1) mm = '0' + mm
        let TIME = hh + mm
        console.log(TIME)
        this.data.recTime.forEach( (ele) => {
            if (TIME <= ele.endTime) {
                ele.optional = 1
            }
        })
        this.setData({
            recTime: this.data.recTime
        })
    },
    //优惠券弹起
    popup(e) {
        if (this.data.orderInfo.couponStatus == '无可用' || this.data.orderInfo.couponStatus == '') return
        this.data.isCouponShow ? this.data.isCouponShow = false : this.data.isCouponShow = true
        this.setData({
            isCouponShow: this.data.isCouponShow
        })
    },
    popupRecTime(e) {
        this.data.isRecTimeShow ? this.data.isRecTimeShow = false : this.data.isRecTimeShow = true
        this.setData({
            isRecTimeShow: this.data.isRecTimeShow
        })
    },
    select(e) {
        let _this = this
        const _index = e.currentTarget.dataset.index
        this.data.couponList.forEach( (ele, index) => {
            ele.isCheck = 0
            if (index == _index) {
                ele.isCheck = 1
                this.setData({
                    'requestData.couponid': ele.id
                })
            }
        })
        getNewOrderData()
        this.setData({
            isCouponShow: false
        })
        this.setData({
            couponList: this.data.couponList
        })



        //获取订单信息
        function getNewOrderData() {
            wx.request({
                url: app.globalData.subDomain + '/API/ProgramApi.aspx',
                data: {
                    doshoworderlist: 1,
                    token: app.globalData.token,
                    wcids: _this.data.requestData.wcid || '',
                    wsids: _this.data.requestData.wsid || '',
                    nums: _this.data.requestData.number || '',
                    addressid: _this.data.requestData.addressid || '',
                    couponid: _this.data.requestData.couponid || '',
                },
                success: (res) => {
                    if (res.data.msg == 9) {
                        let _total = 0
                        res.data.list.forEach((ele) => {
                            _total += (Number(ele.listpre) * 100 * Number(ele.counter)) / 100
                        })
                        _total += Number(res.data.freightmoney)
                        _total -= Number(res.data.coupmoney)
                        _this.setData({
                            'orderInfo.fare': res.data.freightmoney,
                            'orderInfo.coupmoney': res.data.coupmoney,
                            'orderInfo.total': _total
                        })
                    }
                }
            })
        }
    },
    chooseRecTime(e) {
        const _index = e.currentTarget.dataset.index
        let x = 0
        if (!this.data.recTime[_index].optional) return
        this.data.recTime.forEach((item, index) => {
            if (index == _index) {
                item.isCheck = 1
                this.setData({
                    'requestData.shtime': item.html
                })
                this.data.requestData.recTime = item.html
            } else {
                item.isCheck = 0
            }
        })
        this.setData({
            'recTime': this.data.recTime
        })
        this.setData({
            isRecTimeShow: false
        })
    },
    toLink(e) { 
        const page = e.currentTarget.dataset.page
        wx.navigateTo({
            url: '../' + page + '/' + page + '?from=orderCon'
        })
    },
    bindKeyInput(e) {
        this.setData({
            'requestData.remark': e.detail.value
        })
    },
    submitOrder() {
        if (!this.data.requestData.addressid) {
            wx.showToast({
                title: '请选择地址',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!this.data.requestData.shtime) {
            wx.showToast({
                title: '请选择配送时间',
                icon: 'none',
                duration: 2000
            })
            return
        }



        let baseData = {}
        if (this.data.requestData.wsid) {
            baseData = {
                doaddorder: 1,
                token: app.globalData.token
            }
        } else if (this.data.requestData.wcid) {
            baseData = {
                doaddcartorder: 1,
                token: app.globalData.token
            }
        }
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: Object.assign(
                baseData, 
                this.data.requestData
            ),
            success: (res) => {
                if (res.data.msg == 13 || res.data.msg == 14) {
                    console.log(res)
                    this.toWechatPay(res.data.ordernumber)
                } else {
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 500)
                }
            }
        })
    },
    toWechatPay(orderNum) {
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
                        'success': function (res) {
                            wx.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 1000
                            })
                            setTimeout(() => { 
                                wx.redirectTo({
                                    url: '../order_detail/order_detail?number=' + orderNum,
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
                                duration: 1000
                            })
                            setTimeout( () => {
                                wx.redirectTo({
                                    url: '../order_detail/order_detail?number=' + orderNum,
                                })
                            },1000)

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
        let _this = this
        if (this.data.leavePage.addressid != this.data.requestData.addressid) {
            //重新请求地址
            getNewAddress(getNewOrderData)
        }
        if (this.data.leavePage.couponid != this.data.requestData.couponid) {
            //重新请求地址
            getNewCoupon()
        }
        //获取地址信息
        function getNewAddress(callback) { 
            wx.request({
                url: app.globalData.subDomain + '/API/ProgramApi.aspx',
                data: {
                    doaddress: 1,
                    token: app.globalData.token,
                    isdefalut: 1
                },
                success: (res) => {
                    if (res.data.msg == 10) {
                        _this.setData({
                            'orderInfo.address': res.data.list[0],
                            'requestData.addressid': res.data.list[0].addressid
                        })
                        typeof(callback) === 'function' && callback()
                    }
                }
            })
        }
        //获取优惠券信息
        function getNewCoupon(callback) {
            
        }
        //获取订单信息
        function getNewOrderData() {
            
            wx.request({
                url: app.globalData.subDomain + '/API/ProgramApi.aspx',
                data: {
                    doshoworderlist: 1,
                    token: app.globalData.token,
                    wcids: _this.data.requestData.wcid || '',
                    wsids: _this.data.requestData.wsid || '',
                    nums: _this.data.requestData.number || '',
                    addressid: _this.data.requestData.addressid || '',
                    couponid: _this.data.requestData.couponid || '',
                },
                success: (res) => {
                    if (res.data.msg == 9) {
                        let _total = 0
                        res.data.list.forEach((ele) => {
                            _total += (Number(ele.listpre) * 100 * Number(ele.counter)) / 100
                        })
                        _total += Number(res.data.freightmoney)
                        _total -= Number(res.data.coupmoney)
                        _this.setData({
                            'orderInfo.fare': res.data.freightmoney,
                            'orderInfo.coupmoney': res.data.coupmoney,
                            'orderInfo.total': _total
                        })
                    }
                }
            })
        }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        //离开页面 保存离开页面前的地址id和优惠券id
        this.data.leavePage.addressid = this.data.requestData.addressid 
        this.data.leavePage.couponid = this.data.requestData.couponid
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