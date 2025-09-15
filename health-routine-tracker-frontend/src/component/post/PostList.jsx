// src/component/post/PostList.jsx
import React from "react";
import PostItem from "./PostItem";

export default function PostList({ items, loading }) {
  if (loading) return <p className="muted">로딩중…</p>;
  if (!items || items.length === 0) {
    return <p className="muted">게시글이 없습니다. 첫 게시글을 작성해보세요!</p>;
  }
  return (
    <ul className="post-list">
      {items.map((p) => (
        <PostItem key={p.id} post={p} />
      ))}
    </ul>
  );
}
