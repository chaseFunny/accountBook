// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 & 拿到数据库
cloud.init()
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {name, queryObj } = event
  return await db.collection(name).add({data:queryObj})
}