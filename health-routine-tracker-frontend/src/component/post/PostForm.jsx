// src/component/post/PostForm.jsx
import React, { useEffect, useRef } from "react";

const SLEEP_OPTIONS = [
  "5시간", "6시간", "6.5시간", "7시간", "7.5시간", "8시간", "8.5시간", "9시간",
];
const EXERCISE_OPTIONS = ["헬스", "달리기", "요가", "필라테스", "자전거", "휴식"];
const WATER_OPTIONS = ["0.5L", "1L", "1.5L", "2L", "2.5L", "3L"];

export default function PostForm({ onSubmit }) {
  const dateRef = useRef(null);

  // 오늘 날짜 기본값
  useEffect(() => {
    const el = dateRef.current;
    if (!el) return;
    const t = new Date();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    el.value = `${t.getFullYear()}-${mm}-${dd}`;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      date: form.get("date"),            // YYYY-MM-DD
      sleep: form.get("sleep"),          // 예: 7.5시간
      exercise: form.get("exercise"),    // 예: 헬스
      water: form.get("water"),          // 예: 1L
      caption: form.get("caption")?.trim() || "",
    };

    onSubmit?.(payload);
    e.currentTarget.reset();
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label className="field">
        <span className="field__label">날짜</span>
        <input name="date" type="date" ref={dateRef} />
      </label>

      <label className="field">
        <span className="field__label">수면 시간</span>
        <select name="sleep" defaultValue="7.5시간">
          {SLEEP_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">운동</span>
        <select name="exercise" defaultValue="헬스">
          {EXERCISE_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">수분 보충</span>
        <select name="water" defaultValue="1L">
          {WATER_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">캡션 작성</span>
        <textarea name="caption" placeholder="캡션을 작성하세요..." rows={4} />
      </label>

      <div className="actions">
        <button type="submit" className="btn-primary">등록</button>
      </div>
    </form>
  );
}
