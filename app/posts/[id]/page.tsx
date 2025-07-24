import { notFound } from "next/navigation";
import { Post } from "@/types/post";

interface Params {
  id: string;
}

interface PostPageProps {
  params: Params;
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());

  return posts.slice(0, 10).map((post) => ({
    id: String(post.id),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  if (!res.ok) return notFound();

  const post: Post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
