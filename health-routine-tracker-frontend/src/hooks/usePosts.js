// src/hooks/usePosts.js
import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api/posts";

export default function usePosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.warn("[usePosts] fetch 실패, 빈 목록으로 표시합니다.", e);
        setError(e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addPost = async (payload) => {
    // 낙관적 추가(백엔드 실패해도 UI는 업데이트)
    const temp = {
      id: `temp-${Date.now()}`,
      title: payload.title,
      body: payload.body,
      createdAt: Date.now(),
    };
    setItems((prev) => [temp, ...prev]);
    try {
      const created = await createPost(payload);
      // 서버 결과로 교체(아이디 등)
      setItems((prev) => [created, ...prev.filter((p) => p.id !== temp.id)]);
      return created;
    } catch (e) {
      console.error("[usePosts] create 실패", e);
      // 실패 시 그대로 temp 유지(또는 롤백하려면 아래 한 줄 교체)
      // setItems((prev) => prev.filter((p) => p.id !== temp.id));
      throw e;
    }
  };

  return { items, loading, error, addPost };
}
