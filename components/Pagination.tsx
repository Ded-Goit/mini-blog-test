"use client";

import Link from "next/link";
import { Post } from "@/types/post";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./Pagination.module.css";

interface PaginationProps {
  posts: Post[];
  limit?: number;
}

export default function Pagination({ posts, limit = 10 }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const start = (page - 1) * limit;
  const currentPosts = posts.slice(start, start + limit);

  const totalPages = Math.ceil(posts.length / limit);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className={styles.paginationBlock}>
        {hasPrev && (
          <button
            onClick={() => goToPage(page - 1)}
            className={styles.pageLink}
          >
            ← Previous
          </button>
        )}

        <div className={styles.pageNumbers}>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`${styles.pageNumber} ${
                p === page ? styles.activePage : ""
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {hasNext && (
          <button
            onClick={() => goToPage(page + 1)}
            className={styles.pageLink}
          >
            Next →
          </button>
        )}
      </div>

      <ul className={styles.postsList}>
        {currentPosts.map((post) => (
          <li key={post.id} className={styles.postItem}>
            <Link href={`/posts/${post.id}`} className={styles.postLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
