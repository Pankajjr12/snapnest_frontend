// components/snackbar/CustomSnackbar.js
import React from "react";
import { Snackbar, Alert } from "@mui/material";
import logo from "../../assets/logo.png"; // Adjust path to your logo

const CustomSnacker = ({ open, onClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity="warning"
        sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}
      >
        <img src={logo} alt="logo" style={{ height: 20 }} />
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnacker;
