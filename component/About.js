import Link from "next/link"
import styles from "./About.module.scss"

export default function About() {
    return (
        <div className={styles.about}>
            <div className={styles.images}>
                <div>
                    <img src="first-about-image.jpg" alt="First About Image" />
                </div>
                <div>
                    <img src="second-about-image.jpg" alt="Second About Image" />
                </div>
            </div>
            <div className={styles.description}>
                <h1>Taste of Happiness</h1>
                <p className={styles["main-description"]}>
                    Nam Eget Gravida Urna Tempor Elit Nulla Varius Lorem Augue Dolor Ornare Malesuada Nullam Quam Ex, Molestie Vitae Libero
                    Nec Finibus Laoreet Orci
                </p>
                <p className={styles["secondary-description"]}>
                    Aliquam pretium ligula semper. Suspendisse nulla est, vestibulum vitae ut, placerat euismod nisi. Sed consequat mattis
                    vestibulum. Proin efficitur vitae mattis.
                </p>
                <Link href="/">
                    <a className={styles["show-more"]}>
                        Show More <span />
                    </a>
                </Link>
            </div>
        </div>
    )
}
