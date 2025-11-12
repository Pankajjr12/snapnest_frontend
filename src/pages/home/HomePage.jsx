import React, { useState } from "react";
import Gallery from "../../components/gallery/Gallery";
import ScrollTabs from "../../components/scroll/ScrollTabs";
import Loader from "../../components/spinner/Loader"; // You can reuse your loader or make a bigger one
import "./home.css"; // Add optional CSS for full-page spinner

const HomePage = ({ userId }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);

  return (
    <>
      <ScrollTabs userId={userId} onCategorySelect={setSelectedCategory} />

      {isGalleryLoading && (
        <div className="fullpage-loader">
          <Loader size="large" /> {/* You can customize your loader component */}
        </div>
      )}

      <Gallery
        userId={userId}
        category={selectedCategory}
        onLoadingChange={setIsGalleryLoading}
      />
    </>
  );
};

export default HomePage;
