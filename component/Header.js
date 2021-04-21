import { useState } from "react"
import Link from "next/link"
import cn from "classnames"
import styles from "./Header.module.scss"
import Menu from "./icons/Menu"
import GoToLink from "./icons/GoToLink"

export default function Header() {
    const [menuStatus, setMenuStatus] = useState(null)

    return (
        <header>
            <div className={styles["header-background"]}>
                <img src="/header-background.jpg" alt="Header Background Image" />
            </div>
            <div className={styles.navbar}>
                <div
                    className={cn(styles.links, {
                        [styles["open-menu"]]: menuStatus === "open",
                        [styles["close-menu"]]: menuStatus === "close",
                    })}
                >
                    <nav>
                        <div className={styles.indicator} />
                        <ul>
                            <li>
                                <Link href="/">
                                    <a className={styles.active}>Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a>Shop</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a>Contact</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <a>Team</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.auth}>
                        <Link href="/">
                            <a>Sign Up</a>
                        </Link>
                        <div className={styles.separator} />
                        <Link href="/">
                            <a>Sign In</a>
                        </Link>
                    </div>
                </div>
                <div
                    className={styles.menu}
                    onClick={() => {
                        if (menuStatus === "open") setMenuStatus("close")
                        else setMenuStatus("open")
                    }}
                >
                    <Menu />
                </div>
            </div>
            <div className={styles.intro}>
                <h1 className={styles.title}>
                    A New, Different, <br />
                    Experience
                </h1>
                <div className={styles["secondary-part"]}>
                    <div className={styles.cookies}>
                        <img src="/cookies.jpg" alt="Cookies" />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.text}>
                            <p>
                                He went back to the video to see what had been recorded and was shocked at what he saw, Happiness can be
                                found in the depths of chocolate pudding.
                            </p>
                        </div>
                        <div className={styles.actions}>
                            <Link href="/">
                                <a className={styles.button}>What's New?</a>
                            </Link>
                            <Link href="/">
                                <a className={styles.start}>
                                    Get Started <GoToLink />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
