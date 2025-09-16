// src/hooks/useAuthor.js
import { useRef, useState } from "react";

export default function useAuthor(userId){
  const [author, setAuthor] = useState({});
  const loaded = useRef(false);

  const loadOnce = async () => {
    if (loaded.current) return;
    // TODO: 백엔드로 교체
    await new Promise((r)=>setTimeout(r, 150)); // 살짝 지연
    setAuthor({
      nickname: "health_guru",
      email: "guru@example.com",
      lastActive: "1일 전",
      userId,
    });
    loaded.current = true;
  };

  return { author, loadOnce };
}
    