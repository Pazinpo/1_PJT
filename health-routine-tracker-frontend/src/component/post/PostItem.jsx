// src/component/post/PostItem.jsx
import React from "react";

export default function PostItem({ post }) {
  return (
    <li className="post-item">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      {post.createdAt && (
        <span className="time">{new Date(post.createdAt).toLocaleString()}</span>
      )}
    </li>
  );
}
