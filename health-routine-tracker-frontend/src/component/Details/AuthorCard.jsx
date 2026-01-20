// src/component/details/AuthorCard.jsx
import React, { useRef, useState, useEffect } from "react";
import ProfileIcon from "../common/ProfileIcon";
import useAuthor, { fetchWriter } from "../../hooks/useAuthor";

export default function AuthorCard({ userId }) {
  const { author, loadOnce } = useAuthor(userId);
  const [open, setOpen] = useState(false);
  const [writer, setWriter] = useState("");
  const [err, setErr] = useState(null);
  const boxRef = useRef(null);

  // userId 변경 시 작성자 정보 로드
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!userId) {
        setWriter(null);
        return;
      }
      try {
        setErr(null);
        const res = await fetchWriter(userId);
        // ✅ 응답 정규화: axios 응답/순수데이터 모두 대응
        const data = res?.data?.data ?? res?.data ?? res;
        if (alive) setWriter(data ?? null);
      } catch (e) {
        if (alive) {
          setWriter(null);
          setErr(e);
        }
        console.error(e);
      }
    })();
    return () => {
      alive = false;
    };
  }, [userId]);

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

      <div
        className={`dp-author-tooltip ${open ? "open" : ""}`}
        role="dialog"
        aria-label="작성자 정보"
      >
        <p>닉네임: {writer.nickname ?? "~"}</p>
        <p>이메일: {writer.email ?? "~"}</p>
        {/* <p>마지막 활동: {writer.lastActive ?? "~"}</p> */}
      </div>
    </section>
  );
}
