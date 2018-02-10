// pages/home/home.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        titImg: [
            'data:image / png;base64, iVBORw0KGgoAAAANSUhEUgAAABcAAAAVCAYAAACt4nWrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+ IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxOEM1OTZDMDI2MTExRThBMDA4QjRBNjVBRDNFQjgwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxOEM1OTZEMDI2MTExRThBMDA4QjRBNjVBRDNFQjgwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzE4QzU5NkEwMjYxMTFFOEEwMDhCNEE2NUFEM0VCODAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzE4QzU5NkIwMjYxMTFFOEEwMDhCNEE2NUFEM0VCODAiLz4gPC9yZGY6RGVzY3JpcHRpb24 + IDwvcmRmOlJERj4gPC94OnhtcG1ldGE + IDw / eHBhY2tldCBlbmQ9InIiPz7A1LvKAAABLklEQVR42rSTP0 / CUBTFb1 / 8VC46OMhX0dlSFUgwJk06MJh06MbgAAuMrjLAwt6BgQUS1MShiYZBTTmXXIliX/8+T3J7+u579/dO0tQ6PaMxER2SeU0UHjb9j2z14MecfGAYPGSuksUl6ssQmDkOv2zhuGUGCwzBA+ GR + tFso94qgnn + 5nuxg+O2F5hXEe6B8 / wHLuqgViXBTzJPiXDc + g5rlYQ3ZZ50yVldVFgQHMocpcJx + yesXhDuyNwvWXEcJ56unVuPsKMc4BHAx0kbKmXoImdq7TktHGmmsF4GuC / nqGhy1jXqQ7PH / au04VQ4Us1hvmbbl30qm5x1i4r2epH0qRIc6V5h7l7blT5VTc66Qy3lfSFrMgJHyrV8XFZD1pk6KPAX3qNOxHNpI8AAepdlzrfacMMAAAAASUVORK5CYII=',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3QTE3MTkyMDI2MTExRTg4NzVGRTFBMjAwMUU3OTk3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ3QTE3MTkzMDI2MTExRTg4NzVGRTFBMjAwMUU3OTk3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDdBMTcxOTAwMjYxMTFFODg3NUZFMUEyMDAxRTc5OTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDdBMTcxOTEwMjYxMTFFODg3NUZFMUEyMDAxRTc5OTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5V4lzhAAAAHklEQVR42mL0yGIgGzAxMIxqHtU8qnlU80BqBggwALNtANqNPn4LAAAAAElFTkSuQmCC',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFFN0NGQzRFMDI2NTExRThCNzRFQUJEQjhCMDlEODAzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFFN0NGQzRGMDI2NTExRThCNzRFQUJEQjhCMDlEODAzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUU3Q0ZDNEMwMjY1MTFFOEI3NEVBQkRCOEIwOUQ4MDMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUU3Q0ZDNEQwMjY1MTFFOEI3NEVBQkRCOEIwOUQ4MDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz51w9nDAAABDUlEQVR42qyVTQ7BQBiG2xJn8Le0sMfCEVhVlMSeA7AgLkCxYMEp6jeuQSTWlqRnYFPvJ98klUxS2nmTJ5lMZp6ZTGe+6u1xRZMkAUymDNLgBe7gAnbgwH1fiUtkNTAFOckieaYFbmAAtv5Bhq8dAxMekNOCQ2M2PCcm2+EI9LX/I+YM/Du0Qsr8UksI6WzmWvQsyEXCBsgqEGZA0+CroSomCUsKhUUSJhUKU4bstkcJCV2FPpeEV4XCEwn3CoV7EjpcRaLmQS7xUXoKhF3wFG+ZdjmLIJux46t8DcEyhGzFcz/RPc/7NDp2VfTVgf1DTbyxaB1UsaloHrloUPUu8MMXB3/mX4AjexRvAQYAEiEyX0f6NxQAAAAASUVORK5CYII='
        ],
        topCol: {
            banner: [],
            list: [
                // {
                //     name: '蛋糕定制',
                //     id: 1,
                //     imgUrl: '/image/assets/topNav_01.jpg'
                // },
                // {
                //     name: '伴收礼',
                //     id: 2,
                //     imgUrl: '/image/assets/topNav_02.jpg'
                // },
                // {
                //     name: '周边',
                //     id: 3,
                //     imgUrl: '/image/assets/topNav_03.jpg'
                // }
            ]
        },
        subCol: [
            // {
            //     type: 1,
            //     title: '蛋糕定制',
            //     nickname: 'Cake',
            //     titImg: '/image/assets/subCol_tit_01.png',
            //     bannerImg: '/image/assets/sub_col_01.jpg',
            //     list: [
            //         {
            //             id: 11,
            //             name: '抹茶千层',
            //             nickname: 'Matcha',
            //             imgUrl: '/image/assets/col_item_01.jpg'
            //         },
            //         {
            //             id: 12,
            //             name: '抹茶千层',
            //             nickname: 'Matcha',
            //             imgUrl: '/image/assets/col_item_02.jpg'
            //         },
            //         {
            //             id: 13,
            //             name: '抹茶千层',
            //             nickname: 'Matcha',
            //             imgUrl: '/image/assets/col_item_03.jpg'
            //         },
            //         {
            //             id: 14,
            //             name: '抹茶千层',
            //             nickname: 'Matcha',
            //             imgUrl: '/image/assets/col_item_04.jpg'
            //         }
            //     ]
            // },
            // {
            //     type: 2,
            //     title: '伴手礼定制',
            //     nickname: 'Gift',
            //     titImg: '/image/assets/subCol_tit_02.png',
            //     bannerImg: '/image/assets/sub_col_02.jpg',
            //     list: [
            //         {
            //             id: 21,
            //             name: '抹茶千层',
            //             nickname: 'Matcha',
            //             imgUrl: '/image/assets/col_item_05.jpg'
            //         },
            //         {
            //             id: 22,
            //             name: '抹茶千层',
            //             nickname: 'Matcha',
            //             imgUrl: '/image/assets/col_item_06.jpg'
            //         }
            //     ]
            // },
            // {
            //     type: 3,
            //     title: '周边',
            //     nickname: 'Gift',
            //     titImg: '/image/assets/subCol_tit_03.png',
            //     bannerImg: '/image/assets/sub_col_03.jpg',
            //     list: [
            //         {
            //             id: 31,
            //             name: '手机壳',
            //             nickname: 'Gift For You',
            //             imgUrl: '/image/assets/col_item_07.jpg'
            //         },
            //         {
            //             id: 32,
            //             name: '钥匙扣',
            //             nickname: 'Gift For You',
            //             imgUrl: '/image/assets/col_item_08.jpg'
            //         },
            //         {
            //             id: 33,
            //             name: '手机壳',
            //             nickname: 'Gift For You',
            //             imgUrl: '/image/assets/col_item_09.jpg'
            //         }
            //     ]
            // }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.initData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    initData() {
        let _this = this
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetbanner: '1',
            },
            success: function (res) {
                // console.log(res)
                _this.setData({
                    'topCol.banner': res.data.list
                });
            }
        })
        wx.request({
            url: app.globalData.subDomain + '/API/ProgramApi.aspx',
            data: {
                dogetpromoteprotype: '1',
            },
            success: function (res) {
                console.log(res)
                res.data.list.forEach((ele) => {
                    let objList = {
                        name: ele.ptname,
                        type: ele.ptid,
                        imgUrl: ele.ptimg
                    }
                    function a() {
                        let proList = []
                        ele.prolist.forEach((proEle) => {
                            let obj = {
                                id: proEle.wpid,
                                name: proEle.wpname,
                                nickname: proEle.wpvicename,
                                imgUrl: proEle.wponepic
                            }
                            proList.push(obj)
                        })
                        return proList
                    }
                    let objSubList = {
                        type: ele.ptid,
                        title: ele.ptname,
                        bannerImg: ele.ptoneimg,
                        list: a()
                    }
                    _this.data.topCol.list.push(objList)
                    _this.data.subCol.push(objSubList)
                })
                _this.setData({
                    'topCol.list': _this.data.topCol.list,
                    'subCol': _this.data.subCol
                })
                console.log(_this.data)
            }
        })
    },
    toPage(e) {
        const parms = e.currentTarget.dataset.type;
        let _url;
        switch (parms) {
            case '1':
                _url = '../cake/cake';
                break;
            case '2':
                _url = '../gift/gift';
                break;
            case '3':
                _url = '../circum/circum';
                break;
            default:
                return
        }
        wx.navigateTo({
            url: _url
        })
    },
    toGoodsDetail(e) {
        const parms = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../goods_detail/goods_detail?wpid=' + parms
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setNavigationBarTitle({
            title: '初壹茶心意'
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