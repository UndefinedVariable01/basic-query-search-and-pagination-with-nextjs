import connectToDB from "../config/database"
import Post from "../model/posts"

export default async function () {
    try {
        await connectToDB()

        const posts = await Post.find().limit(3)
        const count = await Post.find().countDocuments()
        const data = JSON.stringify({ posts, count })
        return data
    } catch (err) {
        return false
    }
}
