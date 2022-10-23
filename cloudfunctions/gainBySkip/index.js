// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 & 拿到数据库
cloud.init({
  env: 'fpzh-0gc2lpkadbbf45da',
})
const db=cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event, 'event');
  const {name, queryObj, offset, limitNum } = event
  return await db.collection(name).where(queryObj ? queryObj: {}).skip(offset).limit(limitNum).get()
}