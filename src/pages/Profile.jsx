import styles from "./Profile.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { SetProfilePic } from "../components/SetProfilePic";
import { Pass } from "../components/Pass";
import { NamesForm } from "../components/NamesForm";
import {
  PersonalInfon,
  Password,
  Notification,
  Language,
} from "./PersonalInfon";
import { useProfile } from "../contexts/ProfileContext";

export default function Profile() {
  const {
    fullName,
    email,
    profilePicture,
    setFullName,
    setEmail,
    setProfilePicture,
  } = useProfile();

  return (
    <>
      <div className={styles.profile}>
        <PageNav />
        <main>
          <section className={styles.rectangle}>
            <div className={styles.mainInfo}>
              <img
                src={profilePicture}
                alt="Your name"
                className={styles.img}
              ></img>
              <h2>{fullName}</h2>
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
              selectedImage={profilePicture}
              setSelectedImage={setProfilePicture}
            />
            <NamesForm
              selectedImage={profilePicture}
              mainImage={profilePicture}
              setSelectedImage={setProfilePicture}
              setMainImage={setProfilePicture}
              setFullName={setFullName}
              FullName={fullName}
            />
          </div>
        </section>
        <section className={styles.container}>
          <Password />
          <Pass
            email={email}
            setEmail={setEmail}
            oldPass={""}
            setOldPass={() => {}}
          />
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
