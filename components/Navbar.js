import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plays, setPlays] = useState([]);
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    console.log("Router:", router);
    console.log("i18n:", i18n);
  }, [router, i18n]);

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
    console.log("Switching to language:", lang);
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

  useEffect(() => {
    console.log("Current locale:", i18n.language);
    const fetchData = async () => {
      try {
        const res = await fetch("/api/plays");
        if (res.ok) {
          const data = await res.json();
          setPlays(data || []);
        } else {
          console.error("Failed to fetch plays:", res.status);
        }
      } catch (error) {
        console.error("Error fetching plays:", error);
      }
    };
    fetchData();
  }, [i18n.language]);

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a>LYSIUS</a>
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
            <Link href="/mitglieder" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/mitglieder" ? styles.active : ""
                }`}
              >
                {t("members")}
              </a>
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/agb" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/agb" ? styles.active : ""
                }`}
              >
                {t("terms")}
              </a>
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/impressum" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/impressum" ? styles.active : ""
                }`}
              >
                {t("impressum")}
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
