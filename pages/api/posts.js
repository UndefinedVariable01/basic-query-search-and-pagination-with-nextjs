import connectToDB from "../../config/database"
import Post from "../../model/posts"

export default async (req, res) => {
    if (req.method !== "GET") return

    try {
        await connectToDB()

        let sortingOrder = req.query.sortBy === "popular" ? "-viewCount" : ""
        let skipedPosts = req.query.page ? parseInt(req.query.page) * 3 : 0

        let searchReg = req.query.search
            ? RegExp(
                  req.query.search
                      .replace(/^"|"$/g, "")
                      .split("-")
                      .map((value) => `(?=.*${value})`)
                      .join("") + ".*",
                  "i"
              )
            : /(?=.*)/

        const posts = await Post.find({ title: searchReg }).sort(sortingOrder).skip(skipedPosts).limit(3).select("_id title imageUrl")
        if (req.query.count) {
            const count = await Post.find({ title: searchReg }).countDocuments()
            res.json({
                posts,
                count,
            })
        } else {
            res.json(posts)
        }
    } catch (err) {
        return res.status(500).send("Something Went Wrong on Our Side!")
    }
}
