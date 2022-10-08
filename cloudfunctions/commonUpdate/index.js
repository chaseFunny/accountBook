// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 & 拿到数据库
cloud.init()
const db=cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const {name, queryObj, newDate } = event
  return await db.collection(name).where(queryObj ? queryObj: {}).update({
    data: newDate
  })}