// src/page/PostPage.jsx
import React from "react";
import AppLayout from "../component/layout/AppLayout";
import PostForm from "../component/post/PostForm";
import PostList from "../component/post/PostList";
import usePosts from "../hooks/usePosts";

export default function PostPage() {
  const { items, loading, error, addPost } = usePosts();

  return (
    <AppLayout>
      <h1 className="page-title">게시글 작성</h1>

      <PostForm
        onSubmit={async (values) => {
          await addPost(values); // 제목/내용 전달
        }}
      />

      {error && <p className="error-text">에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>}
      <PostList items={items} loading={loading} />
    </AppLayout>
  );
}
