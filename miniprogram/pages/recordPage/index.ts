// pages/recordPage/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIncome: '', // 收入吗？
    model:{
      _createTime: '',
      moneyNumber: '', // 金额
      date: '', // 日期
      way: '', // 渠道
      how: '', // 收入来源，支出用途
      note: '', // 备注
    },
    openId: '' // 用户身份标识
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options, app.globalData, 'options');
    this.setData({
      isIncome: Boolean(Number(options.id))
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})