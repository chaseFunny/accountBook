// pages/recordPage/index.js
let app = getApp();
const db = wx.cloud.database()
const inOutModel = db.collection('inOutModel')
import Toast from '@vant/weapp/toast/toast';
const {getCludeFunc : gcf} = require('../../utils/index.js')
const {defaultIncomeWay, defaultIncomePath, defaultPayTo} = require('../../utils/format.js')
import dayjs from 'dayjs'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIncome: '', // 收入吗？
    model:{
      _createTime: '',
      moneyNumber: '', // 金额
      date: new Date().getTime(), // 日期
      way: '', // 渠道
      how: '', // 收入来源，支出用途
      note: '', // 备注
    },
    currentDate: new Date().getTime(),
    openId: '', // 用户身份标识
    show: false, // 是否展示日期选择器
    isShow: false, // 渠道，用途，弹出层
    currIndex: '',
    minDate: dayjs().subtract(1, 'year').valueOf(),
    maxDate: dayjs().valueOf(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
    // 收支选项列表
    defaultIncomeWay,
    defaultIncomePath,
    defaultPayTo,
    currList: '',
    currKey: {
      curr: '',
      way: '',
      how: '',
    }, // 当前key
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(app.globalData,dayjs(new Date()), 'options');
    this.setData({
      isIncome: Boolean(Number(options.id)),
      currentDate: this.formatDate(new Date().getTime())
    })
  },
  // methods
  currArr(idx){
    let arr;
    if(idx == '2'){
      arr = this.data.isIncome ? this.data.defaultIncomePath : this.data.defaultPayTo
    }else{
      arr = this.data.defaultIncomeWay
    }
    return arr;
  },
  chooseKey(e){
    if(this.data.currIndex === 1){
      this.setData({
        [`currKey.curr`]: e.currentTarget.id,
        [`currKey.way`]: e.currentTarget.id,
        [`model.way`]: e.currentTarget.dataset.name,
      })
    }else{
      this.setData({
        [`currKey.curr`]: e.currentTarget.id,
        [`currKey.how`]: e.currentTarget.id,
        [`model.how`]: e.currentTarget.dataset.name,
      })
    }
    
    this.closePopup()
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(timestamp){
    // const date = new Date(timestamp);
    const date = new Date(timestamp);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  },
  onInput(event) {
    const date = this.formatDate(event.detail)
    this.setData({
      [`model.date`]: new Date(event.detail).getTime(),
      currentDate: date
    });
  },
  chooseTime(e){
    console.log(e,'eee');
    if(e.type === 'confirm'){
     this.onInput(e)
    }
    this.onClose()
  },
  /** 选择 */
  onChoose(e){
    const currList =  this.currArr(e.target.id)
    const currVal = Number(e.target.id) === 1 ? this.data.currKey.way : this.data.currKey.how
    this.setData({
      currList,
      isShow: true,
      currIndex: Number(e.target.id),
      [`currKey.curr`]: currVal,
    })
  },
  closePopup(){
    this.setData({
      isShow: false
    })
  },
  modelChange(e){
    this.setData({
      [`model.${e.currentTarget.id}`]: e.detail
    })
  },
  /** 保存 */
  onSave() {
    // 校验
    const { moneyNumber, date, way, how, note } = this.data.model
    const isCan = Boolean(moneyNumber && date && way && how)
    if(isCan) {
      // 存储数据
      const params = {
        _createTime: Date.parse(new Date()),
        userID: app.globalData.openID,
        isIncome: this.data.isIncome,
        money: moneyNumber,
        recordTime: dayjs(date).valueOf(),
        way: way,
        where: how,
        note
      }
      inOutModel.add({ data: params }).then((res)=>{
        console.log(res, params,'resssss');
        if(res.errMsg == "collection.add:ok"){
          Toast.success('保存成功');
          setTimeout(()=>{
            wx.switchTab({
              url: '../list/index',
            })
          },500)
        }else{
            Toast.fail('网络异常，请重试');
          }
      })
      // 跳转
    }else{
      // 提示
      if(!Boolean(moneyNumber)){
        Toast({
          message: '请输入金额',
          position: 'top'
        });
        return
      }
      if(!Boolean(date)){
        Toast({
          message: '请选择日期',
          position: 'top'
        });
        return
      }
      if(!Boolean(way)){
        Toast({
          message: '请选择渠道',
          position: 'top'
        });
        return
      }
      if(!Boolean(how)){
        Toast({
          message: `请选择${this.data.isIncome ? '来源' : '用途'}`,
          position: 'top'
        });
        return
      }
    }
    
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