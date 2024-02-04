import styles from "./Profile.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";
import { SetProfilePic } from "../components/SetProfilePic";
import { Pass } from "../components/Pass";
import { NamesForm } from "../components/NamesForm";
import {
  PersonalInfon,
  Password,
  Notification,
  Language,
} from "./PersonalInfon";

export default function Profile() {
  const [FullName, setFullName] = useState("Ali Amin");
  const [selectedImage, setSelectedImage] = useState("./person.png");
  const [mainImage, setMainImage] = useState("./person.png");

  return (
    <>
      <div className={styles.profile}>
        <PageNav />
        <main>
          <section className={styles.rectangle}>
            <div className={styles.mainInfo}>
              <img src={mainImage} alt="Your name" className={styles.img}></img>
              <h2>{FullName}</h2>
              <Button type="continue">Share Profile</Button>
              <div className={styles.rectangle2}>
                <PersonalInfon />
                <Password />
                <Notification />
                <Language />
              </div>
            </div>
          </section>
        </main>
        <section className={styles.container}>
          <PersonalInfon />
          <div className={styles.rectangleComponent}>
            <SetProfilePic
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <NamesForm
              selectedImage={selectedImage}
              mainImage={mainImage}
              setSelectedImage={setSelectedImage}
              setMainImage={setMainImage}
              setFullName={setFullName}
            />
          </div>
        </section>
        <section className={styles.container}>
          <Password />
          <Pass />
        </section>
        <section className={styles.container}>
          <Notification />
          <div className={styles.rectangleComponent}>
            <div className={styles.notification}>
              <p>There are no notifications to show</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
