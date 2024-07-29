import styles from "../styles/404.module.css";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.errorContainer}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Die Seite exisitert leider nicht</p>
        <Link legacyBehavior href="/">
          <a className={styles.homeLink}>zur Startseite</a>
        </Link>
      </div>
    </div>
  );
}
