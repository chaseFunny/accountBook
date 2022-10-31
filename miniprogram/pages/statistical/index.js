import { createElement } from '@antv/f2';
import Chart from './chart';
import dayjs from 'dayjs'
const db =wx.cloud.database()
const _ = db.command
var app = getApp();
import {getCludeFunc} from '../../utils/index'
const data1 = [{
  genre: 'Sports',
  sold: 275
}, {
  genre: 'Strategy',
  sold: 115
}, {
  genre: 'Action',
  sold: 120
}, {
  genre: 'Shooter',
  sold: 350
}, {
  genre: 'Other',
  sold: 150
}];
  // "@antv/wx-f2": "^2.1.1",
Component({
  data: {
    chartData: data1,
    onRenderChart: () => {},
    caleIconUrl: '../../images/iconPng/calendar.png',
    currChoose: '0',
    dateList: [
      {key: 0, val: '按日'},
      {key: 1, val: '按周'},
      {key: 2, val: '按月'},
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
    onChange(e){
      console.log(e, 'tab');
      this.setData({
        currDateType: e.detail.index
      })
    },
    switch(e){
      console.log(e, 'switch');
      this.setData({
        currChoose: e.currentTarget.id
      })
    },
    showTimePicker(){
      wx.navigateTo({
        url: `../chooseTime/index?id=${this.data.currDateType}-${this.data.currDate}`,
      })
    },
    timeRange(){

    },
  },
  pageLifetimes: {
    show() {
      const {currDateType, currChoose} = this.data
      const id = wx.getStorageSync('openid');
      console.log(app.globalData, 'tongji');
      this.setData({
        currDate: dayjs(app.globalData.chooseTimeGlobal).format('MM月DD日')
      })
      const queryObj = currChoose ? {
        userID: id,
        isIncome: currChoose == 1 ? true : false,
        recordTime: _.and(_.lt(dayjs().startOf()),_.lt(dayjs().endOf())) 
      } : {
        userID: id,
        recordTime: _.lt(dayjs().endOf())
      }
      // 调用云函数，拿到数据
      getCludeFunc('commonGain', {
        name: 'inOutModel',
        queryObj
      })
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  }
})
