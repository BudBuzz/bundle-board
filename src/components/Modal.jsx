// src/components/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute top-44 bg-light dark:bg-dark p-6 rounded-lg shadow-lg w-full border-dark border-solid shadow-purple max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple dark:text-light-blue">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
