const express = require("express");
const path = require("path");
// 引入第三方模块 处理 post 请求参数
const bodyParser = require("body-parser");
const session = require("express-session");
require("./model/connect");
// 引入 art-template 模块
const template = require("art-template");
// 引入第三方格式化时间模块
const dateFormat = require("dateformat");
// 导入config模块
const config = require('config');
console.log(config.get("title"));
// 将格式化时间的方法名通过变量的方式导入模板
template.defaults.imports.dateFormat = dateFormat;
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'secret key' }));
// 开放静态资源
app.use(express.static(path.join(__dirname,"public")));
// 告诉express框架 art 模板用什么模板引擎渲染
app.engine("art",require("express-art-template"));
// 配置模板的路径
app.set("views",path.join(__dirname,"views"));
// 配置模板的默认路径
app.set("view engine","art");
const admin = require("./router/admin");
const home = require("./router/home");
// 未登录拦截
app.use("/admin",require("./middleware/loginGuard"));

// 博客后台管理路由
app.use("/admin",admin);
// 博客首页路由
app.use("/home",home);
app.listen(3000);
console.log("服务器启动成功");