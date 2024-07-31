import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ currentTitle, plays }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (e) => {
    if (
      !e.target.closest(`.${styles.nav}`) &&
      !e.target.closest(`.${styles.menuButton}`)
    ) {
      setMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const switchLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", closeMenu);
    } else {
      document.removeEventListener("mousedown", closeMenu);
    }
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [menuOpen]);

  const displayTitle = router.pathname.startsWith("/plays/")
    ? currentTitle
    : "LYSIUS";

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a className={styles.titleLink}>
            <span className={styles.title}>{displayTitle}</span>
            <span className={styles.hoverTitle}>LYSIUS</span>
          </a>
        </Link>
      </div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        {menuOpen ? t("close") : t("menu")}
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          {plays.map((play) => (
            <li key={play.id} onClick={handleLinkClick}>
              <Link href={`/plays/${play.id}`} legacyBehavior>
                <a
                  className={`${styles.link} ${
                    router.pathname === `/plays/${play.id}` ? styles.active : ""
                  }`}
                >
                  {play.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className={`${styles.footerList} ${
            menuOpen ? styles.footerOpen : ""
          }`}
        >
          <li className={styles.footerItem} onClick={handleLinkClick}>
            <Link href="/members" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/members" ? styles.active : ""
                }`}
              >
                {t("members")}
              </a>
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/terms" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/terms" ? styles.active : ""
                }`}
              >
                {t("terms")}
              </a>
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/legal" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/legal" ? styles.active : ""
                }`}
              >
                {t("legal")}
              </a>
            </Link>
          </li>
          <li className={styles.languageSwitch}>
            <span
              onClick={() => switchLanguage("de")}
              className={`${styles.languageLink} ${
                i18n.language === "de" ? styles.active : ""
              }`}
            >
              DE
            </span>
            /
            <span
              onClick={() => switchLanguage("en")}
              className={`${styles.languageLink} ${
                i18n.language === "en" ? styles.active : ""
              }`}
            >
              EN
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
