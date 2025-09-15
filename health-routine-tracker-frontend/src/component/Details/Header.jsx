// src/component/details/Header.jsx
import React from "react";

export default function Header({ onBack, onShare, onEdit }) {
  return (
    <header className="dp-header">
      <div className="dp-logo">
        <span className="check">✔</span>
        <span>Health Routine Tracker</span>
      </div>
      <div className="dp-actions">
        <button type="button" className="dp-btn" onClick={onBack}>
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
