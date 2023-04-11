const {Article} = require("../../model/article");
module.exports = async (req,res) => {
    // 设置访问用户管理标准
    res.app.locals.flag = "article";
    // 获取当前页
    const {page} = req.query || 1;
    // 获取数据库中文章总数
    let articleCount = await Article.count();
    // 每页显示文章条数
    let pageSize = 3;
    // 总页数
    let total = Math.ceil(articleCount / pageSize);
      // 页码对应查询数据开始的位置
      let start = (page - 1) * pageSize;
      let result = await Article.find().populate('author').skip(start).limit(pageSize);
      result = JSON.stringify(result);
      let articles = JSON.parse(result);
    //   console.log(articles.author);
    //   res.send(articles);
    //   return;
    res.render("admin/article",{
        articles,
        total,
        page,
        articleCount
    });

}