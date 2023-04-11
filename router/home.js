const express = require("express");
// 获取路由对象
const home = express.Router();
// 渲染博客首页路由
home.get("/index",require("./home/index"));
// 渲染博客详情页
home.get("/article-detil",require("./home/article-detil"));
// 实现文章评论功能
home.post("/article-comment",require("./home/article-comment"));
// 将路由对象导出
module.exports = home;