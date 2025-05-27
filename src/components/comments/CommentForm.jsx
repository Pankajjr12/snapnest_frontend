import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../utils/useAuthStore.js"; // ✅ Import Zustand store

const addComment = async (comment) => {
  const res = await apiRequest.post("/comments", comment);
  return res.data;
};

const CommentForm = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const currentUser = useAuthStore((state) => state.currentUser); // ✅ Zustand state
  const isLoggedIn = !!currentUser;

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setDesc("");
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to add a comment.");
      return;
    }

    if (!desc.trim()) return;

    mutation.mutate({
      description: desc,
      pin: id,
    });
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={
          isLoggedIn ? "Add a comment" : "Login to add a comment"
        }
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
        disabled={!isLoggedIn} // ✅ Disable input if not logged in
      />
      <div className="emoji">
        <div
          onClick={() => {
            if (isLoggedIn) setOpen((prev) => !prev);
          }}
          style={{ cursor: isLoggedIn ? "pointer" : "not-allowed" }}
        >
          😊
        </div>
        {open && isLoggedIn && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
