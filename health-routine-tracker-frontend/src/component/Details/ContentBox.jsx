// src/component/details/ContentBox.jsx
import React from "react";

export default function ContentBox({ text }) {
  return (
    <section className="dp-content hrt-card">
      <div className="box">{text}</div>
    </section>
  );
}
