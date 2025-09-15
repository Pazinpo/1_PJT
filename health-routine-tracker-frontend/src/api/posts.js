// src/api/posts.js
import { api } from "./client";

// 실제 API가 없을 때를 대비한 경로 예시:
// GET  /posts
// POST /posts { title, body }

export async function fetchPosts() {
  // 서버가 없으면 빈 배열 반환(try/catch는 usePosts에서 처리)
  try {
    return await api("/posts");
  } catch {
    return [];
  }
}

export async function createPost(payload) {
  try {
    const created = await api("/posts", { json: payload });
    // created 가 객체라고 가정. 없으면 로컬에서 최소 형태 생성
    return created ?? {
      id: Date.now(),
      ...payload,
      createdAt: Date.now(),
    };
  } catch {
    // 실패시에도 최소한의 객체 반환(낙관적 UI 유지)
    return {
      id: Date.now(),
      ...payload,
      createdAt: Date.now(),
    };
  }
}
