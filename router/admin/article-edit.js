const {Article} = require("../../model/article");
module.exports = async (req,res) => {
    const {id} = req.query;
    if(id) {
        // 修改文章
        // 根据id值查询文章集合
        let result = await Article.findOne({_id: id}).populate("author");
        let article = JSON.stringify(result);
        article = JSON.parse(article);
        // res.send(article);
        // return;
        res.render("admin/article-edit",{
            article,
            button: "修改",
            link: "/admin/article-modify?id=" + id
        });
    }else {
        // 发布文章
    res.render("admin/article-edit",{
        link: "/admin/article-add",
        button: "发布"
    });

    }
}