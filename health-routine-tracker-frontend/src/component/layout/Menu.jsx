// src/component/layout/Menu.jsx
import React from "react";

export default function Menu() {
  return (
    <header className="app-header">
      <div className="logo">✔ Health Routine Tracker</div>
      <nav className="menu">
        <a href="#home">홈</a>
        <a href="#post">글쓰기</a>
        <a href="#login">로그인</a>
      </nav>
    </header>
  );
}
