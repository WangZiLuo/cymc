// pages/cake/cake.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: { 
        request: {
            banner: '/image/assets/detail-img.png',
            cakeList: [ 
                
            ],
            rowList: [
                {
                    id: 21,
                    imgUrl: '/image/assets/detail-img.png',
                    title: 'MATCHA CAKE',
                    name: '抹茶蛋糕',
                    content: '初壹特制抹茶曲奇订制'
                },
                {
                    id: 22,
                    imgUrl: '/image/assets/detail-img.png',
                    title: 'MATCHA CAKE',
                    name: '抹茶蛋糕',
                    content: '初壹特制抹茶曲奇订制'
                },
                {
                    id: 23,
                    imgUrl: '/image/assets/detail-img.png',
                    title: 'MATCHA CAKE',
                    name: '抹茶蛋糕',
                    content: '初壹特制抹茶曲奇订制'
                },
                {
                    id: 23,
                    imgUrl: '/image/assets/detail-img.png',
                    title: 'MATCHA CAKE',
                    name: '抹茶蛋糕',
                    content: '初壹特制抹茶曲奇订制'
                }
            ]
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData()
    },
    initData() {
        let _this = this
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetproductdetail: '1',
                ptid: '1'
            },
            success: function (res) {
                console.log(res)
                if (res.data.msg == 3) {
                    res.data.list.forEach((ele) => {
                        let cakeListObj = {
                            id: ele.wpid,
                            imgUrl: ele.wptwopic,
                            title: ele.wpvicename,
                            name: ele.wpname,
                            content: ele.wpdescribe
                        }
                        _this.data.request.cakeList.push(cakeListObj)
                    })
                    _this.setData({
                        'request.cakeList': _this.data.request.cakeList
                    })
                }
            }
        })
    },
    toGoodsDetail(e) {
        const parms = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../goods_detail/goods_detail?wpid=' + parms
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
            title: '蛋糕订制',
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