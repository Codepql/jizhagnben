const express = require('express');
const router = express.Router();

const AccountMedule = require("../../module/AccountModule")
const moment = require('moment')

const checkLoginMiddleware = require('../../middleware/checkLoginMiddleware')

// 首页
router.get('/', (req, res) => {
  // 响应/account
  res.redirect('/account')
})

// 账本记录
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // 读取集合信息
  AccountMedule.find().sort({time: -1})
  .then(data => {

    res.render('list', {accounts: data, moment: moment})
  })
  .catch(err => {
    res.status(500).send('查看失败~')
  })

});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {

  // 插入数据库
  AccountMedule.create({
    ...req.body,
    // 修改 time属性
    time: moment(req.body.time).toDate()
  })
  .then(data => {
    res.render('success', {msg: '添加成功', url: '/account'})
  })
  .catch(err => {
    res.status(500).send('插入失败')
  })

})

// 删除记录
router.get("/account/:id", checkLoginMiddleware, (req, res) => {
  // 获取params 中的 id
  let id = req.params.id
  // 删除
  AccountMedule.deleteOne({_id: id})
  .then(data => {

    res.render('success', {msg: '删除成功', url: '/account'})
  })
  .catch(err => {
    res.status(500).send('删除失败~')
    return
  })

})

module.exports = router
