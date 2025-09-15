// src/page/PostPage.jsx
import React from "react";
import AppLayout from "../component/layout/AppLayout";
import PostForm from "../component/post/PostForm";
import PostList from "../component/post/PostList";
import usePosts from "../hooks/usePosts";
import "../styles/post.css";

export default function PostPage() {
  const { items, loading, addPost } = usePosts();

  return (
    <AppLayout>
      <h2 className="page-title">새로운 게시글</h2>

      <PostForm onSubmit={addPost} />

      <section className="section">
        <h3 className="section__title">최근 게시글</h3>
        <PostList items={items} loading={loading} />
      </section>
    </AppLayout>
  );
}
