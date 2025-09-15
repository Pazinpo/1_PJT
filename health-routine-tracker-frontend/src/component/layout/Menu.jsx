// src/component/layout/Menu.jsx
import React from "react";

export default function Menu() {
  return (
    <header className="menu">
      <div className="menu__left">
        <button className="btn-back" onClick={() => window.history.back()}>
          &lt;
        </button>
        <h1 className="brand">
          <span className="brand__check">✔</span> Health Routine Tracker
        </h1>
      </div>
      <div className="menu__right">
        {/* 필요하면 우측 액션 버튼들 배치 */}
      </div>
    </header>
  );
}
