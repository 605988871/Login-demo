/*
 定义一个user的Schema
*/
const mongoose = require('../db');
const Schema = mongoose.Schema;

// 创建一个模型
const accountSchema = new Schema({
    username: {
        type: String,
        unique: true //字段唯一
    },
    password: {
        type: String,
        set(val){
            return require('bcryptjs').hashSync(val,10)
        }
    }
});

// 导出model模块
const Account = module.exports = mongoose.model('Account', accountSchema);