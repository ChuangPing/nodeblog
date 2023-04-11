// 用户集合规则模块
const mongoose = require("mongoose");
// 引入第三方验证模块
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        // 必填字段
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        // 保证邮箱地址在插入数据库时不重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        //  admin 超级管理员 normal 普通用户
        type: String,
        required: true
    },
    state: {
        // 1:禁用，0： 启用
        type: Number,
        default: 0,
    }
});
const User = mongoose.model("User",userSchema);
async function userCreate() {
    let salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash("123456",salt);
    User.create({
        username: "李四",
        email: "811191051@qq.com",
        password: pass,
        role: "admin",
        state: 0
    });
}
// userCreate();
function validateUser (user) {
    // 验证规则
const schema = Joi.object({
    username: Joi.string().required().min(2).max(10).error(new Error("用户名格式不正确")),
    email: Joi.string().pattern(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/).required().error(new Error("邮箱格式错误")),
    password: Joi.string().required().regex(/^[0-9a-zA-A]{6,20}/).error(new Error("密码格式不正确")),
    role: Joi.string().valid("normal","admin").error(new Error("角色格式设置不正确")),
    state: Joi.valid("0","1").error(new Error("状态格式设置错误"))
});
return schema.validateAsync(user);
}
exports.User = User;
module.exports = {
    User,
    validateUser
};