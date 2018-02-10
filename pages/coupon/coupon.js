// pages/coupon/coupon.js
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        coupon: [
            {
                list: [
                    // {
                    //     id: 11,
                    //     name: '优惠券',
                    //     content: '满100减120',
                    //     status: 0
                    // },
                    // {
                    //     id: 12,
                    //     name: '优惠券',
                    //     content: '满100减120',
                    //     status: 0
                    // },
                    // {
                    //     id: 13,
                    //     name: '优惠券',
                    //     content: '满100减120',
                    //     status: 0
                    // }
                ]
            },
            {
                list: [
                   
                ]
            },
            {
                list: [
                   
                ]
            }
        ]
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData()
    },
    initData() {
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetcoupon: 1,
                token: app.globalData.token
            },
            success: (res) => {
                if (res.data.msg==15) {
                    let unusedArr = []
                    let expiredArr = []
                    let usedArr = []
                    res.data.list.forEach((ele) => {
                        if (ele.userstatus == 2) {
                            usedArr.push({
                                id: ele.couponid,
                                name: ele.name,
                                money: ele.breakmoney,
                                status: 2,
                                startTim: lineToDot(ele.starttime),
                                endTim: lineToDot(ele.endtime),
                            })
                        } else {
                            if (isExpired(ele.starttime, ele.endtime, ele.nowtime)) {
                                unusedArr.push({
                                    id: ele.couponid,
                                    name: ele.name,
                                    money: ele.breakmoney,
                                    status: 1,
                                    startTim: lineToDot(ele.starttime),
                                    endTim: lineToDot(ele.endtime),
                                })
                            } else {
                                expiredArr.push({
                                    id: ele.couponid,
                                    name: ele.name,
                                    money: ele.breakmoney,
                                    status: 0,
                                    startTim: lineToDot(ele.starttime),
                                    endTim: lineToDot(ele.endtime),
                                })
                            }

                        }
                    })
                    this.setData({
                        'coupon[0].list': unusedArr,
                        'coupon[1].list': expiredArr,
                        'coupon[2].list': usedArr,
                    })
                }
                
                console.log(res)
                
            }
        })
        function lineToDot(str) {
            return str.replace(/-/g,'.')
        }
        function isExpired(staTim,endTim,nowTim) {
            const nowTime = new Date(nowTim.replace(/-/g, "/")).getTime();
            const startTime = new Date(staTim.replace(/-/g, "/")).getTime();
            const endTime = new Date(endTim.replace(/-/g, "/")).getTime();
            if (nowTime<=endTime&&nowTime>=startTime) {
                return true
            } else {
                return false
            }
        }
    },
    switchNav(e) {
        const index = e.currentTarget.dataset.current
        this.setData({
            currentTab: index
        })
    },
    switchTab(event) {
        this.setData({
            currentTab: event.detail.current
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
            title: '优惠券',
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