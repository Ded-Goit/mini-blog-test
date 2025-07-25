//app/page.tsx
import { Post } from "@/types/post";
import styles from "./page.module.css";
import Pagination from "@/components/Pagination";

export default async function Home() {
  // By default load ALL posts on server — just once
  const posts: Post[] = await fetch(
    `https://jsonplaceholder.typicode.com/posts`
  ).then((res) => res.json());

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mini Blog</h1>

      <Pagination posts={posts} />
    </div>
  );
}
