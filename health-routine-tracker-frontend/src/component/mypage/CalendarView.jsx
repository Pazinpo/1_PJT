import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarView({ value, onDateChange, onMonthChange }) {
  return (
    <Calendar
      value={value}
      onChange={(date) => onDateChange?.(date)}
      onActiveStartDateChange={({ activeStartDate }) =>
        onMonthChange?.(activeStartDate)
      }
      view="month"
      showNeighboringMonth={false}
      next2Label={null}
      prev2Label={null}
      locale="ko-KR"
      className="calendar-only"     // ← 카드/제목 없이 달력만
    />
  );
}
