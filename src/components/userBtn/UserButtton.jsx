import React, { useState } from "react";
import "./userbtn.css";
 // Ensure correct import for react-router-dom
import Image from "../image/ImageComponent";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/useAuthStore";
import { Link, useNavigate } from "react-router";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, removeCurrentUser } = useAuthStore();

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
      <Image path={currentUser.img || "/general/noAvatar.png"} alt="User Avatar" />
      <div onClick={() => setOpen((prev) => !prev)}>
        <Image path="/general/arrow.svg" alt="Arrow" className="arrow" />
      </div>
      {open && (
        <div className="userOptions">
          <Link to={`/${currentUser.username}`} className="userOption">
            Profile
          </Link>
          <div className="userOption">Settings</div>
          <div className="userOption" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="loginLink">
      Login / Sign Up
    </Link>
  );
};

export default UserButton;
