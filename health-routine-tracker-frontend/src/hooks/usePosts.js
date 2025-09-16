// src/component/hooks/usePosts.js
import { useEffect, useState } from "react";
import { fetchPosts, createPost } from "../api/posts";

export default function usePosts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 최초 로드
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setItems(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 새 글 추가
  const addPost = async (payload) => {
    const created = await createPost(payload);
    setItems((prev) => [created, ...prev]);
    return created;
  };

  return { items, loading, error, addPost };
}
