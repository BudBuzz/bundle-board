// src/components/BoardForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { db, collection, addDoc } from "../services/FirebaseConfig";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const BoardForm = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      const boardRef = await addDoc(
        collection(db, "users", user.uid, "inspirationBoards"),
        {
          title,
          photos: [],
        }
      );
      onClose(); // Close the popup after creating the board
      navigate(`/boards/${boardRef.id}`);
    } catch (error) {
      setError("Error creating board: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex top-10 flex-col">
      <label className="mb-2 font-bold text-purple dark:text-light-blue">
        Board Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 mb-4 border rounded"
        required
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="flex justify-end top-10 gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-purple dark:text-light-blue rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-purple dark:text-light-blue rounded"
        >
          Create Board
        </button>
      </div>
    </form>
  );
};

export default BoardForm;
