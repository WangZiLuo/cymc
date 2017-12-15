// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topCol: {
            banner: '',
            list: [
                {
                    name: '蛋糕定制',
                    id: 1,
                    imgUrl: '/image/assets/topNav_01.jpg'
                },
                {
                    name: '伴收礼',
                    id: 2,
                    imgUrl: '/image/assets/topNav_02.jpg'
                },
                {
                    name: '周边',
                    id: 3,
                    imgUrl: '/image/assets/topNav_03.jpg'
                }
            ]
        },
        subCol: [
            {
                type: 1,
                title: '蛋糕定制',
                nickname: 'Cake',
                titImg: '/image/assets/subCol_tit_01.png',
                bannerImg: '/image/assets/sub_col_01.jpg',
                list: [
                    {
                        id: 11,
                        name: '抹茶千层',
                        nickname: 'Matcha',
                        imgUrl: ''
                    },
                    {
                        id: 12,
                        name: '抹茶千层',
                        nickname: 'Matcha',
                        imgUrl: ''
                    },
                    {
                        id: 13,
                        name: '抹茶千层',
                        nickname: 'Matcha',
                        imgUrl: ''
                    },
                    {
                        id: 14,
                        name: '抹茶千层',
                        nickname: 'Matcha',
                        imgUrl: ''
                    }
                ]
            },
            {
                type: 2,
                title: '伴手礼定制',
                nickname: 'Gift',
                titImg: '/image/assets/subCol_tit_02.png',
                bannerImg: '/image/assets/sub_col_02.jpg',
                list: [
                    {
                        id: 21,
                        name: '抹茶千层',
                        nickname: 'Matcha',
                        imgUrl: ''
                    },
                    {
                        id: 22,
                        name: '抹茶千层',
                        nickname: 'Matcha',
                        imgUrl: ''
                    }
                ]
            },
            {
                type: 2,
                title: '周边',
                nickname: 'Gift',
                titImg: '/image/assets/subCol_tit_03.png',
                bannerImg: '/image/assets/sub_col_03.jpg',
                list: [
                    {
                        id: 31,
                        name: '手机壳',
                        nickname: 'Gift For You',
                        imgUrl: ''
                    },
                    {
                        id: 32,
                        name: '钥匙扣',
                        nickname: 'Gift For You',
                        imgUrl: ''
                    },
                    {
                        id: 33,
                        name: '手机壳',
                        nickname: 'Gift For You',
                        imgUrl: ''
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