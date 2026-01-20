// src/component/post/PostHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
export default function PostHeader() {
  const navigate = useNavigate();
    return (
    <div className="hrt-wrap">
      <header className="dp-header">
        <div className="dp-logo">
          <img
            src="/logo.png"
            alt="Health Routine Tracker"
            className="dp-logo-img"
          />
        </div>

        <div className="dp-actions">
          <button className="dp-btn" onClick={() => navigate("/")}>
            목록으로 돌아가기 &gt;
         </button>
        </div>
      </header>
    </div>
  );
}
