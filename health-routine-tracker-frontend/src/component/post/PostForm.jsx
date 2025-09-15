// src/component/post/PostForm.jsx
import React, { useState } from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = { title: title.trim(), body: body.trim() };
    if (!values.title || !values.body) return;
    await onSubmit?.(values);
    setTitle("");
    setBody("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        className="input"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="textarea"
        name="body"
        placeholder="내용"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
        required
      />
      <div className="actions">
        <button type="submit" className="btn primary">등록</button>
      </div>
    </form>
  );
}
