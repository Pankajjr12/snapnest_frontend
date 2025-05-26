import React, { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router";
import Image from "../../components/image/ImageComponent";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/useAuthStore";
import { Snackbar, Alert } from "@mui/material"; // Import Material-UI Snackbar and Alert
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Import the + icon

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to handle snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to store snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("error"); // State to control snackbar severity (success, error, info, warning)
  const [profilePic, setProfilePic] = useState(null); // State to store the uploaded image

  const navigate = useNavigate();

  const { setCurrentUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    const form = e.target;
  
    // Always present
    formData.append("email", form.email.value);
    formData.append("password", form.password.value);
  
    // Only for registration
    if (isRegister) {
      formData.append("username", form.username.value);
      formData.append("displayName", form.displayName.value);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }
    }
  
    try {
      const res = await apiRequest.post(
        `/users/auth/${isRegister ? "register" : "login"}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (res && res.data) {
        setCurrentUser(res.data);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSnackbarMessage(err.response?.data?.message || "Something went wrong");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };
  
  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close snackbar when clicked away
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" w={36} h={36} alt="" />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>

        {/* Profile Image */}

        {isRegister ? (
          <form key="register" onSubmit={handleSubmit}>
            <div className="profilePicContainer">
              <input
                type="file"
                id="profilePicInput"
                name="profilePic"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
              />
              <label htmlFor="profilePicInput">
                <div className="profilePic">
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile"
                      className="profileImage"
                    />
                  ) : (
                    <IconButton
                      component="span"
                      sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "50%",
                        padding: "10px",
                      }}
                    >
                      <AddCircleIcon
                        sx={{ fontSize: "36px", color: "#757575" }}
                      />
                    </IconButton>
                  )}
                </div>
              </label>
            </div>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
                id="username"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="displayName"
                id="displayName"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsRegister(false)}>
              Do you have an account? <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="loginForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              Don&apos;t have an account? <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>

      {/* Snackbar Component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AuthPage;
