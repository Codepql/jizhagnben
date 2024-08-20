// 导出函数
module.exports = function(success, error) {

  // 判断
  if(typeof error !== 'function') {
    error = () => {
      console.log("连接失败")
    }
  }
  // 安装 mongoose
  // 导入 mongoose
  const mongoose = require("mongoose")
  // 导入 config
  const {DBHOST, DBPORT, DBNAME} = require("../config/config")

  // 连接数据库
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)

  // 设置回调
  // 设置连接成功回调        once 只连接一次
  mongoose.connection.once("open", () => {
    success()
  })

  // 设置连接失败回调
  mongoose.connection.on("error", () => {
    error()
    console.log("连接失败")
  })

  // 设置连接关闭回调
  mongoose.connection.on("close", () => {
    console.log("连接关闭")
  })
}