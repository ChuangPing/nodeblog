const express = require("express");
const admin = express.Router();
// 渲染登陆页面路由
admin.get("/login",require("./admin/loginPage"));
// 登陆业务路由
admin.post("/login",require("./admin/login"));
// 渲染用户列表路由
admin.get("/user",require("./admin/userPage"));
// 实现退出功能路由
admin.get("/logout",require("./admin/logout"));
// 渲染添加用户功能路由
admin.get("/user-edit",require("./admin/user-editPage"));
// 实现添加用户功能路由
admin.post("/user-edit",require("./admin/user-edit"));
// 实现修改用户功能路由
admin.post("/user-modify",require("./admin/user-modify"));
// 实现删除用户功能路由
admin.get("/user-delete",require("./admin/user-delete"));
// 实现渲染文章列表页面路由
admin.get("/article-list",require("./admin/article-list"));
// 渲染发布文章页面路由
admin.get("/article-edit",require("./admin/article-edit"));
// 实现文章发布功能路由
admin.post("/article-add",require("./admin/article-add"));
// 实现文章修改功能路由
admin.post("/article-modify",require('./admin/article-modify'));
// 实现文章删除功能路由
admin.get("/article-delete",require("./admin/article-delete"));
module.exports = admin;