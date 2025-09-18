// src/hooks/useAuthor.js
import { useRef, useState } from "react";
import { api } from "../api/axios";

export default function useAuthor(userId) {
  const [author, setAuthor] = useState({});
  const loaded = useRef(false);

  const loadOnce = async () => {
    if (loaded.current) return;
    // TODO: 백엔드로 교체
    await new Promise((r) => setTimeout(r, 150)); // 살짝 지연
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

export const fetchWriter = async (id) => {
  try {
    const response = await api.get(`/members/${id}`);
    console.log("fetchWriter detail ", response);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.log(
        "fetchWriter fetchWriter response status : ",
        response.status
      );
      return [];
    }
  } catch (error) {
    console.log("fetchWriter fetchWriter error : ", error);
  }
};
