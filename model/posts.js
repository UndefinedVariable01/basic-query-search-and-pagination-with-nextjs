const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: { type: String, minlength: 3, maxlength: 64, trim: true, required: true },
    imageUrl: { type: String, minlength: 3, maxlength: 256, required: true },
    viewCount: { type: Number, min: 0, default: 0 },
})

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

module.exports = Post
