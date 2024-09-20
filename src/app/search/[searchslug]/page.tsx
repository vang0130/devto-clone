"use client";
import SearchPage from "../../searchpage/search";
import { api } from "src/trpc/react";

export default function Page({ params }: { params: { searchslug: string } }) {
  const {
    data: posts,
    isLoading,
    isError,
  } = api.post.searchPosts.useQuery({
    searchslug: params.searchslug,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return <SearchPage posts={posts ?? []} />;
}
