// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("themeColor") || "#ffffff"
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeThemeColor = (color) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  };

  const isDarkColor = (hex) => {
    if (!hex || hex.length !== 7 || !hex.startsWith("#")) return false;
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  useEffect(() => {
    document.body.style.backgroundColor = themeColor;
    document.body.style.color = isDarkColor(themeColor) ? "#ffffff" : "#000000";
    setIsDarkMode(isDarkColor(themeColor));
  }, [themeColor]);

  return (
    <ThemeContext.Provider value={{ themeColor, changeThemeColor, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
