import React, { useState, useMemo } from "react";
import CalendarView from "../component/mypage/CalendarView";
import StatsSwitcher from "../component/mypage/StatsSwitcher";
import StatsChart from "../component/mypage/StatsChart";
import Header from "../component/layout/Header";
import "../styles/mypage.css";

// 날짜 포맷
const fmtDate = (d) => {
  if (!(d instanceof Date)) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// 주(월~일)
const getWeekRange = (d) => {
  const date = new Date(d);
  const day = date.getDay();                 // 0=일 ~ 6=토
  const diffToMonday = (day + 6) % 7;        // 월=0
  const monday = new Date(date);
  monday.setDate(date.getDate() - diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { start: fmtDate(monday), end: fmtDate(sunday) };
};

// 월 포맷
const fmtMonth = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};

export default function MyPage() {
  const [period, setPeriod] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(new Date());

  const summaryText = useMemo(() => {
    if (period === "daily") return `${fmtDate(selectedDate)} · 일별 통계`;
    if (period === "weekly") {
      const r = getWeekRange(selectedDate);
      return `${r.start} ~ ${r.end} · 주간 통계`;
    }
    return `${fmtMonth(activeMonth)} · 월간 통계`;
  }, [period, selectedDate, activeMonth]);

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className="container py-3">
      {/* 로고 */}
      <Header />

      {/* 🔹 마이페이지 + 로그아웃 같은 줄 */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">마이페이지</h2>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="row g-4 align-items-stretch">
        {/* LEFT: 달력 */}
        <div className="col-12 col-lg-8 d-flex">
          <div className="rounded border p-3 bg-white w-100 d-flex flex-column h-100 calendar-panel">
            <h5 className="mb-3">달력</h5>
            <CalendarView
              value={selectedDate}
              onDateChange={(d) => setSelectedDate(d)}
              onMonthChange={(m) => setActiveMonth(m)}
            />
            <div className="mt-3 small text-muted">
              {`선택한 날짜: ${fmtDate(selectedDate)} / 표시 중인 월: ${fmtMonth(activeMonth)}`}
            </div>
          </div>
        </div>

        {/* RIGHT: 통계 */}
        <div className="col-12 col-lg-4 d-flex">
          <div className="rounded border p-3 bg-white w-100 d-flex flex-column h-100 stats-panel">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="mb-0">통계</h5>
              <StatsSwitcher
                value={period}
                onChange={(p) => setPeriod(p)}
                tabs={[
                  { key: "daily", label: "일별" },
                  { key: "weekly", label: "주간" },
                  { key: "monthly", label: "월간" },
                ]}
              />
            </div>
            <div className="text-muted mb-3">{summaryText}</div>
            <div className="flex-grow-1 charts-vertical">
              <StatsChart period={period} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}