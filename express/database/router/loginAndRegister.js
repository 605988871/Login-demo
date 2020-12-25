const express = require('express')
const router = express.Router()
const Account = require('../model/account')
const jwt = require('jsonwebtoken')
const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd'

router.post('/register', (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password
    })
    account.save((err, docs) => {
        if (err) {
            res.send({
                ...err,
                'code': 1,
                'errorMsg': '新增失败'
            });
        } else {
            res.send({
                ...docs,
                "code": 0,
                'message': '新增成功'
            });
        }
    })
})

router.post('/login', async (req, res) => {
    const account = await Account.findOne({
        username: req.body.username
    })
    if (!account) {
        return res.status(422).send({
            message: "用户不存在"
        })
    }
    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        account.password
    )
    console.log(isPasswordValid)
    if (!isPasswordValid) {
        return res.status(422).send({
            message: "密码无效"
        })
    }


    const token = jwt.sign({
        id: String(account._id)
    }, SECRET)

    // 生成token
    res.send({
        code:2001,
        account,
        token
    })
})

module.exports = router;