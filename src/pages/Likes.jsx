import styles from "./Likes.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import CustomSlider from "./CustomSlider";

export default function Likes() {
  return (
    <>
      <main className={styles.likes}>
        <PageNav />
        <CustomSlider title="My favorite" />
      </main>
      <Footer />
    </>
  );
}
