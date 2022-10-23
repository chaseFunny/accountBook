// app.js
const {getCludeFunc : gcf} = require('./utils/index.js')
App({
  globalData: {
    appID: '',
    openID: '',
    allNum: '', // 记录总数
    payAll: '', // 记录支出总次数
    selfGianWay: '', // 自定义渠道
    selfGainFrom: '', // 自定义收入来源
    selfPayWay: '', // 自定义支出用途
    isRemand: '', //是否设置提醒
  },
  onLaunch: function (options) {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'fpzh-0gc2lpkadbbf45da',
        traceUser: true,
      });
    }
    let that = this;
    // 判断是否由分享进入小程序  从分享进入小程序时 返回上一级按钮不应该存在
    if ( options.scene == 1007 || options.scene == 1008) {
      that.globalData.isShare = true;
    } else {
      that.globalData.isShare = false;
    };
    let id = wx.getStorageSync('openid');
    // 获取用户信息
    if(!wx.getStorageSync('userInfo')){
      gcf('getUserID', {}).then(res=>{
        const {openid, appid} = res.result
        that.globalData.openID = openid
        that.globalData.appID = appid
        wx.setStorageSync('openid', openid)
        id = openid
      })
    }
    console.log(id, 'ididid');
    
    // 查看用户信息是否创建，没有的话，新建
    wx.cloud.callFunction({
      name: 'commonGain', 
      data: {
         name: 'userInfo',
         queryObj: {
           openID: id,
         }
       }
     }).then((result: any)=>{
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
            _createTime: Date.parse(new Date() as any),
          }
        })
      }else{
        const {allNum, payAll, selfGainFrom, selfGianWay, selfPayWay, isRemand} = result.result.data[0]
        this.globalData.allNum = allNum;
        this.globalData.payAll = payAll;
        this.globalData.selfGainFrom = selfGainFrom;
        this.globalData.selfGianWay = selfGianWay;
        this.globalData.selfPayWay = selfPayWay;
        this.globalData.isRemand = isRemand;
      }
    })
  }
});
