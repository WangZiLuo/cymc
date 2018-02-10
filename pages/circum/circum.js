// pages/circum/circum.js
let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        request: {
            banner: '/image/assets/detail-img.png',
            circumList: [
                // [
                //     {
                //         id: 21,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 22,
                //         type: 1,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     }
                // ],
                // [
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/detail-img.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     }
                // ],
                // [
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     }
                // ],
                // [
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/detail-img.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     },
                //     {
                //         id: 23,
                //         type: 0,
                //         imgUrl: '/image/assets/smart.png',
                //         title: 'MATCHA CAKE',
                //         name: '抹茶蛋糕',
                //         content: '初壹特制抹茶曲奇订制'
                //     }
                // ]
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
                ptid: '3'
            },
            success: function (res) {
                if (res.data.msg == 3) {
                    console.log(res.data)
                    res.data.list.forEach((ele,index) => {
                        if ( (index + 1) % 3 == 1 ) {
                            let emArr = []
                            _this.data.request.circumList.push(emArr)
                        }
                        let _index = _this.data.request.circumList.length -1   
                        let circumListObj = {
                            id: ele.wpid,
                            imgUrl: ele.wptwopic,
                        };
                        _this.data.request.circumList[_index].push(circumListObj)
                    })
                    _this.setData({
                        'request.circumList': _this.data.request.circumList
                    })
                }
            }
        })
        console.log(this.data.request.circumList)
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