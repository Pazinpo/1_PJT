// src/component/post/EmptyState.jsx
import React from "react";

export default function EmptyState({ message = "게시글이 없습니다." }) {
  return <div className="empty">{message}</div>;
}
