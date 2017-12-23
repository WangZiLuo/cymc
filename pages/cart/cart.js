// pages/cart/cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkImg: {
            check: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEMUFCRDE3RTNDQTExRTc5RUZGQzIyRTVCNkIzRDk5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEMUFCRDE4RTNDQTExRTc5RUZGQzIyRTVCNkIzRDk5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEQxQUJEMTVFM0NBMTFFNzlFRkZDMjJFNUI2QjNEOTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEQxQUJEMTZFM0NBMTFFNzlFRkZDMjJFNUI2QjNEOTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7obAtwAAACVklEQVR42qyVvWsUQRiHZ+f2SHqLaCF21h5GQhBjl/jRaGGhgTTpbEK0EIyCogQEiR+9XVKqlXqJFknQ2ByeCP4DKUwstM7e7d36/NZZWIY9s7nzhR/z/cw773wFjUbDyCqViul2u6lcOQyCYILyFMUT6Agaoi5KkmSH/FfSNdIN6mKUjgvD0Fhr03xQBKfjeXSL6rNmf9tEj+j/1odbr6M8W0JvSoJlE0j9lzQ+35CHD6MXgOe1InNAI0TzSOOHsxDZLEM4FkmmzWA23el0Flutlonj+C9cMWbWOfMfDOgcOsckxgJVnO4wgR2A+Rkto0gc7C7pUEg4TlMY75cKZA0Hr6Lf5I9RdYZ03HHtVD8bmIFRCqZ4Ch13mxvofigUtUHAQAQ+Sf4l6UjWzr2pCX64HzBJCsZLgV9TPup1G7H+wXfL+obuM2i7ALxKck2hQKM9wOm9ETzya9mHBZZ1j+wltO2FQuBfzuNXPcCyPcF3Pa8FucIEFfJNqi6jH9StK8ac33+FIm8/LXFresvWbZ3hIjx35S8kk97m7Qc2ONHUUVylc1LQfh091mR4+h3wbkmP5VACt255Ij+5G1ZkN4E+ABqisTJgF9ot4Fu23W5HLOGh3q4eHfU0fHTPcBkw/nTFi6weGPSOimfZC+nvARoje6jMHeCUPa1Wq3V9Pjb3+9ymbWXAR3GFMC8AT3+2/Eu4h2aZ5IlWd9C/wo2bFUfHueib05N5g5Vc0MdbEryJlxc1zr+QYY8BdXb7g/5Hzvsk+Vr2+zsHdnQ/SN87J+IiyB8BBgCs0SrK2KSiSQAAAABJRU5ErkJggg==',
            checked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdBQjgyOTc3RTNDQTExRTc4OURGOTdENjREQzZEMERBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdBQjgyOTc4RTNDQTExRTc4OURGOTdENjREQzZEMERBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0FCODI5NzVFM0NBMTFFNzg5REY5N0Q2NERDNkQwREEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0FCODI5NzZFM0NBMTFFNzg5REY5N0Q2NERDNkQwREEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz43pmgSAAABv0lEQVR42qyVuy9DURzHby+J7oYyiM0m0SAijdpaj4XBQBMLk0VKQuKREEIk0mK36YjJqwyIx6Yi8Q8YPAbm20TK9yffJnWcU7fp/SafpO0553Nvz+N3fKOr3ZYhlSAMoqAJ1IIqkAUv4B6kwQX4NAl0kSdOg05DeyOIgClwCdbAodrJVr7LmyXAQRGxmjD7JzheK/eDbRAHPqv0xDner5OvgJhVXmL0/JLLHI9b3kQ8XXm5zNOcZv5LyS3Y4U4Sz7x4ZbeEQHsZYtmOg+AD1IMO+kI297HPA3EraODv4ouKPOiBuBnsgkBBe1DkNR6I90Gd0idgqxufeQCL4EnTdgKGKG4xiH/Ojc0VVjMLFkCf8oA0xe984z2DWOKI/FXTMAAqQAb0g2dw7mIqCvNmU6BmGGzx8x2LVCliScbmHH5pGsfAOj8/8h+6FYvvWOTXPGG6TIIlluY2l2LJjZBf0GWQM3SU0nDFsupGnKMvm68nR2CzyAB562qXZ2BDpkQtuTMgVWZFTHEb/6nnDhgBScMC/7eASY53TNeczP8E6OHF6yZyh/ZyXNbNBS1zdsb7McLipt7+cj5Oi93+3wIMANzHZ++TJ5gNAAAAAElFTkSuQmCC'
        },
        cartList: [
            {
                name: '抹茶千层',
                id: 34,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 188.50,
                amount: 3,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            },
            {
                name: '抹茶千层',
                id: 36,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 288.00,
                amount: 1,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            },
            {
                name: '抹茶千层',
                id: 36,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 288.00,
                amount: 1,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            },
            {
                name: '抹茶千层',
                id: 36,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 288.00,
                amount: 1,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            },
            {
                name: '抹茶千层',
                id: 36,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 288.00,
                amount: 1,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            },
            {
                name: '抹茶千层',
                id: 36,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 288.00,
                amount: 1,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            },
            {
                name: '抹茶千层',
                id: 36,
                imgUrl: '/image/assets/cart_imgBg.png',
                price: 288.00,
                amount: 1,
                norm: ['6寸', '收货时间: 10:00-11:30'],
                check: 0,
                txtStyle: ''
            }
        ],
        total: 0,
        checkAll: false,
        slip: {
            delBtnWidth: 100,
            startX: 0
        }
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initEleWidth()
    },
    getTotal() {
        let total = 0,
            flag = true;
        this.data.cartList.forEach((item) => {
            if (item.check) {
                total += (Number(item.price) * 100 * Number(item.amount)) / 100
            } else {
                flag = false
            }
        })
        this.setData({
            total: total
        })
        return flag
    },
    selectAll() {
        this.setData({
            checkAll: !this.data.checkAll
        })
        this.data.cartList.forEach((item) => {
            item.check = this.data.checkAll
        })
        this.setData({
            cartList: this.data.cartList
        })
        this.getTotal()
    },
    select(event) {
        const index = event.currentTarget.dataset.index
        this.data.cartList[index].check = !this.data.cartList[index].check
        this.setData({
            cartList: this.data.cartList
        })
        this.setData({
            checkAll: this.getTotal()
        })
    },
    touchS: function (e) {

        if (e.touches.length == 1) {
            this.setData({

                //设置触摸起始点水平方向位置

                'slip.startX': e.touches[0].clientX

            })
        }
        console.log(this.data.slip.startX)

    },
    touchM: function (e) {
        if (e.touches.length == 1) {

            //手指移动时水平方向位置

            var moveX = e.touches[0].clientX;

            //手指起始点位置与移动期间的差值

            var disX = this.data.slip.startX - moveX;

            var delBtnWidth = this.data.slip.delBtnWidth;

            var txtStyle = "";

            if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变

                txtStyle = "left:0px";

            } else if(disX > 0){//移动距离大于0，文本层left值等于手指移动距离

                txtStyle = "left:-" + disX + "px";

                if (disX >= delBtnWidth) {

                    //控制手指移动距离最大值为删除按钮的宽度

                    txtStyle = "left:-" + delBtnWidth + "px";

                }

            }

            //获取手指触摸的是哪一项

            var index = e.currentTarget.dataset.index;
            console.log(index)

            // var list = this.data.cartList;

            this.data.cartList[index].txtStyle = txtStyle;

            //更新列表的状态

            this.setData({
                cartList: this.data.cartList
            })
        }
    },
    touchE: function (e) {

        if (e.changedTouches.length == 1) {

            //手指移动结束后水平位置

            var endX = e.changedTouches[0].clientX;

            //触摸开始与结束，手指移动的距离

            var disX = this.data.slip.startX - endX;

            var delBtnWidth = this.data.slip.delBtnWidth;

            //如果距离小于删除按钮的1/2，不显示删除按钮

            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";

            //获取手指触摸的是哪一项

            var index = e.currentTarget.dataset.index;

            // var list = this.data.cartList;

            // list[index].txtStyle = txtStyle;

            this.data.cartList[index].txtStyle = txtStyle;

            //更新列表的状态

            this.setData({

                cartList: this.data.cartList

            });
        }
    },
    //获取元素自适应后的实际宽度
    getEleWidth: function (w) {

        var real = 0;

        try {

            var res = wx.getSystemInfoSync().windowWidth;

            var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应

            // console.log(scale);

            real = Math.floor(res / scale);

            return real;

        } catch (e) {

            return false;
            // Do something when catch error
        }

    },
    initEleWidth: function () {
        var delBtnWidth = this.getEleWidth(this.data.slip.delBtnWidth)
        this.setData({
            'slip.delBtnWidth': delBtnWidth
        })

    },
    //点击删除按钮事件
    delItem: function (e) {

        //获取列表中要删除项的下标

        var index = e.currentTarget.dataset.index;

        var list = this.data.list;

        //移除列表中下标为index的项

        this.data.cartList.splice(index, 1);

        //更新列表的状态

        this.setData({

            cartList: this.data.cartList

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
            title: '购物车'
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