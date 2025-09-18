// src/component/post/PostForm.jsx
import React, { useEffect, useRef } from "react";
import { useUserStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../../hooks/usePosts";

const SLEEP_OPTIONS = [
  { label: "5시간", value: 5 },
  { label: "6시간", value: 6 },
  { label: "6.5시간", value: 6.5 },
  { label: "7시간", value: 7 },
  { label: "7.5시간", value: 7.5 },
  { label: "8시간", value: 8 },
  { label: "8.5시간", value: 8.5 },
  { label: "9시간", value: 9 },
];
const EXERCISE_TIME_OPTIONS = [
  { label: "0시간", value: 0 },
  { label: "0.5시간", value: 30 },
  { label: "1시간", value: 60 },
  { label: "1.5시간", value: 90 },
  { label: "2시간", value: 120 },
];
const EXERCISE_OPTIONS = [
  { label: "걷기", value: "WALK" },
  { label: "달리기", value: "RUN" },
  { label: "헬스", value: "GYM" },
  { label: "기타", value: "ETC" },
];
const WATER_OPTIONS = [
  { label: "0.5L", value: 500 },
  { label: "1L", value: 1000 },
  { label: "1.5L", value: 1500 },
  { label: "2L", value: 2000 },
  { label: "2.5L", value: 2500 },
  { label: "3L", value: 3000 },
];

export default function PostForm() {
  const dateRef = useRef(null);
  const navigation = useNavigate();
  const user = useUserStore();
  const userId = useUserStore((s) => s.user?.id);

  // 오늘 날짜 기본값
  useEffect(() => {
    const el = dateRef.current;
    if (!el) return;
    const t = new Date();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    el.value = `${t.getFullYear()}-${mm}-${dd}`;
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (!userId) {
      alert("로그인이 필요합니다.");
      navigation("/login");
    }

    // ✅ 숫자/문자 스펙 맞춰 변환
    const body = {
      userId,
      routineDate: form.get("date"),
      sleepHours: Number(form.get("sleep")), // 숫자(시간)
      exerciseType: form.get("exercise"),
      exerciseMinutes: Number(form.get("exercise_time")), // 숫자(분)
      waterMl: Number(form.get("water")), // 숫자(mL)
      meals: form.get("meals") || "",
      note: (form.get("caption") || "").trim(),
    };

    try {
      const response = await createPosts(body);
      if (response === 201) {
        alert("루틴 등록에 성공했습니다");
        navigation("/");
      } else if (response === 409) {
        alert("이미 루틴이 등록된 날짜입니다.");
      }
    } catch (error) {
      console.log(error);
      alert("루틴 등록에 실패했습니다.");
    }
  };

  return (
    <form className="post-form" onSubmit={submitHandler}>
      <label className="field">
        <span className="field__label">날짜</span>
        <input name="date" type="date" ref={dateRef} />
      </label>

      <label className="field">
        <span className="field__label">수면 시간</span>
        <select name="sleep" defaultValue="7.5시간">
          {SLEEP_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">운동</span>
        <select name="exercise" defaultValue="헬스">
          {EXERCISE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">운동 시간</span>
        <select name="exercise_time" defaultValue="7.5시간">
          {EXERCISE_TIME_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">수분 보충</span>
        <select name="water" defaultValue="1L">
          {WATER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">식단</span>
        <textarea name="meals" placeholder="식단을 작성해주세요" rows={4} />
      </label>

      <label className="field">
        <span className="field__label">캡션 작성</span>
        <textarea name="caption" placeholder="캡션을 작성하세요..." rows={4} />
      </label>

      <div className="actions">
        <button type="submit" className="btn-primary">
          등록
        </button>
      </div>
    </form>
  );
}
