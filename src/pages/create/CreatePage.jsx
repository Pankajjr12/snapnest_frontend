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

// Add Post Mutation function
const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  console.log(res.data);
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

  const boardFormRef = useRef(null); // 👈 Create ref

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pin/${data._id}`);
    },
  });

  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      formData.append("newBoard", newBoard); // Add the selected categories to the form data
      console.log(formData);
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
    // scroll into view after opening
    setTimeout(() => {
      boardFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]); // Add the selected category to the array
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value)); // Remove the deselected category
    }
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
                  We recommend using high-quality .jpg files less than 20 MB or
                  .mp4 files less than 200 MB.
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
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

            {/* FIXED: SELECT OR ADD BOARD */}
            {(!isPending || !error) && (
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
