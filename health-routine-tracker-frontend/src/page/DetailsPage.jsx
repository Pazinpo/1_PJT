// src/page/DetailsPage.jsx
import React, { useMemo, useState } from "react";
import "../styles/details.css";

import Header from "../component/Details/Header";
import AuthorCard from "../component/Details/AuthorCard";
import ContentBox from "../component/Details/ContentBox";
import LikeButton from "../component/Details/LikeButton";
import CommentInput from "../component/Details/CommentInput";
import CommentList from "../component/Details/CommentList";

export default function DetailsPage({
  userId = 42,
  onBack = () => {},
  onShare = () => {},
  onEdit = () => {},
}) {
  // 좋아요: 피그마 요구대로 0부터
  const [likes, setLikes] = useState(0);

  // 댓글
  const [comments, setComments] = useState([]); // 처음엔 없음
  const addComment = (text) => {
    const item = { id: Date.now(), text, time: "방금 전" };
    setComments((prev) => [item, ...prev]);
  };

  // 본문(데모용)
  const content = useMemo(
    () => "게시글 내용이 여기에 표시됩니다.",
    []
  );

  return (
    <div className="hrt-wrap">
      <Header onBack={onBack} onShare={onShare} onEdit={onEdit} />

      {/* 작성자 */}
      <AuthorCard userId={userId} />

      {/* 본문 */}
      <ContentBox text={content} />

      {/* 좋아요 & 입력 */}
      <section className="dp-interact">
        <LikeButton count={likes} onClick={() => setLikes((v) => v + 1)} />
        <CommentInput onSubmit={addComment} />
      </section>

      {/* 댓글 */}
      <CommentList items={comments} />
    </div>
  );
}
