const {User} = require("../../model/user");
module.exports = async (req,res) => {
    const {message,id} = req.query;
    // res.render("admin/user-edit",{
    //     message: message
    //  });
    if(id) {
        // 修改用户
        let user = await User.findOne({_id: id});
        res.render("admin/user-edit",{
            user,
            button: "修改",
            link:"/admin/user-modify?id=" + id,
         });
    }else {
        // 添加用户
        res.render("admin/user-edit",{
            message: message,
            button: "添加",
            link: "/admin/user-edit"
         });
    }
    
}