// 导入 jwt
const jwt = require('jsonwebtoken')
// 导入 config
const { secret } = require('../config/config')

module.exports = (req, res, next) =>{
  // 获取token
  let token = req.get("token")
  // 判断
  if(!token) {
    res.json({
      code: '2003',
      msg: "token 缺失~",
      data: null
    })
  }
  // 校验 token
  jwt.verify(token, secret, (err, data) => {
    if(err) {
      res.json({
        code: '2004',
        msg: 'token 校验失败~',
        data: null
      })
    }
    // 保存用户信息
    req.user = data
    // 如果校验成功
    next()
  })

}