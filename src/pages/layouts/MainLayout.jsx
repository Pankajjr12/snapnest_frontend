import React from "react";
import TopBar from "../../components/topBar/TopBar";
import  { Outlet } from 'react-router'
import LeftBar from "../../components/leftBar/LeftBar";

const MainLayout = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
