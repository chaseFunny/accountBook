
const db = wx.cloud.database()
var app = getApp();
const listCol = db.collection('inOutModel')
const {getCludeFunc : gcf} = require('../../utils/index')
import Toast from '@vant/weapp/toast/toast';
import dayjs from 'dayjs'
import { weekMap, formatNum, defaultIncomeWay } from '../../utils/format';
// @ts-ignore
Component({
  data: {
    isNew: false,
    inOrOut: [
      {key: 'bothAll', value: '收支记录'},
      {key: 'income', value: '收入记录'},
      {key: 'sendOut', value: '支出记录'},
    ],
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
    /** 滚动底部 */
    async lower(e){
      console.log('tolower',this.data.size, this.data.offset,this.data.isRequestNext, e);
      if(this.data.isRequestNext){
        await this.setData({
          offset: this.data.size + this.data.offset
        })
      }else{
        console.log('jinlaio');
        Toast('已经到底啦~');
      }
    },
    async bindLoadingNew(e){
      await this.setData({
        offset: 0
      })
      await this.getDate()
      await this.setData({
        isMoveToUp: false
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
      resArr = resArr.map(ele => {
        if(ele === null) {
          return null
        } else {
          return Object.assign({},ele,{
            income: formatNum(ele.income),
            spending: formatNum(ele.spending)
          })
        }
      })
      this.setData({
        loadList: resArr
      })
    },
    /** 调用接口，获取数据 */
    async getDate() {
      const {offset, size} = this.data
      const that = this
      const searchObj = {userID: wx.getStorageSync('openid')}
      listCol.where(searchObj).skip(offset).limit(size).get().then(res=>{
        console.log('调用接口了');
        const {isNew} = this.data
        if(res.data.length > 0) {
          // 当数据不足20条，下拉就提醒到底了
          if(res.data.length < 20) {
            this.setData({
              isRequestNext: false
            })
          }
          if(!isNew){
            this.setData({
              dataList: [...that.data.dataList, ...res.data]
            })
            this.formatData([...that.data.dataList, ...res.data])
          }else{
            this.setData({
              dataList: [...res.data]
            })
            this.formatData([...res.data])
          }
        }else{
          Toast.fail('数据为空');
        }
      })
    }
  },
  pageLifetimes: {
    show() {
      let that = this;
      this.data.isNew = true;
      // 用户第一次来
      let id = wx.getStorageSync('openid');
      // 获取用户信息
      if(!id){
        gcf('getUserID', {}).then(res=>{
          const {openid, appid, } = res.result
          app.globalData.openID = openid
          app.globalData.appID = appid
          wx.setStorageSync('openid', openid)
          console.log('哈哈',wx.getStorageSync('openid'), res);
          id = openid
        })
      }
      console.log(id,wx.getStorageSync('openid'), 'ididid');
      // 查看用户信息是否创建，没有的话，新建
      wx.cloud.callFunction({
        name: 'commonGain', 
        data: {
           name: 'userInfo',
           queryObj: {
             openID: id,
           }
         }
       }).then((result)=>{
        console.log(result, 'result')
        if(result.result.data.length <= 0){
          gcf('commonAdd', {
            name: 'userInfo',
            queryObj: {
              openID: id,
              allNum: 0,
              payAll: 0,
              selfGianWay: [],
              selfGainFrom: [],
              selfPayWay: [],
              isRemand: false,
              _createTime: Date.parse(new Date()),
            }
          })
        }else{
          const {allNum, payAll, selfGainFrom, selfGianWay, selfPayWay, isRemand} = result.result.data[0]
          app.globalData.allNum = allNum;
          app.globalData.payAll = payAll;
          app.globalData.selfGainFrom = selfGainFrom;
          app.globalData.selfGianWay = selfGianWay;
          app.globalData.selfPayWay = selfPayWay;
          app.globalData.isRemand = isRemand;
        }
      })
      // 获取数据
      // setTimeout(()=>, 20)
      this.getDate()
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
