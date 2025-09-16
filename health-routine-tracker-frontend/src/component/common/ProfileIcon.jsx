// src/component/common/ProfileIcon.jsx
import React from "react";

export default function ProfileIcon({ emoji = "👤", ...rest }) {
  return (
    <div className="profile-icon" {...rest}>
      {emoji}
    </div>
  );
}
