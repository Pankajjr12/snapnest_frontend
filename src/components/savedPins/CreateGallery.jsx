// components/gallery/CreatedGallery.jsx
import React, { useState } from "react";
import GalleryItem from "../galleryItem/GalleryItem";
import "../gallery/gallery.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../spinner/Loader";

const CreatedGallery = ({ userId }) => {
  const [loadedImages, setLoadedImages] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["createdPins", userId],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/pins?userId=${userId}`
      );
      return res.data;
    },
  });

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="error">Failed to load created pins</div>;
  if (!data?.pins?.length) return <div className="empty">No created pins found.</div>;

  return (
    <div className="gallery">
      {data.pins.map((item) => (
        <GalleryItem key={item._id} item={item} onLoad={handleImageLoad} />
      ))}
    </div>
  );
};

export default CreatedGallery;
