import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import LoginPage from "./page/LoginPage"; // 네가 만든 로그인 페이지 경로
import PostPage from "./page/PostPage";


export default function App() {
  return (

    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/blog"
        element={<div style={{ padding: 24 }}>블로그 페이지 (임시)</div>}
      />
      <Route
        path="*"
        element={<div style={{ padding: 24 }}>404 Not Found</div>}
      />
      <Route path="/post" element={<PostPage />} />
    </Routes>


  );
}
