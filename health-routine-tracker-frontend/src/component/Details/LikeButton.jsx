// src/component/details/LikeButton.jsx
import React from "react";

export default function LikeButton({ count = 0, onClick }) {
  return (
    <button type="button" className="dp-like" onClick={onClick} aria-label="좋아요">
      <span className="heart">♡</span>
      <span>{count}</span>
    </button>
  );
}
