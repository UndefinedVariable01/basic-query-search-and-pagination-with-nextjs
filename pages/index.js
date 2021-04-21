import { useState } from "react"
import Head from "next/head"
import Header from "../component/Header"
import Error from "../component/Error"
import Posts from "../component/Posts"
import About from "../component/About"
import Discover from "../component/Discover"
import Footer from "../component/Footer"
import getInitialPosts from "../lib/getInitialPosts"

export default function Home({ data }) {
    const [error, setError] = useState(!data)

    return (
        <div className="home">
            <Head>
                <title>Query Blog</title>
            </Head>
            <Header />
            <main>
                {error && <Error />}
                {data && <Posts data={data} showError={() => setError(true)} />}
                <About />
                <Discover />
            </main>
            <Footer />
        </div>
    )
}

export async function getServerSideProps() {
    const data = await getInitialPosts()
    return {
        props: {
            data: JSON.parse(data),
        },
    }
}
