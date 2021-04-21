import Link from "next/link"
import styles from "./Discover.module.scss"
import GoToLink from "./icons/GoToLink"

export default function Discover() {
    return (
        <div className={styles.discover}>
            <div className={styles.frame}>
                <div className={styles.background}>
                    <div className={styles.image}>
                        <img src="discover-background.jpg" alt="Discover Background" />
                    </div>
                    <div className={styles.shadow} />
                    <h1>Best Way to Start Your Day</h1>
                </div>
                <div className={styles.secondary}>
                    <h2>Make Some Sweet Memories</h2>
                    <Link href="/">
                        <a>
                            What Else?{" "}
                            <span>
                                <GoToLink />
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
