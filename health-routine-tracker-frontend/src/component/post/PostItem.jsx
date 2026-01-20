// src/component/post/PostItem.jsx
import React from "react";

export default function PostItem({ item }) {
  const { date, sleep, exercise, water, caption, createdAt } = item;
  return (
    <li className="post-item">
      <div className="post-item__meta">
        <strong>{date}</strong>
        <span className="dot" />
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>
      <div className="post-item__row"><b>수면</b> {sleep}</div>
      <div className="post-item__row"><b>운동</b> {exercise}</div>
      <div className="post-item__row"><b>수분</b> {water}</div>
      {caption && <p className="post-item__caption">{caption}</p>}
    </li>
  );
}
