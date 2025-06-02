import React, { useState } from "react";
import Gallery from "../../components/gallery/Gallery";
import ScrollTabs from "../../components/scroll/ScrollTabs";

const HomePage = ({ userId }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <ScrollTabs userId={userId} onCategorySelect={setSelectedCategory} />
      <Gallery userId={userId} category={selectedCategory} />
    </>
  );
};

export default HomePage;
