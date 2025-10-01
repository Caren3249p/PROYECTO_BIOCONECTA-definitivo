// src/components/Button.jsx
import React from "react";

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-6 py-3 rounded-2xl font-semibold text-white bg-[#009688] hover:bg-[#00796B] transition duration-300 shadow-lg"
    >
      {children}
    </button>
  );
}
