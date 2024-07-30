import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import { appWithTranslation } from "next-i18next";

const Layout = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.contentContainer}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default appWithTranslation(Layout);
