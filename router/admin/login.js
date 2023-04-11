const {User} = require("../../model/user");
const bcrypt = require('bcrypt');
module.exports = async(req,res) => {
    let {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0){
       return res.status(400).render("admin/error",{
            msg: "用户邮箱或者密码不能为空"
        });
    }
    const user = await User.findOne({email});
    // 通过邮箱地址从数据库查询到用户
    if(user) {
        let passwordResult = await bcrypt.compare(password,user.password)
        if(passwordResult) {
            req.session.username = user.username;
            req.session.role = user.role;
                req.app.locals.userMessage = user;
            // 对登陆成功的用户进行角色判断
            if(user.role == "admin") {
                // 超级管理员重定向到博客管理页面
                res.redirect("/admin/user"); 
            }else {
                // 普通用户重定向到博客首页
                res.redirect("/home/index");
            }
           
        }else {
            res.status(400).render("admin/error",{
                msg: "用户邮箱或者密码错误"
            });
        }
    }else {
        //通过邮箱地址没有从数据库查询到用户
        res.status(400).render("admin/error",{
            msg: "用户邮箱或者密码错误"
        });
    }
}