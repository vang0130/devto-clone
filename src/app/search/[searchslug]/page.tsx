"use client";
import SearchPage from "../../searchpage/search";

export default function Page({ params }: { params: { searchslug: string } }) {
  return <SearchPage searchslug={params.searchslug} />;
}
