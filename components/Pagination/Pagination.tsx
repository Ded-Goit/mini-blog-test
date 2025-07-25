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

  const totalPages = Math.ceil(posts.length / limit);
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  // === Smart range logic ===
  const pages: (number | string)[] = [];
  pages.push(1);

  if (page > 3) {
    pages.push("...");
  }

  if (page > 2 && page < totalPages - 1) {
    pages.push(page - 1);
    pages.push(page);
    pages.push(page + 1);
  } else if (page === 2) {
    pages.push(2);
    pages.push(3);
  } else if (page === totalPages - 1) {
    pages.push(totalPages - 2);
    pages.push(totalPages - 1);
  }

  if (page < totalPages - 2) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

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
          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <button
                key={idx}
                onClick={() => goToPage(p)}
                className={`${styles.pageNumber} ${
                  p === page ? styles.activePage : ""
                }`}
              >
                {p}
              </button>
            ) : (
              <span key={idx} className={styles.dots}>
                {p}
              </span>
            )
          )}
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
        {posts.slice((page - 1) * limit, page * limit).map((post) => (
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
