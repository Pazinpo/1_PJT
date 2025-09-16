// src/api/posts.js
// 임시 로컬스토리지 기반 API (백엔드 없이 동작)
// 나중에 진짜 서버 붙일 때 이 파일만 fetch/axios로 교체하면 됩니다.

const STORAGE_KEY = "posts_v1";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function fetchPosts() {
  // 실전에서는: const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/posts`);
  // return await res.json();
  return Promise.resolve(readAll());
}

export async function createPost(payload) {
  const now = Date.now();
  const item = {
    id: now,
    createdAt: new Date(now).toISOString(),
    ...payload,
  };
  const all = readAll();
  all.unshift(item); // 최신이 위로
  writeAll(all);
  return Promise.resolve(item);
}
