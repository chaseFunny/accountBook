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
    openId: '', // 用户身份标识
    show: false, // 是否展示日期选择器
    isShow: false, // 渠道，用途，弹出层
    currIndex: '',
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    // 收支选项列表
    defaultIncomeWay:[{
      name: '支付宝',
      key: 'zfb',
      iconName: 'iconfont '
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options, app.globalData, 'options');
    this.setData({
      isIncome: Boolean(Number(options.id)),
      model: {
        date: this.formatDate(new Date().getTime())
      }
    })
  },
  // methods
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(timestamp){
    const date = new Date(timestamp);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  },
  onInput(event) {
    const date = this.formatDate(event.detail)
    this.setData({
      model: {
        date
      }  
    });
  },
  chooseTime(e){
    console.log(e);
    if(e.type === 'confirm'){
     this.onInput(e)
    }
    this.onClose()
  },
  /** 选择 */
  onChoose(e){
    console.log(e,'eee');
    if(e.target.id === '1') {

    }
    this.setData({
      isShow: true,
      currIndex: Number(e.target.id)
    })
  },
  closePopup(){
    this.setData({
      isShow: false
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