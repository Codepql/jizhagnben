  // 导入 mongoose
const mongoose = require("mongoose")
  
  // 创建文档结构对象
  // 设置文档中的属性 以及 文档中的属性值的类型
  let AccountSchema = new mongoose.Schema({
    // 标题
   title: {
    type: String,
    required: true
   },
  // 时间
  time: Date,
  // 类型
  type: {
    type: Number,
    default: -1
  },
  // 金额
  account: {
    type: Number,
    required: true
  },
  // 备注
  remark: {
    type: String
  }
  })

  // 创建模型对象  对文档操作的封装对象
  let AccountModule = mongoose.model('accounts',AccountSchema)

  module.exports = AccountModule