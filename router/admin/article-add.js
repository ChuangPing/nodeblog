// 引入文件上传表单处理模块
const formidable = require("formidable");
// 引入文章构造函数
const {Article} = require("../../model/article");
// 引入路径拼接模块
const path = require("path");
module.exports = (req,res) => {
     // 创建表单解析对象
     const form = new formidable.IncomingForm();
     // 设置文件上传目录
     form.uploadDir = path.join(__dirname,"../","../","public","upload");
     // 保留表单上传文件的扩展名
     form.keepExtensions = true;
     // 对表单进行解析
     form.parse(req,async (err,fields,files) => {
         // fields 存储普通请求参数  files 存储上传的文件信息
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split("public")[1],
            content: fields.content
        });
        // 重定向到文章展示页面
         res.redirect("/admin/article-list");
     });

}