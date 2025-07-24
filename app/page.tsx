import Link from "next/link";
import { Post } from "@/types/post";
import styles from "./page.module.css";

export default async function HomePage() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mini Blog</h1>
      <ul className={styles.postsList}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link href={`/posts/${post.id}`} className={styles.postLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
