import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <Link href="/mitglieder" className={styles.link}>
          MITGLIEDER
        </Link>
        <Link href="/agb" className={styles.link}>
          AGB
        </Link>
        <Link href="/impressum" className={styles.link}>
          IMPRESSUM
        </Link>
        <Link
          href="/de-en"
          className={`${styles.link} ${
            currentPath === "/de-en" ? styles.active : ""
          }`}
        >
          DE/EN
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
