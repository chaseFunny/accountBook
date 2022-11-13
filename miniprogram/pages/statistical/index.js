import { createElement } from '@antv/f2';
import Chart from './chart';
import dayjs from 'dayjs'
const db =wx.cloud.database()
const _ = db.command
const $ = db.command.aggregate
var app = getApp();
import {getCludeFunc} from '../../utils/index'
const data1 = [
  {name: '支出',genre: '今日',sold: 0},
  {name: '收入',genre: '今日',sold: 0},
  {name: '支出',genre: '昨日',sold: 0},
  {name: '收入',genre: '昨日',sold: 0},
  {name: '支出',genre: `${dayjs().subtract(3, 'day').date()}日`,sold: 0},
  {name: '收入',genre: `${dayjs().subtract(3, 'day').date()}日`,sold: 0},
]
// "@antv/wx-f2": "^2.1.1",
Component({
  data: {
    chartData: data1,
    onRenderChart: () => {},
    caleIconUrl: '../../images/iconPng/calendar.png',
    currChoose: '0',
    dateList: [
      {key: 0, val: '按日'},
      // {key: 1, val: '按周'},
      {key: 2, val: '按月'},
      {key: 3, val: '时段'}
    ],
    list1: [
      {name: '收支', num: 0},
      {name: '收入', num: 1},
      {name: '支出', num: 2},
    ],
    currDateType: '0', // 选择时间类型
    currDate: '', // 选择时间值
  },
  ready() {
    this.setData({
      onRenderChart: () => {
        return this.renderChart(data1);
      }
    }); // 模拟数据更新
    // setTimeout(() => {
    //   this.setData({
    //     onRenderChart: () => {
    //       return this.renderChart(data2);
    //     }
    //   });
    // }, 2000);
  },
  methods: {
    renderChart(data) {
      // return _jsx(Chart, {
      //   data: data
      // }); // 如果不使用 jsx, 用下面代码效果也是一样的
      return createElement(Chart, {
        data: data,
      });
    },
    // 时间类型切换
    onChange(e){
      const {chooseTimeGlobal} = app.globalData
      console.log(e, 'tab');
      this.setData({
        currDateType: e.detail.index
      })
      if( e.detail.index == 0){
        this.setData({
          currDate: dayjs(chooseTimeGlobal.value).format('MM月DD日')
        })
      }
      if( e.detail.index == 1){
        this.setData({
          currDate: dayjs(chooseTimeGlobal.value).format('YYYY年MM月')
        })
      }
    },
    switch(e){
      console.log(e, 'switch');
      this.setData({
        currChoose: e.currentTarget.id
      })
    },
    showTimePicker(){
      wx.navigateTo({
        url: `../chooseTime/index?id=${this.data.currDateType}#${JSON.stringify(app.globalData.chooseTimeGlobal)}`,
      })
    },
    queryData(type, time){
      let timeRange = []
      if(type == 0){
        timeRange[0] = 1
      }
    },
    /** 获取数据 */
    getChartData (beginTime, endTime){
      console.log(dayjs(beginTime).date(), dayjs(endTime).date(), '开始结束');
      const _this = this
      return wx.cloud.callFunction({
        name:'getDataByTime',
        data:{
          name:'inOutModel',
          queryObj:{
            userID: wx.getStorageSync('openid'),
            beginTime,
            endTime
          }
        },
        success: function(res){
          return _this.transDataByDay(res.result.list,endTime)
        }
      })
    },
    // 数据转为图表接受的数据格式
    transDataByDay (arr,time) {
      const arr1 = [
        {name: '支出',genre: '今日',sold: 0},
        {name: '收入',genre: '今日',sold: 0},
        {name: '支出',genre: '昨日',sold: 0},
        {name: '收入',genre: '昨日',sold: 0},
        {name: '支出',genre: `${dayjs(time).subtract(2, 'day').date()}日`,sold: 0},
        {name: '收入',genre: `${dayjs(time).subtract(2, 'day').date()}日`,sold: 0},
      ]
      const todayNum = dayjs(time).date()
      arr.forEach(ele=>{
        // 先判断是哪一天，再判断是收入还是支出，得出index
        const gapNum = todayNum - dayjs(ele.recordTime).date()
        console.log(todayNum, dayjs(ele.recordTime).date(), '时间');
        if(ele.isIncome) {
          arr1[gapNum*2].sold += +ele.money
        }else{
          arr1[1+gapNum*2].sold += +ele.money
        }
      })
      this.setData({
        onRenderChart: () => {
          return this.renderChart(arr1.reverse());
        }
      });
      return arr1
    }
  },
  pageLifetimes: {
    show() {
      const {currDateType, currChoose} = this.data
      const {chooseTimeGlobal} = app.globalData
      const id = wx.getStorageSync('openid');
      console.log(app.globalData, 'tongji');
      const that = this
      if(chooseTimeGlobal.type == 0){
        this.setData({
          currDate: dayjs(chooseTimeGlobal.value).format('MM月DD日')
        })
        this.getChartData(
          dayjs(chooseTimeGlobal.value).subtract(2, 'day').startOf('date').valueOf(),
          dayjs(chooseTimeGlobal.value).endOf('date').valueOf()
        )
      }
      if(chooseTimeGlobal.type == 1){
        const index = chooseTimeGlobal.value[1].text.findIndex('(')
        this.setData({
          currDate: chooseTimeGlobal.value[1].text.subString(0, index)
        })
      }
      if(chooseTimeGlobal.type == 2){
        console.log(chooseTimeGlobal, 'chooseTimeGlobal');
        this.setData({
          currDate: dayjs(chooseTimeGlobal.value).format('YYYY年MM月')
        })
      }
      // const queryObj = currChoose ? {
      //   userID: id,
      //   isIncome: currChoose == 1 ? true : false,
      //   recordTime: _.and(_.lt(dayjs().startOf().valueOf()),_.lt(dayjs().endOf().valueOf())) 
      // } : {
      //   userID: id,
      //   recordTime: _.lt(dayjs().endOf().valueOf())
      // }
      // 调用云函数，拿到数据
      // getCludeFunc('commonGain', {
      //   name: 'inOutModel',
      //   queryObj
      // })
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  }
})
