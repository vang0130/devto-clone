"use client";
import PostPage from "../../postpage/post";
import { api } from "src/trpc/react";

export default function Page({ params }: { params: { postslug: string } }) {
  const postId = Number(params.postslug);
  const { data: post } = api.post.getPost.useQuery({ id: postId });
  if (!post) {
    return <div>Loading...</div>;
  }
  return <PostPage post={post} />;
}
