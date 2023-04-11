const {Article} = require("../../model/article");
module.exports = async (req,res) => {
    let id = req.query.id;
    //通过拿到的id 删除对应的文章
    await Article.deleteOne({_id: id});
    // 删除成功后重定向到文章列表页
    res.redirect("/admin/article-list");
}