import React, { useState } from "react";
import "./scroll.css";


// const categories = [
//   { name: "All", image: "/general/all.webp" },
//   { name: "Nature", image: "/general/nature.webp" },
//   { name: "Animals", image:  "/general/animal.webp" },
//   {
//     name: "Art & Culture",
//     image: "/general/art.jpg",
//   },
//   {
//     name: "Games",
//     image:  "/general/games.webp",
//   },
//   {
//     name: "Tech",
//     image: "/general/tech.webp", 
//   },
//   { name: "Food", image: "/general/food.webp"},
//   { name: "Sports", image: "/general/sports.webp"},
//   { name: "Glamour", image: "/general/glam.webp" },
// ];

const ScrollTabs = ({ onCategorySelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    { name: "All", image: "/general/all.webp" },
    { name: "Nature", image: "/general/nature.webp" },
    { name: "Animals", image: "/general/animal.webp" },
    { name: "Art & Culture", image: "/general/art.jpg" },
    { name: "Games", image: "/general/games.webp" },
    { name: "Technology", image: "/general/tech.webp" },
    { name: "Food", image: "/general/food.webp" },
    { name: "Sports", image: "/general/sports.webp" },
    { name: "Glamour", image: "/general/glam.webp" },
  ];

  return (
    <div className="scroll-tabs-wrapper">
      {categories.map((cat, idx) => {
        const isHovered = hoveredIndex === idx;
        const style = isHovered
          ? {
              backgroundImage: `url(${cat.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              textShadow: "0 1px 2px rgba(0,0,0,0.6)",
            }
          : {};

        return (
          <button
            key={idx}
            className="scroll-tab"
            style={style}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onCategorySelect(cat.name)} // 👈 This line is key
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default ScrollTabs;

