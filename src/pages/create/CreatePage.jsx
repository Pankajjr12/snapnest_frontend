import React, { useEffect, useRef, useState } from "react";
import "./createPage.css";
import { useNavigate } from "react-router";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/useAuthStore";
import Editor from "../../components/editor/Editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import useEditorStore from "../../utils/editorStore";
import IKImage from "../../components/image/ImageComponent";
import BoardForm from "./BoardForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Add Post Mutation function
const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const formRef = useRef();
  const { textOptions, canvasOptions, resetStore } = useEditorStore();

  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newBoard, setNewBoard] = useState("");
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  const boardFormRef = useRef(null);

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pin/${data._id}`);
    },
    onError: (error) => {
      toast.error("Something went wrong while creating the pin.");
    },
  });

  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      if (!file) {
        toast.error("Please upload an image file.");
        return;
      }

      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      formData.append("newBoard", newBoard);

      mutation.mutate(formData);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["formBoards"],
    queryFn: () =>
      apiRequest.get(`/boards/${currentUser?._id}`).then((res) => res.data),
    enabled: !!currentUser?._id,
  });

  const handleNewBoard = () => {
    setIsNewBoardOpen(true);
    setTimeout(() => {
      boardFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  return (
    <div className="createPage">
      <div className="createTop">
        <h1>{isEditing ? "Design your Pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>
      {isEditing ? (
        <Editor previewImg={previewImg} />
      ) : (
        <div className="createBottom">
          {previewImg.url ? (
            <div className="preview">
              <img src={previewImg.url} alt="" />
              <div className="editIcon" onClick={() => setIsEditing(true)}>
                <IKImage path="/general/edit.svg" alt="" />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <IKImage path="/general/upload.svg" alt="" />
                  <span>Choose a file</span>
                </div>
                <div className="uploadInfo">
                  We recommend using high-quality .jpg files less than 5 MB.
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    const MAX_SIZE_MB = 5;
                    if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
                      toast.error("File size cannot exceed 5MB.");
                      return;
                    }
                    setFile(selectedFile);
                  }
                }}
              />
            </>
          )}
          <form className="createForm" ref={formRef}>
            <div className="createFormItem">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Add a title"
                name="title"
                id="title"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="description">Description</label>
              <textarea
                rows={6}
                placeholder="Add a detailed description"
                name="description"
                id="description"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                placeholder="Add a link"
                name="link"
                id="link"
              />
            </div>

            {!isPending && !error && (
              <div className="createFormItem">
                <label htmlFor="board">Board</label>
                <select
                  name="board"
                  id="board"
                  onChange={(e) =>
                    setNewBoard(e.target.options[e.target.selectedIndex].text)
                  }
                >
                  <option value="">Choose a board</option>
                  {Array.isArray(data) && data.length > 0 ? (
                    [
                      ...new Map(
                        data.map((board) => [board.title, board])
                      ).values(),
                    ].map((board) => (
                      <option value={board._id} key={board._id}>
                        {board.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>No boards available</option>
                  )}
                </select>

                <div className="newBoard">
                  {newBoard && newBoard !== "Choose a board" && (
                    <div className="newBoardContainer">
                      <div className="newBoardItem">{newBoard}</div>
                    </div>
                  )}
                  <div className="createBoardButton" onClick={handleNewBoard}>
                    Create new board
                  </div>
                </div>
              </div>
            )}

            <div className="createFormItem">
              <label htmlFor="tags">Tagged topics</label>
              <input type="text" placeholder="Add tags" name="tags" id="tags" />
              <small>Don't worry, people won't see your tags</small>
            </div>
          </form>
          {isNewBoardOpen && (
            <BoardForm
              setIsNewBoardOpen={setIsNewBoardOpen}
              setNewBoard={setNewBoard}
              ref={boardFormRef}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePage;
