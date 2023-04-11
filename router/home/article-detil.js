const {Article} = require('../../model/article');
const {Comment} = require("../../model/comment");
module.exports = async (req,res) => {
    // 设置访问博客详情页标志
    res.app.locals.home = "detil";
    const {id} = req.query;
    // 利用图书的id 值查询文章集合
    let article = await Article.findOne({_id: id});
    // 利用图书的id 查询当前文章的评论
    let result = await Comment.find({articleId: id}).populate("userId");
    let comments = JSON.stringify(result);
    comments = JSON.parse(comments);
    // res.send(comments);
    res.render("home/article",{
        article,
        comments
    });
}