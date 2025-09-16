// src/page/PostPage.jsx
import React from "react";
import AppLayout from "../component/layout/AppLayout";
import PostForm from "../component/post/PostForm";
// import PostList from "../component/post/PostList";
// import usePosts from "../hooks/usePosts";
import "../styles/post.css";
import "../styles/details.css";   // 🔸 Details 헤더 스타일 재사용
import PostHeader from "../component/post/PostHeader";

export default function PostPage() {
  // const { items, loading, addPost } = usePosts();

  return (
    <AppLayout header={<PostHeader />}>
      <h2 className="page-title">새로운 게시글</h2>

      {/* 최근 게시물은 제거, 단순 입력 폼만 */}
      <PostForm />
    </AppLayout>
  );
}
