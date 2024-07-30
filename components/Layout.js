// src/components/Layout.js
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const [currentTitle, setCurrentTitle] = useState("LYSIUS");
  const [plays, setPlays] = useState([]);

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
    React.cloneElement(child, { setCurrentTitle })
  );

  return (
    <div className={styles.pageContainer}>
      <Navbar currentTitle={currentTitle} plays={plays} />
      <main className={styles.contentContainer}>{childrenWithProps}</main>
    </div>
  );
};

export default Layout;
