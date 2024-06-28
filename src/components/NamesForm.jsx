import styles from "../pages/Profile.module.css";

export function NamesForm({ FullName, email }) {
  return (
    <div className={styles.form}>
      <form>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <span id="fullName" className={styles.fullNameDisplay}>
            {FullName}
          </span>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <span id="email">{email}</span>
        </div>
      </form>
    </div>
  );
}
