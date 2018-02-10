// pages/addressManage/addressManage.js
let app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isChoose: false,
        chooseId: '',        //选中id
        slip: {
            delBtnWidth: 100,
            startX: 0
        },
        addressList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        if (options.from == 'orderCon') {
            this.setData({
                isChoose: true
            })
        }
    },
    initData() {
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                token: app.globalData.token,
                doaddress: 1
            },
            success: (res) => {
                console.log(res)
                if (res.data.msg == 10) {
                    let listArr =[]
                    res.data.list.forEach( (ele) => {
                        let listItem = {
                            id: ele.addressid,
                            isChecked: ele.isdefault,
                            name: ele.name,
                            phone: ele.phone,
                            area: ele.area,
                            detaile: ele.detaile,
                            txtStyle: ''
                        }
                        listArr.push(listItem)
                    })
                    this.setData({
                        addressList: listArr
                    })
                }
                setTimeout(function () {
                    wx.hideLoading()
                }, 500)
            }
        })
    },
    reviseAddress(e) {
        const _addressId = e.currentTarget.dataset.addressid
        console.log(_addressId)
        wx.navigateTo({
            url: '../appendAddress/appendAddress?addressId=' + _addressId
        })
    },
    toLink(e) {
        const page = e.currentTarget.dataset.page
        wx.navigateTo({
            url: '../' + page + '/' + page
        })
    },
    chooseAddress(e) {
        const _addressid = e.currentTarget.dataset.addressid
        if (_addressid == this.data.chooseId) {
            if (this.data.isChoose) {
                wx.navigateBack()
                return
            } else {
                return
            }
        }
        wx.showLoading({
            title: '加载中',
        })
        this.setDefault(_addressid, () => {
            if (this.data.isChoose) {
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];  //上一个页面
                console.log(prevPage)
                prevPage.data.requestData.addressid = _addressid
                wx.hideLoading()
                wx.navigateBack()
                return
            }
        })
        

    },
    setDefault(_addressid,callback) {
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                token: app.globalData.token,
                doupdefaultaddress: 1,
                addressid: _addressid
            },
            success: (res) => {
                if ( res.data.msg==16 ) {
                    this.data.addressList.forEach( (ele) => {
                        if ( ele.id == _addressid ) {
                            ele.isChecked = 1
                            this.setData({
                                chooseId: _addressid
                            })
                        } else {
                            ele.isChecked = 0
                        }
                    })
                    this.setData({
                        addressList: this.data.addressList
                    })
                    typeof (callback) === 'function' && callback()
                    wx.hideLoading()
                    wx.showToast({
                        title: '已成功设置默认地址',
                        icon: 'success',
                        duration: 2000
                    })
                }
            }
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

            } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离

                txtStyle = "left:-" + disX + "px";

                if (disX >= delBtnWidth) {

                    //控制手指移动距离最大值为删除按钮的宽度

                    txtStyle = "left:-" + delBtnWidth + "px";

                }

            }

            //获取手指触摸的是哪一项

            var index = e.currentTarget.dataset.index;
            console.log(index)

            // var list = this.data.addressList;

            this.data.addressList[index].txtStyle = txtStyle;

            //更新列表的状态

            this.setData({
                addressList: this.data.addressList
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

            // var list = this.data.addressList;

            // list[index].txtStyle = txtStyle;

            this.data.addressList[index].txtStyle = txtStyle;

            //更新列表的状态

            this.setData({

                addressList: this.data.addressList

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
        const _addressid = e.currentTarget.dataset.addressid;
        let list = this.data.list;
        //移除列表中下标为index的项 
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                token: app.globalData.token,
                deladdress: 1,
                addressid: _addressid
            },
            success: (res) => {
                if (res.data.msg == 12) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000
                    })
                    this.data.addressList.splice(index, 1);

                    //更新列表的状态
                    this.setData({

                        addressList: this.data.addressList

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
            title: '地址管理'
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