import React, { useState } from "react";
import "./scroll.css";


const categories = [
  { name: "All", image: "/general/all.webp" },
  { name: "Nature", image: "/general/nature.webp" },
  { name: "Animals", image:  "/general/animal.webp" },
  {
    name: "Art & Culture",
    image: "/general/art.jpg",
  },
  {
    name: "Games",
    image:  "/general/games.webp",
  },
  {
    name: "Tech",
    image: "/general/tech.webp", 
  },
  { name: "Food", image: "/general/food.webp"},
  { name: "Sports", image: "/general/sports.webp"},
  { name: "Glamour", image: "/general/glam.webp" },
];

const ScrollableTabs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="scroll-tabs-wrapper">
      {categories.map((cat, idx) => {
        const isHovered = hoveredIndex === idx;

        const style =
          isHovered && cat.image
            ? {
                backgroundImage: `url(${cat.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                border: "none",
              }
            : {};

        return (
          <button
            key={idx}
            className="scroll-tab"
            style={style}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default ScrollableTabs;
