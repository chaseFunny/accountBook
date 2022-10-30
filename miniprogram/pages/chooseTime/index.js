import moment from "moment";
// import "moment/locale/zh-cn";
// pages/chooseTime/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarType: ['single','multiple', 'range'],
    currType: '', // 父组件接受到的当前选择类型
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    columns: [
      {
        values: [],
        className: "column1"
      },
      {
        values: [],
        className: "column2"
      }
    ], // 周选择器
    defaultsTime: '', // 接受父组件的时间
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
    this.setDate();
    const arr = options.id.split('-')
    console.log(arr, 'hh');
    this.setData({
      currType: arr[0],
      defaultsTime: arr[1]
    })
  },

  // 日选择器
  datePicker(e){
    console.log(e, 'eeee');
    wx.switchTab({
      url: `../statistical/index`,
    })
  },
  // 月选择器
  onInput(event) {
    console.log(event, 'event');
    this.setData({
      currentDate: event.detail,
    });
  },
  // 周选择 获取一年的周次列表 y: 当前
weelys (y)  {
  const oneDay = moment(y + "-01-01");
  let oneWeely = null;
  if (oneDay.format("wo") == "1周") {
    oneWeely = oneDay.startOf("week").format("YYYY-MM-DD");
  } else {
    console.log("weeks");
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
setDate() {
  const defaultData = moment(this.data.defaultsTime);
  const {columns} = this.data
  const temporaryArr = [].concat(columns)
  // 获取默认年份
  let year = moment().format("YYYY");
  temporaryArr[0].values = [];
  // 塞入年
  for (let i = year - 1; i < year - 0 + 10; i++) {
    temporaryArr[0].values.push(i);
  }
  // 选择当前年
  for (let i = 0; i < temporaryArr[0].values.length; i++) {
    if (temporaryArr[0].values[i] == year) {
      temporaryArr[0].defaultIndex = i;
      temporaryArr[0].valueKey = i;
      break;
    }
  }

  temporaryArr[1].values = this.weelys(year);
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
  this.setData({
    columns: temporaryArr
  })
  console.log(temporaryArr, 'temporaryArr');
},
onConfirm(e) {
  console.log(e, '周confirm');
},
onChange(e) {
  console.log(e, '周onChange');
},
cancel(e) {
  console.log(e, '周cancel');
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