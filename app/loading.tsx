"use client";

import { PropagateLoader } from "react-spinners";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loaderWrapper}>
      <PropagateLoader color="#0070f3" size={15} />
    </div>
  );
}
