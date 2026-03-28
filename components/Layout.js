import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import Landscape from "./LandscapeWarning";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const [currentTitle, setCurrentTitle] = useState("LYSIUS");
  const [plays, setPlays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlays = async () => {
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
    fetchPlays();
  }, []);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { setCurrentTitle, setIsModalOpen })
      : child
  );

  return (
    <div className={styles.pageContainer}>
      <ScrollToTop />
      {/* <Landscape /> */}
      <Navbar
        currentTitle={currentTitle}
        plays={plays}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
      <div className={styles.rightSidebar}></div>
      <main className={styles.contentContainer}>{childrenWithProps}</main>
    </div>
  );
};

export default Layout;
