// 中间件模块 登录拦截
module.exports = (req,res,next) => { // 匹配所有以admin 开头的请求 并判断是否登录
    if(req.url != "/login" && ! req.session.username) {
        // 未登录重新定向到登录页面
        res.redirect("/admin/login");
    }else {
        next(); // 放行
    }
}