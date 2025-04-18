import React, { useState, useRef, useEffect } from "react";
import "./leftbar.css";

import Image from "../image/ImageComponent";
import useAuthStore from "../../utils/useAuthStore";
import apiRequest from "../../utils/apiRequest";
import { AccountCircle } from "@mui/icons-material"; // Material UI icon for dummy image
import { Link, useNavigate } from "react-router";

const LeftBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, removeCurrentUser } = useAuthStore();
  const navigate = useNavigate(); // Adding navigate for programmatic navigation

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
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
          <Image path="/general/home.svg" alt="" />
        </Link>
        <Link to="/create" className="menuIcon">
          <Image path="/general/create.svg" alt="" />
        </Link>
      </div>

      {/* Profile click dropdown (mobile-friendly) */}
      <div className="mobileProfileDropdown" ref={dropdownRef}>
        {currentUser && (
          <div className="profileHoverArea" onClick={toggleDropdown}>
            {currentUser.img ? (
              <Image
                path={`/uploads/${currentUser.img}`} // Use the actual profile image path
                alt="Profile"
                className="profileImage"
              />
            ) : (
              // Fallback to Material UI AccountCircle icon if no profile picture is available
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
            <Link
              to="/settings"
              className="dropdownItem"
              onClick={handleDropdownItemClick}
            >
              Settings
            </Link>
            <button className="dropdownItem" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftBar;
