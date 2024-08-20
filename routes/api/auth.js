var express = require('express');

const UserModule = require('../../module/UserModule');
const md5 = require('md5')
// 导入 jwt
const jwt = require('jsonwebtoken')
// 导入 config
const { secret } = require('../../config/config')


var router = express.Router();

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
      return res.json({
        code: '2001',
        msg: '账号或者密码错误~',
        data: null
      })
      
    }
    // 创建tokne
    let token = jwt.sign({
      username: data.username,
      _id: data._id
    }, secret, {
      expiresIn: 60 * 60 * 24 * 7
    })
    // 响应token
    res.json({
      code: '0000',
      msg: '登录成功~',
      data: token
    })
  })
  .catch(err => {
    res.status(500).send('登录失败，请稍后再试~')
    res.json({
      code: '2002',
      msg: '访问数据库失败~~',
      data: null
    })
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
