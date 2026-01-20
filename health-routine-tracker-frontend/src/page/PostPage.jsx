// src/page/PostPage.jsx
import React from "react";
import AppLayout from "../component/layout/AppLayout";
import PostForm from "../component/post/PostForm";
// import PostList from "../component/post/PostList";
// import usePosts from "../hooks/usePosts";
import "../styles/post.css";
import "../styles/details.css"; // 🔸 Details 헤더 스타일 재사용
import PostHeader from "../component/post/PostHeader";
import { useUserStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../hooks/usePosts";

export default function PostPage() {
  const user = useUserStore();
  const navigation = useNavigate();
  console.log(">>>>>>> ", user);

  const handleSubmit = async (payload) => {
    try {
      // (옵션) 백엔드가 숫자를 원하면 변환해서 보내세요.
      // 안전 파서
      const toNumber = (v, fallback) =>
        parseFloat(String(v ?? fallback).replace(/[^\d.]/g, "")) || 0;
      const sleepHours = toNumber(payload.sleep, "7.5시간"); // → 7.5
      const exerciseMinutes = toNumber(payload.exercise_time, "0시간") * 60; // → 분
      const waterMl = toNumber(payload.water, "1L") * 1000; // → mL

      const body = {
        userId: user.id,
        routineDate: payload.date || new Date().toISOString().slice(0, 10),
        sleepHours,
        exerciseType: payload.exercise || "헬스",
        exerciseMinutes,
        meals: payload.meals || "",
        waterMl,
        note: payload.caption || "",
      };

      await createPosts(body); // 변환이 필요하면 위 값들로 payload 가공
      alert("등록되었습니다!");
      navigation("/"); // 필요 시 목록 페이지로 이동
    } catch (e) {
      console.error(e);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <AppLayout header={<PostHeader />}>
      <h2 className="page-title">새로운 게시글</h2>

      {/* 최근 게시물은 제거, 단순 입력 폼만 */}
      <PostForm />
    </AppLayout>
  );
}
