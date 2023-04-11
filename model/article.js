const mongoose = require("mongoose");
// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    author: {
        // author 字段与 user 集合 中的 _id 关联
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    publishDate: {
        type: Date,
        // 非必填字段，默认为当前时间
        default: new Date(),
    },
    // 文章封面
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});
// 使用集合规则创建集合
const Article = mongoose.model("Article",articleSchema);
module.exports = {
    Article
}