import React from 'react'
import UserButtton from '../userBtn/UserButtton'
import './topbar.css'
import Image from '../image/ImageComponent'
import { useNavigate } from 'react-router'

  const TopBar = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
  
      navigate(`/search?search=${e.target[0].value}`);
    };
  return (
    <div className="topBar">
    {/* SEARCH */}
    <form onSubmit={handleSubmit} className="search">
      <Image path="/general/search.svg" alt="" />
      <input type="text" placeholder="Search" />
    </form>
    {/* USER */}
    <UserButtton />
  </div>
  )
}


export default TopBar;
