import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import styles from "./Search.module.css";
import React from  "react";
export default function Search({onClick}) {
  const { searchQuery, setSearchQuery } = useState("Explore");
  return (
    <div className={styles.searchContainer} onClick={onClick}>
      <RiSearchLine className={styles.searchIcon} />
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Explore"
        className={styles.searchInput}
      />
    </div>
  );
}
