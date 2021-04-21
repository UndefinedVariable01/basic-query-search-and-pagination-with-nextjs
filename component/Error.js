import styles from "./Error.module.scss"

export default function Error() {
    return (
        <div className={styles.error}>
            <h1>Something Went Wrong!</h1>
            <p>Please Try to Refresh the Page</p>
        </div>
    )
}
