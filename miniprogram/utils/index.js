/**
 * name：调用云函数的名称，
 * data：调用云函数的传入参数
 */
function getCludeFunc(name, data) {
  return wx.cloud.callFunction({
    name,
    data
  })
}
module.exports = {
  getCludeFunc
}