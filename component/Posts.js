import { useState, useEffect } from "react"
import Link from "next/link"
import styles from "./Posts.module.scss"
import Search from "./icons/Search"
import cn from "classnames"

export default function Posts({ data, showError }) {
    const [posts, setPosts] = useState(data.posts)
    const [postsCount, setPostsCount] = useState(data.count)
    const [pageIndex, setPageIndex] = useState(0)
    const [category, setCategory] = useState("new")
    const [searchInput, setSearchInput] = useState("")
    const [searchString, setSearchString] = useState("")
    const [loading, setLoading] = useState(false)

    const nextPageActive = (pageIndex + 1) * 3 < postsCount
    const currentPosts = posts.slice(pageIndex * 3, pageIndex * 3 + 3)
    const placeholderCards = Array(3 - currentPosts.length)
        .fill(1)
        .map((v, i) => {
            return <div key={i} className={cn(styles.card, styles.placeholder)} />
        })

    function handleClickOnNew() {
        if (category === "new" || loading) return
        setCategory("new")
    }

    function handleClickOnPopular() {
        if (category === "popular" || loading) return
        setCategory("popular")
    }

    function handleSubmitOnSearch(e) {
        e.preventDefault()
        setSearchString(searchInput)
    }

    useEffect(() => {
        getPostsAndCount()
    }, [searchString, category])

    function handleClickOnPrevPage() {
        if (pageIndex === 0 || loading) return
        getPagePosts(-1)
    }

    function handleClickOnNextPage() {
        if (!nextPageActive || loading) return
        getPagePosts(1)
    }

    async function getPagePosts(pageValue) {
        setLoading(true)

        const searchQuery = searchString.length > 0 ? `search=${searchString.trim().replace(" ", "-")}&` : ""
        try {
            const res = await fetch(`/api/posts/?sortBy=${category}&${searchQuery}page=${pageIndex + pageValue}`)
            const newPosts = await res.json()

            setLoading(false)

            const allPosts = [...posts, ...newPosts]
            setPageIndex((prev) => prev + pageValue)
            setPosts(allPosts)
        } catch (err) {
            showError()
        }
    }

    async function getPostsAndCount() {
        setLoading(true)

        try {
            const searchQuery = searchString.length > 0 ? `search=${searchString.trim().replace(" ", "-")}&` : ""
            const res = await fetch(`/api/posts/?sortBy=${category}&${searchQuery}&count=true`)
            const newData = await res.json()
            const newPostList = newData.posts
            const newCount = newData.count

            setLoading(false)

            setPageIndex(0)
            setPosts(newPostList)
            setPostsCount(newCount)
        } catch (err) {
            showError()
        }
    }

    return (
        <div className={styles.posts}>
            <div className={styles.controls}>
                <div className={styles["tags-and-search"]}>
                    <button onClick={handleClickOnNew}>
                        <span className={cn({ [styles.active]: category === "new" })}>New</span>
                    </button>
                    <button onClick={handleClickOnPopular}>
                        <span className={cn({ [styles.active]: category === "popular" })}>Popular</span>
                    </button>
                    <form className={styles.search} onSubmit={handleSubmitOnSearch}>
                        <input type="text" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <div className={styles["search-icon"]}>
                            <Search />
                        </div>
                    </form>
                </div>
                <div className={styles["loading-and-page-controls"]}>
                    <div className={cn(styles["loading-posts"], { [styles["show-loading"]]: loading })} />
                    <button onClick={handleClickOnPrevPage}>
                        <span className={cn({ [styles.active]: pageIndex !== 0 })}>Prev</span>
                    </button>
                    <button onClick={handleClickOnNextPage}>
                        <span className={cn({ [styles.active]: nextPageActive })}>Next</span>
                    </button>
                </div>
            </div>
            {postsCount === 0 && <p className={styles["no-post-found"]}>No Post Was Found!</p>}
            {postsCount > 0 && (
                <div className={styles.cards}>
                    {currentPosts.map((post) => {
                        return (
                            <Link href="/" key={post._id}>
                                <a className={styles.card}>
                                    <div className={styles.thumbnail}>
                                        <img src={post.imageUrl} alt={post.title} />
                                    </div>
                                    <div className={styles.description}>
                                        <h1>{post.title}</h1>
                                    </div>
                                </a>
                            </Link>
                        )
                    })}
                    {placeholderCards && placeholderCards}
                </div>
            )}
        </div>
    )
}
