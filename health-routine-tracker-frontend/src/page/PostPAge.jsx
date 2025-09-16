import React, { useEffect, useState } from "react";
import "../styles/post.css"; // 경로는 프로젝트에 맞게

export default function PostPage() {
  // 폼 상태
  const [date, setDate] = useState("");
  const [sleep, setSleep] = useState("7.5");
  const [exercise, setExercise] = useState("헬스");
  const [water, setWater] = useState("1");
  const [caption, setCaption] = useState("");

  // 오늘 날짜 기본값
  useEffect(() => {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: 나중에 API 연결
    console.log({ date, sleep, exercise, water, caption });
    alert("임시 저장 완료 (콘솔 확인)");
    setCaption("");
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    // else window.location.href = "/"; // 필요 시
  };

  return (
    <div className="hrt-app">
      {/* 상단 바 */}
      <header className="hrt-topbar">
        <div className="hrt-brand">
          <span className="hrt-check">✔</span> Health Routine Tracker
        </div>
        <nav className="hrt-menu">
          <a href="/">홈</a>
          <a href="/post" aria-current="page">글쓰기</a>
          <a href="/login">로그인</a>
        </nav>
      </header>

      <main className="hrt-container">
        {/* 뒤로가기 / 타이틀 */}
        <div className="hrt-headrow">
          <button type="button" className="hrt-back" onClick={goBack} aria-label="이전으로">
            &lt;
          </button>
          <h1 className="hrt-title">새로운 게시글</h1>
        </div>

        {/* 폼 */}
        <form className="hrt-panel" onSubmit={onSubmit}>
          {/* 날짜 */}
          <label className="hrt-label">
            날짜
            <input
              className="hrt-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          {/* 수면 시간 */}
          <label className="hrt-label">
            수면 시간
            <select
              className="hrt-select"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
            >
              {[
                "5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10"
              ].map((v) => (
                <option key={v} value={v}>{v}시간</option>
              ))}
            </select>
          </label>

          {/* 운동 */}
          <label className="hrt-label">
            운동
            <select
              className="hrt-select"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            >
              {["헬스", "유산소", "요가/필라테스", "러닝", "휴식"].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>

          {/* 수분 보충 */}
          <label className="hrt-label">
            수분 보충
            <select
              className="hrt-select"
              value={water}
              onChange={(e) => setWater(e.target.value)}
            >
              {["0.5","1","1.5","2","2.5","3"].map((v) => (
                <option key={v} value={v}>{v}L</option>
              ))}
            </select>
          </label>

          {/* 캡션 */}
          <label className="hrt-label">
            캡션 작성
            <textarea
              className="hrt-textarea"
              placeholder="캡션을 작성하세요..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={6}
              required
            />
          </label>

          <div className="hrt-actions">
            <button type="submit" className="hrt-btn hrt-primary">등록</button>
          </div>
        </form>
      </main>
    </div>
  );
}
