// 引入文章评论集合
const {Comment} = require("../../model/comment");
module.exports = async (req,res) => {
    // 设置访问博客详情页标志
    res.app.locals.home = "detil";
    let {articleId,userId,content} = req.body;
    // 将提交的评论提交数据库
    await Comment.create({
        articleId,
        userId,
        content,
        time: new Date()
    });
    // 重定向到文章详情页面
    res.redirect("/home/article-detil?id=" + articleId);
}