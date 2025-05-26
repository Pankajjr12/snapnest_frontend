import React from "react";
import "./board.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // Make sure you are using "react-router-dom" instead
import apiRequest from "../../utils/apiRequest";
import { format } from "timeago.js";
import Image from "../image/ImageComponent";

const Board = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return <div className="loading">Loading saved pins...</div>;

  if (error) return <div className="error">Error loading saved pins: {error.message}</div>;

  if (!data?.length) return <div className="empty">No saved boards found.</div>;

  return (
    <div className="collections">
      {data.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          {board.firstPin ? (
            <Image path={board.firstPin.media} alt="Board Cover" />
          ) : (
            <div className="default-image">No Image</div>
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
