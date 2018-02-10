// pages/appendAddress/appendAddress.js
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressId: '',
        htmlData: {
            name: '',
            phone: '',
            detaile: ''
        },
        picker: {
            array: ['选择区', '上城区', '下城区', '江干区', '拱墅区', '西湖区', '滨江区', '萧山区', '余杭区', '桐庐县', '淳安县', '建德市', '富阳市', '临安市'],
            index: 0
        },
        requestData: {
            name: '',
            phone: '',
            area: '',
            detaile: ''
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.addressId = options.addressId || ''
        this.data.addressId ? this.initData() : ''
    },
    initData() {
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                token: app.globalData.token,
                doaddress: 1,
                addressid: this.data.addressId
            },
            success: (res) => {
                console.log(res)
                if( res.data.msg==10 ) {
                    
                    this.setData({
                        'picker.index': this.data.picker.array.indexOf(res.data.list[0].area),
                        'htmlData.name': res.data.list[0].name,
                        'htmlData.phone': res.data.list[0].phone,
                        'htmlData.detaile': res.data.list[0].detaile,
                        'requestData.name': res.data.list[0].name,
                        'requestData.phone': res.data.list[0].phone,
                        'requestData.area': res.data.list[0].area,
                        'requestData.detaile': res.data.list[0].detaile
                    })
                }
            }
        })
    },
    bindKeyInput(e) {
        let type = e.currentTarget.dataset.type;
        if (type == 'name') {
            this.setData({
                'requestData.name': e.detail.value
            })
        } else if (type == 'phone') {
            this.setData({
                'requestData.phone': e.detail.value
            })
        } else if (type == 'detaile') {
            this.setData({
                'requestData.detaile': e.detail.value
            })
        }
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            'picker.index': e.detail.value,
            'requestData.area': this.data.picker.array[e.detail.value]
        })
    },
    submit() {
        if (!this.data.requestData.name) {
            wx.showToast({
                title: '请填写收货人',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!this.data.requestData.phone || this.data.requestData.phone.length != 11) {
            wx.showToast({
                title: '请填写手机号',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!this.data.requestData.area) {
            wx.showToast({
                title: '请选择地区',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!this.data.requestData.detaile) {
            wx.showToast({
                title: '请填写详细地址',
                icon: 'none',
                duration: 2000
            })
            return
        }
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: Object.assign(
                {
                    token: app.globalData.token,
                    doupdateinsertaddress: 1,
                    addressid: this.data.addressId
                },
                this.data.requestData
            ),
            success: (res) => {
                console.log(res)
                if (res.data.msg == 11) {
                    wx.showToast({
                        title: '创建成功',
                        icon: 'none',
                        duration: 500
                    })
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 500)
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
            title: '添加地址'
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