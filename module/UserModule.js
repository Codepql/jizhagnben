  // 导入 mongoose
const mongoose = require("mongoose")
  
  // 创建文档结构对象
  // 设置文档中的属性 以及 文档中的属性值的类型
  let UserSchema = new mongoose.Schema({
    username: String,
    password: String
  })



  // 创建模型对象  对文档操作的封装对象
  let UserModule = mongoose.model('users',UserSchema)

  module.exports = UserModule