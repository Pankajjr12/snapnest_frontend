import React, { useState } from "react";
import "./userbtn.css";
import Image from "../image/ImageComponent";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/useAuthStore";
import { Link, useNavigate } from "react-router";
import Settings from "../../pages/settings/Settings";
import { useTheme } from "../../utils/ThemeContext";

import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // ✅ State for settings modal
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useAuthStore();
  const { isDarkMode, themeColor } = useTheme();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="userButton">
      <Image
        path={currentUser.img || "/general/noAvatar.png"}
        alt="User Avatar"
      />
      <div onClick={() => setOpen((prev) => !prev)}>
        {isDarkMode ? (
          <IoIosArrowDropdown color="#fff" size={28} />
        ) : (
          <IoIosArrowDropdownCircle color="#000" size={28} />
        )}
      </div>
      {open && (
        <div
          className="userOptions"
          style={{
            "--user-options-bg": isDarkMode ? "#222" : "#fff",
            "--user-options-color": themeColor,
            "--user-options-hover-bg": isDarkMode ? "#333" : "#eaeaea",
          }}
        >
          <div className="userOption">
            <Link to={`/${currentUser.username}`}>Profile</Link>
          </div>
          <div className="userOption" onClick={() => setShowSettings(true)}>
            Settings
          </div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}

      {/* ✅ Render settings modal/component */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login
    </Link>
  );
};

export default UserButton;
