import React, { useState } from "react";
import "./profile.css";

import apiRequest from "../../utils/apiRequest";

import Gallery from "../../components/gallery/Gallery";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Image from "../../components/image/ImageComponent";
import FollowButton from "./FollowButton";
import Board from "../../components/boards/Board";
import useAuthStore from "../../utils/useAuthStore";

const ProfilePage = () => {
  const [type, setType] = useState("saved");

  const { username } = useParams();
  const currentUser = useAuthStore((state) => state.currentUser); // Get the current user from the store

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "User not found!";

  // Check if the current user is viewing their own profile
  const isCurrentUser = currentUser?.username === data.username;

  return (
    <>
      <div className="profilePage">
        <div className="group relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[3px] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="w-full h-full rounded-full bg-white p-[3px]">
            <Image
              className="rounded-full w-full h-full object-cover"
              w={100}
              h={100}
              path={data.img || "/general/noAvatar.png"}
              alt="Profile"
            />
          </div>

          {/* Optional glowing effect */}
          <div className="absolute inset-0 rounded-full animate-pulse opacity-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-xl z-[-1]"></div>
        </div>
        <h1 className="profileName">{data.displayName}</h1>
        <span className="profileUsername">@{data.username}</span>
        <div className="followCounts">
          {data.followerCount} followers · {data.followingCount} followings
        </div>
        <div className="profileInteractions">
          <Image path="/general/share.svg" alt="" />
          <div className="profileButtons">
            <button>Message</button>
            {!isCurrentUser && (
              <FollowButton
                isFollowing={data.isFollowing}
                username={data.username}
              />
            )}
          </div>
          <Image path="/general/more.svg" alt="" />
        </div>
        <div className="profileOptions">
          <span
            onClick={() => setType("created")}
            className={type === "created" ? "active" : ""}
          >
            Created
          </span>
          <span
            onClick={() => setType("saved")}
            className={type === "saved" ? "active" : ""}
          >
            Saved
          </span>
        </div>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Board userId={data._id} />
      )}
    </>
  );
};

export default ProfilePage;
