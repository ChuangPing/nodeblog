module.exports = (req,res) => {
    // 删除session
    req.session.destroy(function () {
        // 删除cookie
        res.clearCookie("connect.sid");
        // 将userMessage数据清空
        req.app.locals.userMessage = "";
        // 重定向到登录页面
        res.redirect("/admin/login");
    });
}
