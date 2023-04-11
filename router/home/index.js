// 引入文章构造函数
const {Article} = require("../../model/article");
// 引入第三方模块处理分页
const pagination = require("mongoose-sex-page");
module.exports = async (req,res) => {
    // 设置访问博客首页标志
    res.app.locals.home = "index";
    const {page} = req.query;
    // page 指定当前页
    // suze 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // 查询所有文章数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate("author").exec();
    let articles = JSON.stringify(result);
    articles = JSON.parse(articles);
    res.render("home/default",{
        articles,
    });
}