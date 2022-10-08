// app.js
const {getCludeFunc : gcf} = require('./utils/index.js')
App({
  globalData: {
    appID: '',
    openID: '',
    allNum: '',
    payAll: '',
    selfGianWay: '',
    selfGainFrom: '',
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
    let id = wx.getStorage('openid' as any);
    // 获取用户信息
    if(!wx.getStorageSync('userInfo')){
      gcf('getUserID', {}).then(res=>{
        console.log(res, 'res');
        const {openid, appid} = res.result
        that.globalData.openID = openid
        that.globalData.appID = appid
        wx.setStorageSync('openid', openid)
        id = openid
        // 查看用户信息是否创建，没有的话，新建
      })
    }
    wx.cloud.callFunction({
      name: 'commonGain', 
      data: {
         name: 'userInfo',
         queryObj: {
           openID: id,
         }
       }
     }).then(result=>{
      console.log(result, 'result')
    })
  }
});
