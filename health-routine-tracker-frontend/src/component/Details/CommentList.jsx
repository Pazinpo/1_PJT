// src/component/details/CommentList.jsx
import React from "react";
import ProfileIcon from "../common/ProfileIcon";

export default function CommentList({ items }) {
  return (
    <section className="dp-comments">
      {items.map((c) => (
        <div className="dp-comment" key={c.id}>
          <ProfileIcon aria-hidden="true" />
          <div>{c.text}</div>
          <span className="dp-time">{c.time}</span>
        </div>
      ))}
    </section>
  );
}
