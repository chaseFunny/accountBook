
const db = wx.cloud.database()
const listCol = db.collection('inOutModel')
import Toast from '@vant/weapp/toast/toast';
import dayjs from 'dayjs'
import { weekMap } from '../../utils/format';
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
    loadList: [], // 格式化后的数组
  },
  methods: {
    /** 获取时间差 */
    computeDiff(timeStamp){
      const now = new Date().getTime()
      return dayjs(now).diff(dayjs(timeStamp), 'days')
    },
    /** 转化时间 */
    transTime(timeStr) {
      const now = new Date().getTime()
      const isToday = dayjs(timeStr).isSame(dayjs(now), 'day')
      console.log(dayjs(timeStr).day(), 'dayjs(timeStr).day()');
      const weekValue =  weekMap[Number(dayjs(timeStr).day())]
      console.log(weekValue, isToday, 'isToday');
      if(isToday){
       return ['今天', weekValue];
      }else {
        return [dayjs(timeStr).format('MM-DD'), weekValue]
      }
    },
    /** 把请求到的数据转化为我们想要的数据格式 */
    formatData(arr){
      // console.log(arr, '进来的数据');
      let resArr = [];
      let num = 1 
      arr.forEach((obj)=>{
        const TimeDiffer = this.computeDiff(obj.recordTime)
        // console.log(TimeDiffer,obj, 'TimeDiffer');
        // 判断是否是第一次存储
        if(resArr[TimeDiffer]?.isRecord) {
          const income = obj.isIncome ? Number(obj.money) : 0
          const spending = !obj.isIncome ? Number(obj.money) : 0
          resArr[TimeDiffer] = Object.assign({}, resArr[TimeDiffer], {
            income: resArr[TimeDiffer].income + income,
            spending: resArr[TimeDiffer].spending + spending,
            list: Object.assign({}, resArr[TimeDiffer].list,{
              length: resArr[TimeDiffer].list.length + 1
            })
          })
          resArr[TimeDiffer].list[resArr[TimeDiffer].list.length - 1] = obj
          // console.log('已经有值了', resArr, obj);
        }else{
          const income = obj.isIncome ? Number(obj.money) : 0
          const spending = !obj.isIncome ? Number(obj.money) : 0
          const showDate = this.transTime(obj.recordTime)
          console.log();
          resArr[TimeDiffer] = {
            date: showDate,
            income,
            spending,
            isRecord: true,
          }
          resArr[TimeDiffer].list = {0: obj, length: 1}
          // console.log('没有值了', resArr, [obj]);
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
        const {isNew} = this.data
        if(res.data.length > 0) {
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
      this.data.isNew = true;
      // 获取数据
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
