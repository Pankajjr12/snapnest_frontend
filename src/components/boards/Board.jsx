import React from "react";
import "./board.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import apiRequest from "../../utils/apiRequest";
import { format } from 'timeago.js';
import Image from "../image/ImageComponent";

const Board = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div className="collections">
      {/* COLLECTION */}
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          {/* Check if firstPin exists before accessing 'media' */}
          {board.firstPin ? (
            <Image path={board.firstPin.media} alt="" />
          ) : (
            <div className="default-image">No Image</div> // Display a default message or image if no firstPin exists
          )}
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} Pins · {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Board;
