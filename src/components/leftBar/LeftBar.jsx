import React, { useState, useRef, useEffect } from "react";
import "./leftbar.css";


import Image from "../image/ImageComponent";
import useAuthStore from "../../utils/useAuthStore";
import apiRequest from "../../utils/apiRequest";
import { AiFillHome } from "react-icons/ai";
import { AccountCircle } from "@mui/icons-material"; 
import { AiOutlineHome } from "react-icons/ai";
import { FaSquarePlus } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import Settings from "../../pages/settings/Settings";  // Import Settings modal
import { useTheme } from "../../utils/ThemeContext";

const LeftBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);  // modal state
  const dropdownRef = useRef(null);
  const { currentUser, removeCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      setDropdownOpen(false);
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" className="menuIcon">
          <Image path="/general/logo.png" alt="" className="logo" />
        </Link>
        <Link to="/" className="menuIcon">
        {isDarkMode ? <AiOutlineHome color="#fff" size={24} /> : <AiFillHome color="#000" size={24} />}
        </Link>
        <Link to="/create" className="menuIcon">
        {isDarkMode ? <FaRegSquarePlus color="#fff" size={24} /> : <FaSquarePlus color="#000" size={24} />}
        </Link>
      </div>

      {/* Profile click dropdown */}
      <div className="mobileProfileDropdown" ref={dropdownRef}>
        {currentUser && (
          <div className="profileHoverArea" onClick={toggleDropdown}>
            {currentUser.img ? (
              <Image
                path={`${currentUser.img}`} 
                alt="Profile"
                className="profileImage"
              />
            ) : (
              <AccountCircle style={{ fontSize: 40, color: "#888" }} />
            )}
          </div>
        )}

        {dropdownOpen && (
          <div className="hoverComboMenu">
            <Link
              to={`/${currentUser.username}`}
              className="dropdownItem"
              onClick={handleDropdownItemClick}
            >
              Profile
            </Link>

            {/* Change from Link to div so clicking opens modal instead of navigation */}
            <div
              className="dropdownItem"
              onClick={() => {
                setShowSettings(true);
                setDropdownOpen(false); // close dropdown
              }}
            >
              Settings
            </div>

            <button className="dropdownItem" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Render Settings modal if open */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default LeftBar;
