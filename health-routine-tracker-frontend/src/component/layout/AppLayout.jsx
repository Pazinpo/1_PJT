// src/component/layout/AppLayout.jsx
import React from "react";
import Menu from "./Menu";

export default function AppLayout({ children, header = null }) {
  return (
    <div className="app">
      {header ?? <Menu />}
      <main className="container">{children}</main>
    </div>
  );
}
