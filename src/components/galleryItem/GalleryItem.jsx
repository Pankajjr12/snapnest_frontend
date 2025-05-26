import React, { useState } from "react";
import "./galleryitem.css";
import Image from "../image/ImageComponent";
import { Link } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });
  return res.data;
};

const GalleryItem = ({ item, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const maxHeight = 800;
  const optimizedHeight = Math.min((372 * item.height) / item.width, maxHeight);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const interactionQuery = useQuery({
    queryKey: ["interactionCheck", item._id],
    queryFn: () =>
      apiRequest.get(`/pins/interaction-check/${item._id}`).then((res) => res.data),
  });

  const saveMutation = useMutation({
    mutationFn: () => interact(item._id, "save"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", item._id] });
    },
  });

  if (interactionQuery.isPending || interactionQuery.isError) return null;

  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {isLoading && (
        <div className="spinnerContainer">
          <div className="spinner" />
        </div>
      )}
      <Image
        path={item.media}
        alt=""
        w={372}
        h={optimizedHeight}
        onLoad={handleLoad}
        className={`galleryImage ${isLoading ? "hidden" : ""}`}
      />
      <Link to={`/pin/${item._id}`} className="overlay" />

      <button
        className="saveButton"
        disabled={saveMutation.isPending}
        onClick={() => saveMutation.mutate()}
      >
        {interactionQuery.data.isSaved ? "Saved" : "Save"}
      </button>

      <div className="overlayIcons">
        {/* <button>
          <Image path="/general/share.svg" alt="Share" />
        </button>
        <button>
          <Image path="/general/more.svg" alt="More" />
        </button> */}
      </div>
    </div>
  );
};

export default GalleryItem;
