import styles from "./about.module.css";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.text}>
          This is a simple mini blog built with Next.js App Router and
          TypeScript. Clean, responsive and modern.
        </p>
        <Link href="/" className={styles.backButton}>
          Home
        </Link>
      </div>
    </>
  );
}
