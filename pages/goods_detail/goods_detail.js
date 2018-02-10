// pages/goods_detail/goods_detail.js
let app = getApp()
let WxParse = require('../../wxParse/wxParse.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        actInx: 0,
        isShow: false,
        submitType: '',  // 0选择购物车 1选择立即购买
        goodsInfo: {
            // id: '34',
            // name: '抹茶千层',
            // banner: [
            //     '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png', '/image/assets/goods_detail_img.png'
            // ],
            // info: '描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述 描述',
            // price: 188,
            // imgHtml: ['/image/assets/html_01.jpg', '/image/assets/html_02.jpg', '/image/assets/html_03.jpg', '/image/assets/html_04.jpg', '/image/assets/html_05.jpg', '/image/assets/html_06.jpg', '/image/assets/html_07.jpg', '/image/assets/html_08.jpg', '/image/assets/html_09.jpg']
        },
        paramselect: {
            name: '',
            title: '',
            imgUrl: '',
            discountPrice: 260,
            price: '',
            normHtml: '',
            amount: 1,
            schTime: '提前5小时预订',
            norm: [
                // {
                //     html: '6寸',
                //     isCheck: 1
                // },
                // {
                //     html: '8寸',
                //     isCheck: 0
                // }
            ]
        },
        cartRequestData: {
            id: '',
            price: '',
            norm: '',
            amount: 1,
            index: 0
        },
        doOrderRequestData: {
            id: '',
            price: '',
            norm: '',
            amount: 1,
            index: 0
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        this.initData(options.wpid)
        this.data.cartRequestData.id = options.wpid
        this.data.doOrderRequestData.id = options.wpid
    },
    initData(_wpid) { 
        let _this = this
        let _paramselect = {}
        //获取商品详情信息
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetproductdetail: '1',
                wpid: _wpid
            },
            success: function (res) {
                if (res.data.msg == 3) {
                    let _goodsInfo = {
                        id: res.data.list[0].wpid,
                        name: res.data.list[0].wpname,
                        banner: getBanner(res.data.list[0].wpallimg, res.data.list[0].wpurl),
                        info: res.data.list[0].wpdescribe,
                        price: res.data.list[0].wpprice,
                        imgHtml: unescape(res.data.list[0].wpdetail).replace(/src="/g, 'src="' + res.data.list[0].wpurl)
                    };
                    _this.setData({
                        'goodsInfo': _goodsInfo,
                        'paramselect.name': res.data.list[0].wpname,
                        'paramselect.title': res.data.list[0].wpvicename,
                        'paramselect.imgUrl': res.data.list[0].wpimg
                    });
                    _this.data.paramselect.name = res.data.list[0].wpname;
                    _this.data.paramselect.title = res.data.list[0].wpvicename;
                    WxParse.wxParse('article', 'html', _goodsInfo.imgHtml, _this, 0);
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 500)
                }
            }
        })
        //获取商品属性
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                doproductattribute: '1',
                wpid: _wpid
            },
            success: function (res) {
                if (res.data.msg == 4) {
                    console.log(res)
                    getInfo(res.data.onevalue)
                }
            }
        })
        //banner数据整理
        function getBanner(img, url) {
            let bannerArr = [];
            img.split(',').forEach(function (ele) {
                ele = url + ele
                bannerArr.push(ele)
            })
            return bannerArr
        }
        //获取属性商品的价格和库存
        function getInfo(str) {
            let norm = [];
            let _check;
            str.split(',').forEach(function (ele, index) {
                wx.request({
                    url: app.globalData.subDomain + '/API/ProgramApi.aspx',
                    data: {
                        doproductattributeprice: '1',
                        wpid: _wpid,
                        onevalue: ele
                    },
                    success: function (res) {
                        if (res.data.msg == 5) {
                            //初始默认
                            if (index == 0) {
                                //购物车提交参数 初始赋值
                                _this.data.cartRequestData.norm = res.data.wsid
                                _this.data.cartRequestData.amount = 1
                                _this.data.cartRequestData.price = res.data.price
                                //立即购买提交参数 初始赋值
                                _this.data.doOrderRequestData.norm = res.data.wsid
                                _this.data.doOrderRequestData.amount = 1
                                _this.data.doOrderRequestData.price = res.data.price
                                _check = 1
                                _this.setData({
                                    'paramselect.price': res.data.price,
                                    'paramselect.normHtml': ele
                                })
                            } else {
                                _check = 0
                            }

                            const normObj = {
                                wsid: res.data.wsid,
                                html: ele,
                                price: res.data.price,
                                stock: res.data.stock,
                                isCheck: _check
                            }
                            norm[index] = normObj
                        }
                        _this.setData({
                            'paramselect.norm': norm 
                        })
                    }
                })
            })
        }
    },
    noTouch(e) {

    },
    popup(e) {
        const _type = e.currentTarget.dataset.type
        this.data.isShow ? this.data.isShow = false : this.data.isShow = true
        this.setData({
            isShow: this.data.isShow
        })
        if ( _type==0 ) {
            this.data.submitType = 0
            this.cartPopup()
        } else if ( _type == 1 ) {
            this.data.submitType = 1
            this.orderPopup()
        }
    },
    cartPopup() {
        const _index = this.data.cartRequestData.index //购物车弹窗 规格选择下标
        this.data.paramselect.norm.forEach( (ele, index) => {
            if ( _index == index ) {
                ele.isCheck = 1
            } else {
                ele.isCheck = 0
            }
        }) 
        this.setData({
            'paramselect.price': this.data.cartRequestData.price,
            'paramselect.normHtml': this.data.paramselect.norm[_index].html,
            'paramselect.amount': this.data.cartRequestData.amount,
            'paramselect.norm': this.data.paramselect.norm
        })
    },
    orderPopup() {
        const _index = this.data.doOrderRequestData.index //下单弹窗 规格选择下标
        this.data.paramselect.norm.forEach((ele, index) => {
            if (_index == index) {
                ele.isCheck = 1
            } else {
                ele.isCheck = 0
            }
        })
        this.setData({
            'paramselect.price': this.data.doOrderRequestData.price,
            'paramselect.normHtml': this.data.paramselect.norm[_index].html,
            'paramselect.amount': this.data.doOrderRequestData.amount,
            'paramselect.norm': this.data.paramselect.norm
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
            url: '../' + page + '/' + page
        })
    },
    add() {
        this.setData({
            'paramselect.amount': ++this.data.paramselect.amount
        })
        if ( this.data.submitType== 0 ) {
            //购物车选择 
            this.data.cartRequestData.amount = this.data.paramselect.amount
        } else if ( this.data.submitType == 1 ) {
            //立即购买选择 
            this.data.doOrderRequestData.amount = this.data.paramselect.amount
        }
        
    },
    minus() {
        if (!(this.data.paramselect.amount == 1)) {
            this.setData({
                'paramselect.amount': --this.data.paramselect.amount
            })
            if (this.data.submitType == 0) {
                //购物车选择 
                this.data.cartRequestData.amount = this.data.paramselect.amount
            } else if (this.data.submitType == 1) {
                //立即购买选择 
                this.data.doOrderRequestData.amount = this.data.paramselect.amount
            }



        }
    },
    chooseNorm(e) { 
        const _index = e.currentTarget.dataset.index
        this.data.paramselect.norm.forEach((item, index) => {
            if (index == _index) {
                item.isCheck = 1
                this.setData({
                    'paramselect.normHtml': item.html,
                    'paramselect.price': item.price
                })
                if (this.data.submitType == 0) {
                    //购物车选择 
                    this.data.cartRequestData.norm = item.wsid
                    this.data.cartRequestData.index = _index
                    this.data.cartRequestData.price = item.price
                    
                } else if (this.data.submitType == 1) {
                    //立即购买选择 
                    this.data.doOrderRequestData.norm = item.wsid
                    this.data.doOrderRequestData.index = _index
                    this.data.doOrderRequestData.price = item.price
                }
                // this.data.requestData.norm = item.wsid
            } else {
                item.isCheck = 0
            }
        })
        this.setData({
            'paramselect.norm': this.data.paramselect.norm
        })
    },
    /**
     * 判断请求对象requestData的属性是否都有值
     */
    chooseRecTime(e) {
        const _index = e.currentTarget.dataset.index
        let x = 0
        this.data.paramselect.recTime.forEach((item, index) => {
            if (!item.optional) {   //optional表示是否为可选的收获时间
                this.data.requestData.recTime = ''
                return
            }
            if (index == _index) {
                item.isCheck = 1
                this.data.requestData.recTime = item.html
            } else {
                item.isCheck = 0
            }
        })
        this.setData({
            'paramselect.recTime': this.data.paramselect.recTime
        })
    },
    /**
     * 确认下单请求
     */
    confirm() {
        if (this.data.submitType == 0) {
            //购物车选择 
            this.cartConfirm()
        } else if (this.data.submitType == 1) {
            //立即购买选择 
            this.orderConfirm()
        }
    },
    cartConfirm() {
        console.log('token---------->', app.globalData.token)
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                doproductjoincar: 1,
                token: app.globalData.token,
                wpid: this.data.cartRequestData.id,
                wsid: this.data.cartRequestData.norm,
                number: this.data.cartRequestData.amount
            },
            success: (res) => {
                if (res.data.msg == 6) {
                    this.setData({
                        isShow: false
                    })
                    wx.showToast({
                        title: '已加入购物车',
                        icon: 'success',
                        duration: 2000
                    })
                } else {

                }
            }
        })
    },
    orderConfirm() {
        this.setData({
            isShow: false
        })
        wx.navigateTo({
            url: '../order_confirm/order_confirm?wsid=' + this.data.doOrderRequestData.norm +
                                                '&wpid=' + this.data.doOrderRequestData.id +
                                                '&number=' + this.data.doOrderRequestData.amount
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
        const timeNow = 907, timeRec = timeNow + 500;
        this.data.paramselect.recTime.forEach((item) => {
            if (timeRec <= item.endTime) {
                item.optional = 1
            } else {
                item.optional = 0
            }

        })
        this.setData({
            'paramselect.recTime': this.data.paramselect.recTime
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