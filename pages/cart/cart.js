// pages/cart/cart.js
let app = getApp() 
 
Page({ 
    /**
     * 页面的初始数据
     */
    data: {
        checkImg: {
            check: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVCMzlEQjE4MDREMjExRThCNDZBOUVCNUI5Rjc0OURDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVCMzlEQjE5MDREMjExRThCNDZBOUVCNUI5Rjc0OURDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUIzOURCMTYwNEQyMTFFOEI0NkE5RUI1QjlGNzQ5REMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUIzOURCMTcwNEQyMTFFOEI0NkE5RUI1QjlGNzQ5REMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Cvj4YAAAF+klEQVR42sya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',
            checked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2OTc0NDFFMDREMjExRTg5RjdCQzZDNDU5N0EyNzNDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ2OTc0NDFGMDREMjExRTg5RjdCQzZDNDU5N0EyNzNDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDY5NzQ0MUMwNEQyMTFFODlGN0JDNkM0NTk3QTI3M0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDY5NzQ0MUQwNEQyMTFFODlGN0JDNkM0NTk3QTI3M0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5gsgrNAAAENElEQVR42syaXUgUURTHx2HD1tLS3kRBBCtIesiHigwijHKDgh4iTNPFLcLqwRfRPpAkK18i/Cowg4QMIuzjwQI1KIVKsIeSwoyyEntKzY/MIux/4ExMwx3nzszuzh74I6537vz27JlzzzlrXOhCvuLC4qBUaC2UDWVB6VAytJTX/IQmoC/QMPQaGoLGoIWWyk5nN3YIvhLaDu2CNkOZUILktbPQR6gfegj1AH4i0uDLoANQKbQBilfc2Tz0EroO3cIbmJW9ULVxkzyIPtdr7GW30ArvQXu10N6HLwZ2htPjK6AK6DiUpETWZqAGqA7e/+7G4/Sg3YBORgGabDlUBbXB++lOwTOgm9BeJfq2h+4N+Ay74PRu26GtindG924387wInEKikR8ar40YGgCfJANexR9VrBiFaqUV+A6oTIk9Owav55mBJ0LVUcoedo2YqgGfKALfD23xGPAPNG7yt1xm/A+cao+Qx9CfoaNQPn/y04I1IXidWBUfv0AFU46H0CNQCU7LJ/x7PwBX4+dBw7ocZu1QuTQNQEs8gv4EFeugNfsgWEuM+XhTcT6upzd5CF0E6F79iwBLZs+KjFhTVW4CMj0KDxE01fWXFkkUxLrGx52L34vwgETQzfw3M6M12Sq3W9GGPgQ9NUBTjm6ygNYsi8DToghNLVuhAJrK2cuUWST3SaNQSYlyePQZoClM66Ggjb1SVF03Lmtv+LBwEh69hte18Aja3M9vp+ecg87wyUZqk7yO8nGRMTy422lwAK1oJ+ec5Nq7UC3NQrTjl2cmRyxSXlDgaT9DFzsMuzmVhzWynlvQ/f4bKueu3/RwMfF0s40HUWTjBD4quTggyEA/TOBHOKb7BHOZepfQZKME/k5yMQ2Argqy0AyPLlp1VV6xwNN+bgmDYchQwxTjg+w5mRHabh7e0M2nDBOpcq6le0zCo9FFTBs/5UECH+KDYZ3khfv44jJDzTzNgyPRrKQ+TNDaszZEoUJT0+c2Ly7kQsiqFE5wk/JMjFjHVM4UnZwl7FiIj2mzGSI9iFfC8CDq7RexoqJc0A6gx9CAg40oXM7qOin9idjImSWcNsCs/3rOyUXysZVVcI+ohc0qDo8SJfzWqg1D9Z66zTfLtbkZtX6nuR98yw3AxghA9zKjYgSnrFAD3XE4W9FqmEgYebkG3p42m2R1cWzGmjUButtskqVZHXQ/hqDvMZNiBT7FR/izGIAmhhPw9pQMuMKFV4GgHI2m0b0LAC0sAlWLWrrAo7B5wNAjZgusOqBRrjHOGYqqSBlljfN0cJl5WpQOF0tF1LLRiOwUtC1C0LR/LYC7ZBbb6Tm7uawt5YdmPgyw87wX1T0BWWhZjxtrYfoWuENx/5X4C+iR4vArcZ9DT00yPDXQNDSlkfB6noqlcZcUr/PqN35e3kOvuAf4qrj4J4S/AgwA/jYZmE8Y+gMAAAAASUVORK5CYII='
        },
        cartList: [
            // {
            //     name: '抹茶千层',
            //     id: 34,
            //     imgUrl: '/image/assets/cart_imgBg.png',
            //     price: 188.50,
            //     amount: 3,
            //     norm: ['6寸'],
            //     check: 0,
            //     txtStyle: ''      //右滑删除 内联样式控制动画
            // }
        ],
        total: 0,
        checkAll: false,
        checkArr: '',
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
    initData(callback) {
        console.log(app.globalData.token)
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                token: app.globalData.token,
                doshowcarinfo: 1
            },
            success: (res) => {
                console.log(res)
                if (res.data.msg == 7) {
                    let cartList = []
                    res.data.list.forEach( (ele) => {
                        let cartListItem = {
                            name: unescape(ele.listtit),
                            id: ele.wcid,
                            imgUrl: ele.listimg,
                            price: ele.listpre,
                            amount: ele.counter,
                            norm: [ele.onevalue],
                            check: 0,
                            txtStyle: ''
                        }
                        cartList.push(cartListItem)
                    })
                    this.setData({
                        cartList: cartList,
                        checkAll: false
                    })
                    typeof(callback) === 'function' && callback()
                }
            }
        })
    },
    //计算总价 返还全选状态
    getTotal() {
        let total = 0,
            flag = true;
        this.data.checkArr.clear()
        //购物车为空 直接全选赋false
        if (this.data.cartList.length == 0) flag = false

        this.data.cartList.forEach((item) => {
            if (item.check) {
                //计算总价
                total += (Number(item.price) * 100 * Number(item.amount)) / 100
                //记录选择购物车id
                this.data.checkArr.add(item.id)
            } else {
                flag = false
            }
        })
        this.setData({
            total: total
        })
        return flag
    },
    //全选
    selectAll() {
        //购物车为空 直接全选赋false
        if (this.data.cartList.length == 0) {
            this.setData({
                checkAll: false
            })
            return
        }

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
    //单选
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

        const index = e.currentTarget.dataset.index;
        const _wcid = e.currentTarget.dataset.wcid;
        let list = this.data.list;
        //移除列表中下标为index的项 
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                token: app.globalData.token,
                dodelcar: 1,
                wcid: _wcid,
            },
            success: (res) => { 
                console.log(res)
                if (res.data.msg == 8) {

                    this.data.cartList.splice(index, 1);

                    //计算价格 全选状态 
                    this.setData({
                        checkAll: this.getTotal()
                    })

                    //更新列表的状态
                    this.setData({
                        cartList: this.data.cartList
                    })
                }
            }
        })
    },
    please() {
        let wcIdArr = []
        this.data.cartList.forEach( (ele) => {
            if (ele.check != 0) {
                wcIdArr.push(ele.id)
            }
        })

        if (wcIdArr.length == 0) return

        wx.navigateTo({
            url: '../order_confirm/order_confirm?wcid=' + wcIdArr.join()
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
        this.initData(
            this.restoreStatus
        )
    },
    restoreStatus() {
        let _this = this
        try {
            let value = wx.getStorageSync('cartCheckStatus') || []
            let _set = new Set(value)
            this.data.checkArr = _set
            console.log(this.data.checkArr)
            this.setData({
                checkAll: _getTotal()
            })
        } catch (e) {
            // Do something when catch error
        }
        function _getTotal() {
            let total = 0;
            let flag = true;
            //购物车为空 直接全选赋false
            if (_this.data.cartList.length == 0) flag = false
            _this.data.cartList.forEach((item) => {
                if (_this.data.checkArr.has(item.id) ) {
                    item.check = 1
                    total += (Number(item.price) * 100 * Number(item.amount)) / 100
                } else {
                    flag = false
                }
            })
            _this.setData({
                cartList: _this.data.cartList,
                total: total
            })
            return flag
        }   
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log(this.data.checkArr)
        try {
            wx.setStorageSync('cartCheckStatus', [...this.data.checkArr] )
        } catch (e) {
            console.log(e)
        }
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