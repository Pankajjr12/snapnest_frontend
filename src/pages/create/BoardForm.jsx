import React, { forwardRef, useRef, useEffect } from "react";
import Image from "../../components/image/ImageComponent";

const BoardForm = forwardRef(({ setIsNewBoardOpen, setNewBoard }, ref) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus the input when form appears
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value.trim();
    if (!title) return;
    setNewBoard(title);
    setIsNewBoardOpen(false);
  };

  return (
    <div className="boardForm" ref={ref}>
      <div className="boardFormContainer">
        <div
          className="boardFormClose"
          onClick={() => setIsNewBoardOpen(false)}
        >
          <Image path="/general/cancel.svg" alt="" w={20} h={20} />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Create a new board</h1>
          <input
            type="text"
            placeholder="Board Title"
            ref={inputRef}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
});

export default BoardForm;
