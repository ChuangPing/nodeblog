const { User } = require("../../model/user");
// 引入密码加密模块
const bcrypt = require("bcrypt");
module.exports= async (req,res) => {
    let modifyUser = req.body;
    let {id} = req.query;
    // 根据id 去查询数据库中的用户
    let user = await User.findOne({_id: id});
    // 将查询到的用户密码和客户端查询到的密码进行比对，比对成功才能修改（密码用于校验用户身份保证安全）
    let result = await bcrypt.compare(modifyUser.password,user.password);
    if(result) {
        // 密码比对成功 可以修改
        await User.updateOne({_id: id},{
            username: modifyUser.username,
            email: modifyUser.email,
            role: modifyUser.role,
            state: modifyUser.state
        });
        // 重定向到用户展示页面
        res.redirect("/admin/user");
    }else {
        // 身份验证不通过禁止操作
        res.redirect(`/admin/user-edit?message=密码出错身份验证不通过禁止修改`);
    }
}