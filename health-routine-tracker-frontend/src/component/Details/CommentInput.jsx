// src/component/details/CommentInput.jsx
import React, { useState } from "react";

export default function CommentInput({ onSubmit }) {
  const [text, setText] = useState("");

  const submit = () => {
    const v = text.trim();
    if (!v) return;
    onSubmit?.(v);
    setText("");
  };

  return (
    <div className="dp-input" style={{ flex: 1 }}>
      <input
        type="text"
        placeholder="댓글을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button type="button" onClick={submit}>등록</button>
    </div>
  );
}
