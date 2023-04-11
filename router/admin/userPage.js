// 引入用户集合构造函数
const {User} = require("../../model/user");
module.exports = async(req,res) => {
    // 设置访问用户管理标准
    res.app.locals.flag = "user";
    // 当用户从登陆进入，此时 page默认为 1
    const { page } = req.query || 1;
    // 数据库中用户总数
    let userCount = await User.count();
    // 每页显示数据条数
    let  pageSize= 5;
    // 总页数
    let total = Math.ceil(userCount / pageSize);
    // 页码对应查询数据开始的位置
    let start = (page - 1) * pageSize;
    let users = await User.find().skip(start).limit(pageSize);
    res.render("admin/user",{
        users,
        userCount,
        total,
        page
    });
}