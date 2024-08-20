// 检测中间件
module.exports = (req, res, next) => {
  if(!req.session.username) {
    // 判断
    return res.redirect('/login')
  }
  next()
}