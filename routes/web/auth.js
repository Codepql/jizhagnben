var express = require('express');
const UserModule = require('../../module/UserModule');
const md5 = require('md5')
var router = express.Router();

// 注册页面
router.get("/reg", (req, res) => {
  // 响应 HTML
  res.render('auth/reg')
})
// 注册操作
router.post("/reg", (req, res) => {
  // 表单验证
  // 获取请求体数据
  UserModule.create({...req.body, password: md5(req.body.password)})
  .then(data => {
    res.render('success', {msg: "注册成功", url: '/login'})
  })
  .catch(err => {
    res.status(500).send('注册失败~')
  })
})

// 登录页面
router.get("/login", (req, res) => {
  // 响应 HTML
  res.render('auth/login')
})
// 登录操作
router.post('/login', (req, res) => {
  let {username, password} = req.body
  // 查找数据库
  UserModule.findOne({
    username: username, 
    password: md5(password)
  })
  .then(data => {
    if(!data) {
      res.send('账号或者密码错误~')
      return
    }
    // 设置session
    req.session.username = data.username
    req.session._id = data._id

    res.render('success', {msg: "登录成功", url: "/account"})
  })
  .catch(err => {
    res.status(500).send('登录失败，请稍后再试~')
  })
})

//退出登录
router.get('/logout', (req, res) => {
  // 销毁session
  req.session.destroy(() => {
    res.render('success', {msg: '退出登录成功~', url: '/login'})
  })
}) 

module.exports = router
