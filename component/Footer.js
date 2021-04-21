import styles from "./Footer.module.scss"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles["copy-right"]}>
                <p>Designed and Developed By UVA</p>
                <div className={styles.links}>
                    <a href="http://uva01.vercel.app">Profolio</a>
                </div>
            </div>
        </footer>
    )
}
