import React, { useState } from "react";
import Gallery from "../../components/gallery/Gallery";
import ScrollTabs from "../../components/scroll/ScrollTabs";

const HomePage= ({ userId }) => {
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  return (
    <>
      <ScrollTabs userId={userId} onBoardSelect={setSelectedBoardId} />
      <Gallery boardId={selectedBoardId} />
    </>
  );
};

export default HomePage;
