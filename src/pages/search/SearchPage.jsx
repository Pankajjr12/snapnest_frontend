import React from "react";

import "./search.css";
import { useSearchParams } from "react-router";
import Gallery from "../../components/gallery/Gallery";

const SearchPage = () => {
  let [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const boardId = searchParams.get("boardId");

  return <Gallery search={search} boardId={boardId} />;
};

export default SearchPage;
