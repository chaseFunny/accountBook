// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'fpzh-0gc2lpkadbbf45da',
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db =cloud.database()
  const _ = db.command
  const $ = db.command.aggregate
  const {name, queryObj } = event
  return await db.collection(name)
    // .where({userID: queryObj.userID})
    .aggregate().match({
      recordTime: _.and(_.gte(queryObj.beginTime),_.lte(queryObj.endTime)),
      userID: queryObj.userID
    }).end()
}