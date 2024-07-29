import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.contentContainer}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
