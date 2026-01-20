// src/page/DetailsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import "../styles/details.css";

import Header from "../component/Details/Header";
import AuthorCard from "../component/Details/AuthorCard";
import ContentBox from "../component/Details/ContentBox";
import LikeButton from "../component/Details/LikeButton";
import CommentInput from "../component/Details/CommentInput";
import CommentList from "../component/Details/CommentList";
import { useParams } from "react-router-dom";
import { fetchRoutineDetail } from "../hooks/useRoutine";

export default function DetailsPage({
  // userId = 42,
  onBack = () => {},
  onShare = () => {},
  onEdit = () => {},
}) {
  const { id } = useParams();
  const routineId = Number(id);
  // 좋아요: 피그마 요구대로 0부터
  const [likes, setLikes] = useState(0);
  // ✅ 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // ✅ Routine Detail
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 언마운트 레이스 가드
    let mounted = true;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchRoutineDetail(routineId);
        console.log(">>>>> ", data);
        const normalized = data?.data ?? data;
        if (mounted) {
          setDetail(normalized ?? null);
          console.log("[detail loaded]", normalized);
        }
      } catch (e) {
        if (mounted) {
          setError(e);
          setDetail(null);
        }
        console.error(e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [routineId]);

  // 댓글
  const [comments, setComments] = useState([]); // 처음엔 없음
  const addComment = (text) => {
    const item = { id: Date.now(), text, time: "방금 전" };
    setComments((prev) => [item, ...prev]);
  };

  // ✅ userId 안전 추출 (API가 userId 또는 user.id로 줄 수 있음)
  const authorUserId = detail?.userId ?? detail?.user?.id ?? null;

  if (isLoading) {
    return (
      <div className="hrt-wrap">
        <Header onBack={onBack} onShare={onShare} onEdit={onEdit} />
        <div>로딩 중...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="hrt-wrap">
        <Header onBack={onBack} onShare={onShare} onEdit={onEdit} />
        <div>불러오기에 실패했습니다.</div>
      </div>
    );
  }
  if (!detail) {
    return (
      <div className="hrt-wrap">
        <Header onBack={onBack} onShare={onShare} onEdit={onEdit} />
        <div>데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="hrt-wrap">
      <Header onBack={onBack} onShare={onShare} onEdit={onEdit} />

      {/* 작성자 */}
      {/* <AuthorCard userId={detail.userId} /> */}
      {/* ✅ detail 로드 후에만 렌더 */}
      {authorUserId && <AuthorCard userId={authorUserId} />}

      {/* 본문 */}
      <ContentBox detail={detail} />

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
