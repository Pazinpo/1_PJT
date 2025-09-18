import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import LoginPage from "./page/LoginPage"; // 네가 만든 로그인 페이지 경로
import PostPage from "./page/PostPage";
import DetailsPage from "./page/DetailsPage";
import MainPage from "./page/MainPage";
import MyRoutinePage from "./page/MyRoutinePage";
import MyPage from "./page/MyPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/post" element={<PostPage />} />
        <Route path="/detail/:id" element={<DetailsPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/myroutine" element={<MyRoutinePage />} />
      </Route>
    </Routes>
  );
}
