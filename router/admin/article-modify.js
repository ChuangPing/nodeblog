const formidable = require("formidable");
const {Article} = require("../../model/article");
// 引入路径拼接第三方模块
const path = require("path");
module.exports = (req,res) => {
    let {id} = req.query;
    // 创建表单解析对象
    let form = formidable();
    // 设置文件上传目录
    form.uploadDir = path.join(__dirname,"../","../","public","upload");
    // 保留表单上传文件的扩展名  默认不保存
    form.keepExtensions = true;
    // 对表单进行解析
    form.parse(req,async (err,fields,files) => {
        // res.send(fields);
        // console.log(files,id);
        // return;
        await Article.updateOne({_id: id},{
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split("public")[1],
            content: fields.content
        });
        // 修改成功重定向到文章首页
        res.redirect("/admin/article-list");
    });
                      
}