import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from "../styles/Navbar.module.css";
import { playSlug } from "../lib/slugify";

const Navbar = ({ currentTitle, plays = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (titleRef.current) {
        setIsTextOverflowing(
          titleRef.current.scrollWidth > titleRef.current.clientWidth
        );
      }
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const switchLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang });
    setMenuOpen(false);
  };

  const getDisplayTitle = () => {
    if (router.pathname.startsWith("/plays/")) {
      if (typeof window !== "undefined" && window.innerWidth <= 767) {
        return currentTitle.split(" - ")[0];
      }
      return currentTitle;
    } else if (router.pathname === "/about") {
      return t("about");
    } else if (router.pathname === "/legal") {
      return t("legal");
    } else if (router.pathname === "/terms") {
      return t("terms");
    } else {
      return "LYSIUS";
    }
  };

  const displayTitle = getDisplayTitle();

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <span
          ref={titleRef}
          className={`${styles.title} ${
            isTextOverflowing ? styles.overflow : ""
          }`}
          title={isTextOverflowing ? displayTitle : ""}
        >
          {displayTitle}
        </span>
      </div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        {menuOpen ? t("close") : t("menu")}
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          {Array.isArray(plays) &&
            plays.map((play) => {
              const playTitle =
                i18n.language === "en"
                  ? play.title_en || play.title
                  : play.title;

              return (
                <li key={play.id} onClick={handleLinkClick}>
                  <span
                    className={`${styles.link} ${
                      router.asPath.startsWith(`/plays/${play.id}-`)
                        ? styles.active
                        : ""
                    }`}
                    onClick={() =>
                      router.push(`/plays/${playSlug(play)}`).then(() => {
                        if (typeof window !== "undefined") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      })
                    }
                  >
                    {playTitle}
                  </span>
                </li>
              );
            })}
        </ul>
        <ul
          className={`${styles.footerList} ${
            menuOpen ? styles.footerOpen : ""
          }`}
        >
          <li className={styles.footerItem} onClick={handleLinkClick}>
            <Link href="/" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/" ? styles.active : ""
                }`}
              >
                Lysius
              </a>
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/about" legacyBehavior>
              <a
                className={`${styles.link} ${
                  router.pathname === "/about" ? styles.active : ""
                }`}
              >
                {t("about")}
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
