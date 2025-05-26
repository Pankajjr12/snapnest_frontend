import React, { useState } from "react";
import "./galleryitem.css";
import Image from "../image/ImageComponent";
import { Link } from "react-router";

const GalleryItem = ({ item, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const maxHeight = 800; // you can adjust this value
  const optimizedHeight = Math.min((372 * item.height) / item.width, maxHeight);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {isLoading && (
        <div className="spinnerContainer">
          <div className="spinner" />
        </div>
      )}
      <Image
        path={item.media}
        alt=""
        w={372}
        h={optimizedHeight}
        onLoad={handleLoad}
        className={`galleryImage ${isLoading ? "hidden" : ""}`}
      />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Image path="/general/share.svg" alt="" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
