// src/component/layout/AppLayout.jsx
import React from "react";
import Menu from "./Menu";

export default function AppLayout({ children }) {
  return (
    <div className="app">
      <Menu />
      <main className="container">{children}</main>
    </div>
  );
}
