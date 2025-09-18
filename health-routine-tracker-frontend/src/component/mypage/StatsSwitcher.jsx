// src/component/mypage/StatsSwitcher.jsx
import React from "react";

export default function StatsSwitcher({ value, onChange, tabs }) {
  return (
    <div className="btn-group">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={`btn btn-sm ${value === tab.key ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => onChange(tab.key)}   // ✅ 여기서 onChange(tab.key)
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
