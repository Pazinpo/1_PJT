// src/component/details/ContentBox.jsx
import React from "react";

const EXERCISE_LABELS = {
  WALK: "걷기",
  RUN: "달리기",
  GYM: "헬스",
  ETC: "기타",
};

// YYYY-MM-DD or ISO → 'YYYY.MM.DD'
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

// 분 → "X시간 Y분" 또는 "Z분"
function formatMinutes(min) {
  if (min == null) return "-";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}시간 ${m ? `${m}분` : ""}`.trim() : `${m}분`;
}

// mL → "X L"
function formatWater(ml) {
  if (ml == null) return "-";
  const l = ml / 1000;
  return Number.isInteger(l) ? `${l}L` : `${l.toFixed(1)}L`;
}

export default function ContentBox({ detail }) {
  if (!detail) return null;
  const dateText = formatDate(detail.date ?? detail.createdAt);
  const sleepText =
    detail.sleepHours != null ? `${detail.sleepHours}시간` : "-";
  const exerciseType =
    EXERCISE_LABELS[detail.exerciseType] ?? detail.exerciseType ?? "-";
  const exerciseTime = formatMinutes(detail.exerciseMinutes);
  const waterText = formatWater(detail.waterMl);
  const meals = detail.meals || "-";
  const note = detail.note || "-";
  return (
    // <section className="dp-content hrt-card">
    //   <div className="box">{detail.sleep}</div>
    // </section>

    <section className="dp-content hrt-card">
      <div className="dp-content-header">
        <h3 className="dp-title">루틴 상세</h3>
        <span className="dp-date">{dateText}</span>
      </div>

      <ul className="dp-stats">
        <li>
          <span className="label">수면</span>
          <strong className="value">{sleepText}</strong>
        </li>
        <li>
          <span className="label">운동</span>
          <strong className="value">{exerciseType}</strong>
        </li>
        <li>
          <span className="label">운동 시간</span>
          <strong className="value">{exerciseTime}</strong>
        </li>
        <li>
          <span className="label">수분</span>
          <strong className="value">{waterText}</strong>
        </li>
      </ul>

      <div className="dp-section">
        <h4 className="dp-section-title">식단</h4>
        <p className="dp-section-body">{meals}</p>
      </div>

      <div className="dp-section">
        <h4 className="dp-section-title">메모</h4>
        <p className="dp-section-body">{note}</p>
      </div>
    </section>
  );
}
