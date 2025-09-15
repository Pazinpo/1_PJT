import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage"; // 네가 만든 로그인 페이지 경로

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/blog" element={<div>블로그 페이지 (임시)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
