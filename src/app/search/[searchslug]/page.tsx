"use client";
import SearchPage from "../../searchpage/search";
// import { api } from "src/trpc/react";

export default function Page({ params }: { params: { searchslug: string } }) {
  return <SearchPage searchslug={params.searchslug} />;
}
