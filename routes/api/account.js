var express = require('express');
var router = express.Router();


const AccountModule = require("../../module/AccountModule")
const moment = require('moment')


// 导入中间件
let checkTokenMiddleware = require('../../middleware/checkTokenMiddleware')

// 读取账单
router.get('/account', checkTokenMiddleware, function(req, res) {
    // 读取集合信息
  AccountModule.find().sort({time: -1})
  .then(data => {
    res.json({
      code: "0000",
      msg: "读取成功",
      data: data
    })
  })
  .catch(err => {
    res.json({
      code: "1001",
      msg: "读取失败~",
      data: null
    })
  })
})

// 新增账单
router.post('/account', checkTokenMiddleware, (req, res) => {
  // 插入数据库
  AccountModule.create({
    ...req.body,
    // 修改 time属性
    time: moment(req.body.time).toDate()
  })
  .then(data => {
    res.json({
      code: "0000",
      msg: "新增成功~",
      data: data
    })
  })
  .catch(err => {
    res.json({
      code: "1002",
      msg: "创建失败",
      data: null
    })
  })

})

// 删除账单
router.delete("/account/:id", checkTokenMiddleware, (req, res) => {
  // 获取params 中的 id
  let id = req.params.id
  // 删除
  AccountModule.deleteOne({_id: id})
  .then(data => {
    res.json({
      code: '0000',
      msg: "删除成功~",
      data: {}
    })
  })
  .catch(err => {
    res.json({
      code: '1003',
      msg: "删除失败~",
      data: null
    })
  })

})

// 获取单条账单数据
router.get("/account/:id", checkTokenMiddleware, (req, res) => {
  // 获取id
  let {id} = req.params
  // 获取单个账单数据
  AccountModule.findById(id)
  .then(data => {
    res.json({
      code: "0000",
      msg: "获取成功",
      data: data
    })
  })
  .catch(err => {
    res.json({
      code: "1004",
      msg: "获取失败",
      data: null
    })
  })

})

// 更新账单
router.patch("/account/:id", checkTokenMiddleware, (req, res) => {
  // 获取id
  let {id} = req.params
  // 获取单个账单数据
  AccountModule.updateOne({_id: id}, req.body)
  .then(data => {
    AccountModule.findById(id)
    .then(data => {
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data
      })
  })
  .catch(err => {
    res.json({
      code: "1005",
      msg: "更新失败",
      data: null
    })
  })
  })
})

module.exports = router
