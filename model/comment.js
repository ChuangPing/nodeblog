const mongoose = require("mongoose");
// 创建文章评论集合规则
const commentSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
        ref: "Article"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    },
    time: {
        type: Date  //评论时间
    }
});
//利用集合规则创建文章评论集合
const Comment = mongoose.model("Comment",commentSchema);
module.exports = {
    Comment
}