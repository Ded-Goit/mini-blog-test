import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/Ded-Goit"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          creative studio DED production
        </a>
      </p>
    </footer>
  );
}
