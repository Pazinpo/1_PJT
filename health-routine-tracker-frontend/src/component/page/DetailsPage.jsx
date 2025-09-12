import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * 상세 페이지 컴포넌트 (최신 교체본)
 * - 작성자 카드(클릭 토글, 외부 클릭 닫힘)
 * - 좋아요(0부터 시작)
 * - 댓글 입력/등록(엔터키 지원), 초기 댓글 없음
 * - 접근성(ARIA) 유지
 *
 * TODO:
 *  - 실제 API 연동(loadAuthorOnce 내부 fetch 교체)
 *  - 라우터(onBack/onShare/onEdit) 연결
 */
const noop = () => {};
const DetailsPage = ({
  userId = 42,
  onBack = noop,
  onShare = noop,
  onEdit = noop,
}) => {
  // 작성자 카드 상태
  const [authorOpen, setAuthorOpen] = useState(false);
  const [authorLoaded, setAuthorLoaded] = useState(false);
  const [author, setAuthor] = useState({
    nickname: "~",
    email: "~",
    lastActive: "1일 전",
  });

  // 좋아요: 0부터 시작
  const [likeCount, setLikeCount] = useState(0);

  // 댓글: 초기 빈 배열
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const authorRef = useRef(null);

  // 작성자 정보 최초 1회 로딩
  const loadAuthorOnce = useCallback(async () => {
    if (authorLoaded) return;
    try {
      // TODO: 실제 백엔드 API로 교체
      // const res = await fetch(`/api/users/${userId}`);
      // const u = await res.json();
      const u = {
        nickname: "health_guru",
        email: "guru@example.com",
        lastActive: "1일 전",
      };
      setAuthor({
        nickname: u.nickname,
        email: u.email,
        lastActive: u.lastActive,
      });
      setAuthorLoaded(true);
    } catch (e) {
      console.error(e);
    }
  }, [authorLoaded]);

  // 바깥 클릭 시 작성자 카드 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (!authorRef.current) return;
      if (!authorRef.current.contains(e.target)) {
        setAuthorOpen(false);
      }
    }
    if (authorOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [authorOpen]);

  // 작성자 카드 토글
  const toggleAuthor = async () => {
    const willOpen = !authorOpen;
    setAuthorOpen(willOpen);
    if (willOpen) await loadAuthorOnce();
  };

  // 댓글 등록
  const submitComment = () => {
    const text = commentInput.trim();
    if (!text) return;
    const newItem = {
      id: Date.now(),
      text,
      time: "방금 전",
    };
    setComments((prev) => [newItem, ...prev]);
    setCommentInput("");
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="logo">✔ Health Routine Tracker</h1>
        <div className="header-buttons">
          <button onClick={onBack}>목록으로 돌아가기 &gt;</button>
          <button onClick={onShare}>링크 공유</button>
          <button onClick={onEdit}>수정</button>
        </div>
      </header>

      {/* 작성자 정보 */}
      <section className="author" data-user-id={userId} ref={authorRef}>
        <button
          className="profile-icon"
          aria-haspopup="dialog"
          aria-expanded={authorOpen ? "true" : "false"}
          aria-label="작성자 정보 열기"
          onClick={toggleAuthor}
        >
          👤
        </button>

        <div
          className={`author-info${authorOpen ? " open" : ""}`}
          role="dialog"
          aria-label="작성자 정보"
        >
          <p data-field="nick">닉네임: {author.nickname}</p>
          <p data-field="email">이메일: {author.email}</p>
          <p data-field="last">마지막 활동: {author.lastActive}</p>
        </div>
      </section>

      {/* 본문 */}
      <section className="content-box">
        <p>게시글 내용이 여기에 표시됩니다.</p>
      </section>

      {/* 좋아요 & 댓글 입력 */}
      <section className="interaction">
        <button
          className="like"
          onClick={() => setLikeCount((c) => c + 1)}
          aria-label="좋아요"
        >
          ♡ {likeCount}
        </button>

        <div className="comment-input">
          <input
            type="text"
            placeholder="댓글을 입력하세요"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitComment()}
          />
          <button onClick={submitComment}>등록</button>
        </div>
      </section>

      {/* 댓글 목록 */}
      <section className="comments">
        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <div className="profile-icon" aria-hidden="true">
              👤
            </div>
            <div className="comment-text">{c.text}</div>
            <span className="time">{c.time}</span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DetailsPage;
