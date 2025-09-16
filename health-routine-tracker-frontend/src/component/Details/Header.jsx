// src/component/details/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
export default function Header({ onBack, onShare, onEdit }) {
    const navigate = useNavigate();
  return (
    <header className="dp-header">
      <div className="dp-logo">
        <img src="/logo.png" alt="Health Routine Tracker" className="dp-logo-img" />
      </div>
      <div className="dp-actions">
        <button className="dp-btn" onClick={() => navigate("/")}>
          목록으로 돌아가기 &gt;
        </button>
        <button type="button" className="dp-btn" onClick={onShare}>
          링크 공유
        </button>
        <button type="button" className="dp-btn" onClick={onEdit}>
          수정
        </button>
      </div>
    </header>
  );
}
