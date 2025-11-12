import React, { useState, useEffect } from "react";
import GalleryItem from "../galleryItem/GalleryItem";
import "./gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../spinner/Loader"; // your small loader

const fetchPins = async ({ pageParam, search, userId, boardId, type, category }) => {
  let endpoint = "/pins";
  if (type === "created") endpoint = `/pins?userId=${userId}`;
  else if (type === "saved") endpoint = `/pins/saved/${userId}`;

  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}${endpoint}?cursor=${pageParam}&search=${search || ""}&boardId=${boardId || ""}&category=${category || ""}`
  );
  return res.data;
};

const Gallery = ({ search, userId, boardId, type, category, onLoadingChange }) => {
  const [loadedImages, setLoadedImages] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["pins", search, userId, boardId, type, category],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId, type, category }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
  });

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  // Notify parent of loading state
  useEffect(() => {
    if (onLoadingChange) onLoadingChange(isLoading);
  }, [isLoading, onLoadingChange]);

  useEffect(() => {
    if (allPins.length > 0 && loadedImages >= allPins.length && !hasNextPage) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages, allPins.length, hasNextPage]);

  const handleImageLoad = () => setLoadedImages((prev) => prev + 1);

  if (isLoading) {
    // Don't render gallery at all until first page is loaded
    return null;
  }

  return (
    <>
      <InfiniteScroll
        dataLength={allPins.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loader />}
      >
        <div className="gallery">
          {allPins.map((item) => (
            <GalleryItem key={item._id} item={item} onLoad={handleImageLoad} />
          ))}
        </div>
      </InfiniteScroll>

      {!hasNextPage && allImagesLoaded && (
        <h3 style={{ textAlign: "center", marginTop: "1rem" }}>All Posts Loaded!</h3>
      )}
    </>
  );
};

export default Gallery;
