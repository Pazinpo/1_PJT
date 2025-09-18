import React from "react";

/** 페이지 상단(컨텐츠 바로 위)에 붙는 로고 바 */
export default function Header() {
  return (
    <div className="d-flex align-items-center gap-3 py-3 app-header">
      <img
        src="/static/logo.png"
        alt="Health Routine Tracker"
        style={{ width: 200, height: 200 }}   // 로고 크게
      />
    </div>
  );
}
