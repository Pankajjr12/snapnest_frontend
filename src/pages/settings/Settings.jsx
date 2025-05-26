import React from "react";
import { useTheme } from "../../utils/ThemeContext";
import "./settings.css";
import ReactDOM from 'react-dom';

const themeColors = ["#000000","#f1ecec", "#e74c3c", "#90D1CA", "#333446", "#f1c40f","#F38C79"];

const Settings = ({ onClose }) => {
  const { changeThemeColor } = useTheme();

  const handleBackdropClick = (e) => {
    if (e.target.className === "settingsModal") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="settingsModal" onClick={handleBackdropClick}>
      <div className="settingsContent" onClick={(e) => e.stopPropagation()}>
        <h3>Choose Theme Color</h3>
        <div className="colorOptions">
          {themeColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                changeThemeColor(color);
                onClose();
              }}
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                margin: "5px",
                border: "none",
              }}
            />
          ))}
        </div>
        <button className="closeBtn" onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default Settings;
