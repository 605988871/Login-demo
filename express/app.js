const express = require('express')
const app = express()

const addAndDelete = require('./database/router/addAndDelete');
const loginAndRegister = require('./database/router/loginAndRegister')

const bodyParser = require("body-parser")

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

// 使用
app.use('/api', addAndDelete);
app.use('/api', loginAndRegister);

// 定义服务器启动端口 
app.listen(3001, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('app listening on port 3001');
});