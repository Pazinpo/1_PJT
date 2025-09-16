// src/component/post/PostList.jsx
import React from "react";
import PostItem from "./PostItem";
import EmptyState from "./EmptyState";
import LoadingSpinner from "./LoadingSpinner";

export default function PostList({ items = [], loading }) {
  if (loading) return <LoadingSpinner />;
  if (!items.length) return <EmptyState />;

  return (
    <ul className="post-list">
      {items.map((it) => (
        <PostItem key={it.id} item={it} />
      ))}
    </ul>
  );
}
