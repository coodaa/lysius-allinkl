import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [plays, setPlays] = useState([]);

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
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">LYSIUS</Link>
      </div>
      <div className={styles.menuButton} onClick={toggleMenu}>
        {menuOpen ? "CLOSE" : "MENU"}
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          {plays.map((play) => (
            <li key={play.id} onClick={handleLinkClick}>
              <Link href={`/plays/${play.id}`} className={styles.link}>
                {play.title}
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
            <Link href="/mitglieder" className={styles.link}>
              MITGLIEDER
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/agb" className={styles.link}>
              AGB
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/impressum" className={styles.link}>
              IMPRESSUM
            </Link>
          </li>
          <li onClick={handleLinkClick}>
            <Link href="/impressum" className={styles.link}>
              DE/EN
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
