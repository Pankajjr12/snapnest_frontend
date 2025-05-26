import React, { useState } from "react";
import GalleryItem from "../galleryItem/GalleryItem";
import "./gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "../skelton/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../spinner/Loader";

const fetchPins = async ({ pageParam, search, userId, boardId, type }) => {
  let endpoint = "/pins";
  if (type === "created") endpoint = `/pins/user/${userId}`;
  else if (type === "saved") endpoint = `/pins/saved/${userId}`;

  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}${endpoint}?cursor=${pageParam}&search=${search || ""}&boardId=${boardId || ""}`
  );
  return res.data;
};

const Gallery = ({ search, userId, boardId, type }) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins", search, userId, boardId, type],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId, type }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={loadedImages < allPins.length ? <Loader /> : null}
      endMessage={<h3>All Posts Loaded!</h3>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} onLoad={handleImageLoad} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
