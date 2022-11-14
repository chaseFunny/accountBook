
const db = wx.cloud.database()
var app = getApp();
const _ = db.command
const listCol = db.collection('inOutModel')
const {getCludeFunc : gcf} = require('../../utils/index')
import Toast from '@vant/weapp/toast/toast';
import dayjs from 'dayjs'
import { weekMap, formatNum, defaultIncomeWay } from '../../utils/format';
// @ts-ignore
Component({
  data: {
    topNum: 0,
    nodata:'../../images/colorfulPng/noData.jpg',
    isNew: false,
    show: false,
    showCalendar: false,
    minDate: dayjs(new Date()).subtract(1, 'year').valueOf(),
    maxDate: dayjs(new Date()).valueOf(),
    currDate: new Date().getTime(),
    inOrOut: [
      {key: 'bothAll', value: '收支记录'},
      {key: 'income', value: '收入记录'},
      {key: 'sendOut', value: '支出记录'},
    ],
    currRecordType: '收支记录',
    chooseTime: '',
    dataList: [], // 数据列表
    isRemind: '', // 是否设置记账提醒
    // 分页
    recordList: [],
    offset: 0,
    size: 20,
    loadList: [], // 格式化后的数组、
    isMoveToUp: true,
    isRequestNext: true,
  },
  methods: {
    /** 时间范围选择 */
    onClose() {
      this.setData({
        showCalendar: false
      })
    },
    onConfirm(e){
      if(e.detail[1]){
        const beginTime = dayjs(e.detail[0]).startOf('date').valueOf()
        const endTime = dayjs(e.detail[1]).endOf('date').valueOf()
        this.getDate({
          recordTime: 
          _.and(_.gte(beginTime),_.lte(endTime))
        })
        this.setData({
          showCalendar: false
        })
      }
    },
    goAdd() {
      wx.navigateTo({
        url: '../recordPage/index?id=0',
      })
    },
    /** 滚动底部 */
    async lower(e){ 

      if(this.data.isRequestNext){
        await this.setData({
          offset: this.data.size + this.data.offset
        })
        await this.getDate({})
      }else{
        Toast('已经到底啦~');
      }
    },
    /** 下拉在加载 */
    async bindLoadingNew(e){
      console.log(e, 'jinlaile');
      await this.setData({
        offset: 0,
        currRecordType: '收支记录',
        isNew: false
      }) 
      await this.getDate({})
      await this.setData({
        isMoveToUp: false,
        isRequestNext: true,
      })
    },
    /** 获取时间差 */
    computeDiff(timeStamp){
      const now = new Date().getTime()
      return dayjs(now).diff(dayjs(timeStamp), 'days')
    },
    /** 转化时间 */
    transTime(timeStr) {
      const now = new Date().getTime()
      const isToday = dayjs(timeStr).isSame(dayjs(now), 'day')
      const weekValue =  weekMap[Number(dayjs(timeStr).day())]
      if(isToday){
       return ['今天', weekValue];
      }else {
        return [dayjs(timeStr).format('MM-DD'), weekValue]
      }
    },
    /** 把请求到的数据转化为我们想要的数据格式 */
    formatData(arr){
      let resArr = [];
      let num = 1 
      arr.forEach((obj)=>{
        const TimeDiffer = this.computeDiff(obj.recordTime)
        // 判断是否是第一次存储
        if(resArr[TimeDiffer]?.isRecord) {
          const income =obj.isIncome ? Number(obj.money) : 0
          const spending = !obj.isIncome ? Number(obj.money) : 0
          resArr[TimeDiffer] = Object.assign({}, resArr[TimeDiffer], {
            income: resArr[TimeDiffer].income + income,
            spending: resArr[TimeDiffer].spending + spending,
            list: Object.assign({}, resArr[TimeDiffer].list)
          })
          const newObj = defaultIncomeWay.find(curr=>curr.name === obj.way)
          resArr[TimeDiffer].list[Object.keys(resArr[TimeDiffer].list).length] = {...obj, icon: newObj.iconName}
        }else{
          const income = obj.isIncome ? Number(obj.money) : 0
          const spending = !obj.isIncome ? Number(obj.money) : 0
          const showDate = this.transTime(obj.recordTime)
          resArr[TimeDiffer] = {
            date: showDate,
            income,
            spending,
            isRecord: true,
          }
          const newObj = defaultIncomeWay.find(curr=>curr.name === obj.way)
          resArr[TimeDiffer].list = {0: {...obj, icon: newObj.iconName}}
        }
      })
      let flag =true
      resArr = resArr.map((ele, index) => {
        if(index == 0) {
          flag = false
        }
        if(ele === null) {
          if(index == 0) {
            
          }
          return null
        } else {
          return Object.assign({},ele,{
            income: formatNum(ele.income),
            spending: formatNum(ele.spending)
          })
        }
      })
      if(flag) {
        resArr[0] = {
          date: this.transTime((new Date()).valueOf()),
          income: 0.00,
          isRecord: true,
          list: [],
          spending:0.00
        }
      }
      this.setData({
        loadList: resArr
      })
    },
    /** 调用接口，获取数据 */
    async getDate(obj, flag= true) {
      console.log(obj, '调用接口');
      const {offset, size} = this.data
      const that = this
      const searchObj = {userID: wx.getStorageSync('openid')}
      listCol.where(Object.assign({},searchObj,obj)).orderBy('recordTime', 'desc').skip(offset).limit(size).get().then(res=>{
        const {isNew} = this.data
        const aa = res.data.map((ele)=>({...ele,recordTime: new Date(ele.recordTime)}))
        console.log(aa,'res');
        if(res.data.length >= 0) {
          // 当数据不足20条，下拉就提醒到底了
          if(res.data.length < 20) {
            this.setData({
              isRequestNext: false
            })
          }
          if(isNew && flag){
            this.setData({
              dataList: [...that.data.dataList, ...res.data]
            })
            this.formatData([...that.data.dataList, ...res.data])
          }else{
            console.log('111112');
            this.setData({
              dataList: [...res.data]
            })
            this.formatData([...res.data])
            this.setData({
              isNew: true
            })
          }
        }else{
          Toast.fail('数据为空');
        }
      })
    },
    /** 弹出开启 关闭 */
    popupControl(e) {
      if(e.type == 'close'){
        this.setData({
          show: !this.data.show
        })
      }
    },
    /** 展示收支选择弹窗 */
    showPopup() {
      this.setData({
        show: !this.data.show
      })
    },
    /** 记录类型改变 */
    recordChange(e){
      this.setData({
        currRecordType: e.currentTarget.id,
        show: !this.data.show
      })
      // 请求数据
      let arrIncome = [];
      let arrOut = [];
      this.data.dataList.forEach((item)=>{
        if(item.isIncome) {
          arrIncome.push(item)
        }
      })
      this.data.dataList.forEach((item)=>{
        if(!item.isIncome) {
          arrOut.push(item)
        }
      })
      if(this.data.currRecordType == '收支记录'){
        this.formatData(this.data.dataList)
      }
      if(this.data.currRecordType == '收入记录'){
        this.formatData(arrIncome)
      }
      if(this.data.currRecordType == '支出记录'){
        this.formatData(arrOut)
      }
    },
    /** 闹钟 */
    setClock() {
      Toast('开发中~');
    },
    /** 选择时间 */
    selectTime(){
      this.setData({
        showCalendar: true
      })
    }
  },
  pageLifetimes: {
    show() {
      // 获取数据
      // setTimeout(()=>, 20)
      this.setData({
        offset: 0,
        isRequestNext: true,
        isMoveToUp: false,
        topNum:0
      })
      this.getDate({}, false)
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
