// src/component/details/AuthorCard.jsx
import React, { useRef, useState, useEffect } from "react";
import ProfileIcon from "../common/ProfileIcon";
import useAuthor from "../../hooks/useAuthor";

export default function AuthorCard({ userId }) {
  const { author, loadOnce } = useAuthor(userId);
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  // 모바일/클릭 토글
  const toggle = async () => {
    const will = !open;
    setOpen(will);
    if (will) await loadOnce();
  };

  // 밖을 클릭하면 닫기
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  return (
    <section
      className="dp-author"
      ref={boxRef}
      onMouseEnter={async () => {
        setOpen(true);
        await loadOnce();
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <ProfileIcon onClick={toggle} aria-label="작성자 정보" />
      <span className="dp-chip">작성자</span>

      <div className={`dp-author-tooltip ${open ? "open" : ""}`} role="dialog" aria-label="작성자 정보">
        <p>닉네임: {author.nickname ?? "~"}</p>
        <p>이메일: {author.email ?? "~"}</p>
        <p>마지막 활동: {author.lastActive ?? "~"}</p>
      </div>
    </section>
  );
}
