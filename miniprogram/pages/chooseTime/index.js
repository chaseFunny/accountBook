import moment from "moment";
var app = getApp();
import dayjs from 'dayjs'
// import "moment/locale/zh-cn";
// pages/chooseTime/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayMin: dayjs().subtract(1, 'year').valueOf(),
    calendarType: ['single','multiple', 'range'],
    currType: app.globalData.chooseTimeGlobal.type, // 父组件接受到的当前选择类型
    currentDate: new Date().getTime(),
    minDate: app.globalData.createTime,
    maxDate: new Date().getTime(),
    columns: [
      {
        values: [],
        className: "column1"
        // defaultIndex: '1'
      },
      {
        values: [],
        // defaultIndex: '22'
        className: "column2"
      }
    ], // 周选择器
    defaultsTime:  dayjs(app.globalData.chooseTimeGlobal.value).valueOf(), // 接受父组件的时间
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options,app.globalData, 'options')
    const arr = options.id.split('#')
    console.log(arr, moment(JSON.parse(arr[1]).value).valueOf(), 'hh');
    const {chooseTimeGlobal} = app.globalData
    if(chooseTimeGlobal.type == 0) {
      console.log('jinlailema ');
      this.setData({
        currType: chooseTimeGlobal.type,
        defaultsTime: dayjs(chooseTimeGlobal.value).valueOf(),
        // dayMin: chooseTimeGlobal.createTime
      })
      return
    }
    this.setData({
      currType: arr[0],
      defaultsTime: JSON.parse(arr[1]).value
    })
    if(arr[0] == '1'){
      this.setDate(JSON.parse(arr[1]).value);
    }
    if(arr[0] == '2'){
      this.setData({
        currentDate: moment(JSON.parse(arr[1]).value).valueOf()
      })
    }
  },

  // 日选择器
  datePicker(e){
    console.log(e, 'eeee');
    wx.switchTab({
      url: `../statistical/index`,
    })
    app.globalData.chooseTimeGlobal = Object.assign({type:0, value: e.detail})
  },
  // 月选择器
  onInput(event) {
    console.log(event, 'event');
    app.globalData.chooseTimeGlobal = Object.assign({type:2, value: event.detail})
    wx.switchTab({
      url: `../statistical/index`,
    })
    // this.setData({
    //   currentDate: event.detail,
    // });
  },
  mounthCancel(e){
    wx.switchTab({
      url: `../statistical/index`,
    })
  },
  // 周选择 获取一年的周次列表 y: 当前
weelys (y)  {
  // 获取年份的第一天
  const oneDay = moment(y + "-01-01");
  // 一周
  let oneWeely = null;
  if (oneDay.format("wo") == "1周") {
    oneWeely = oneDay.startOf("week").format("YYYY-MM-DD");
  } else {
    oneDay.add(1, "weeks");
    oneWeely = oneDay.startOf("week").format("YYYY-MM-DD");
  }
  const arr = [];
  let weelyStr = "1周";
  do {
    const d = {};
    let time = moment(oneWeely);
    d.value = time.format("YYYY-MM-DD");
    d.text =
      time.format("第wo") +
      "(" +
      time.startOf("week").format("MM/DD") +
      "-" +
      time.endOf("week").format("MM/DD") +
      ")";
    arr.push(d);
    oneDay.add(1, "weeks");
    oneWeely = oneDay.startOf("week").format("YYYY-MM-DD");
    weelyStr = oneDay.format("wo");
  } while (weelyStr != "1周" && oneWeely.indexOf(y) > -1);
  arr.forEach((e,i)=>{
    arr[i].text = arr[i].text.replaceAll(/[a-zA-Z]/g, '周')
    arr[i].text = arr[i].text.replace('周', '')
  })
  return arr;
},
setDate(date) {
  const defaultData = moment(date);
  const {columns} = this.data
  const temporaryArr = [].concat(columns)
  // 获取默认年份
  let year = defaultData.format("YYYY");
  temporaryArr[0].values = [];
  // 塞入年
  for (let i = year - 1; i < year - 0 + 1; i++) {
    temporaryArr[0].values.push(`${i}年`);
  }
  // 选择当前年
  for (let i = 0; i < temporaryArr[0].values.length; i++) {
    if (parseInt(temporaryArr[0].values[i]) == parseInt(year)) {
      temporaryArr[0].defaultIndex = i;
      temporaryArr[0].valueKey = i; 
      break;
    }
  }
  // 筛入周
  temporaryArr[1].values = this.weelys(year);
  // 查当前周
  for (let i = 0; i < temporaryArr[1].values.length; i++) {
    if (
      moment(temporaryArr[1].values[i].value).format("wo") ==
      defaultData.format("wo")
    ) {
      temporaryArr[1].defaultIndex = i;
      temporaryArr[1].valueKey = i;
      break;
    }
  }
  console.log(temporaryArr,defaultData,date, 'temporaryArr');
  this.setData({
    columns: temporaryArr
  })
},
onConfirm(e) {
  console.log(e, '周confirm');
  app.globalData.chooseTimeGlobal = Object.assign({type:2}, e.detail)
  wx.switchTab({
    url: `../statistical/index`,
  })
},
onChange(e) {
  console.log(e, '周onChange');
},
cancel(e) {
  console.log(e, '周cancel');
  wx.switchTab({
    url: `../statistical/index`,
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