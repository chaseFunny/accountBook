
const db = wx.cloud.database()

// @ts-ignore
Component({
  data: {
    inOrOut: [
      {key: 'bothAll', value: '收支记录'},
      {key: 'income', value: '收入记录'},
      {key: 'sendOut', value: '支出记录'},
    ],
    chooseTime: '',
    dataList: '', // 数据列表
    isRemind: '', // 是否设置记账提醒
    // 分页
    recordList: [],
    offset: 0,
    size: 20
  },
  methods: {
    fn(a){
      // @ts-ignore
      console.log(a)
    },
    /** 调用接口，获取数据 */
    async getDate() {

      const res = await wx.cloud.callFunction({
        name: 'gainBySkip',
        data:{
          name: '',
          queryObj:{},
          offset: this.data.offset,
          limitNum: this.data.size
        }
      })
      console.log(res, 'res');
    }
  },
  pageLifetimes: {
    show() {
      // 获取数据

      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})
