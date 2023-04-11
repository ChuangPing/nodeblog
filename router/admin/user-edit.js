// 引入密码加密模块
const bcrypt = require("bcrypt");
const {User,validateUser} = require("../../model/user");
module.exports = async(req,res,next) => {
    try{
        await validateUser(req.body);
    }catch(err) {
        // return next(JSON.stringify({path: '/admin/user-edit', message: err.message}));
        return res.redirect(`/admin/user-edit?message=${err.message}`);
    }
    let result = await User.findOne({email: req.body.email});
    if(result) {
        // 邮箱已经被注册
        // return next(JSON.stringify({path: "/admin/user-edit", message: "该邮箱已经注册过" }));
        return res.redirect(`/admin/user-edit?message=该邮箱已经注册过`);
    }else {
        // 对密码进行加密存入数据库
        let salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password,salt);
        req.body.password = password;
        await User.create(req.body);
        res.redirect("/admin/user");
    }
}