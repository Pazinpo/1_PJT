// src/api/client.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "") || "";

/**
 * 간단한 fetch 래퍼
 * @param {string} path ex) "/posts"
 * @param {RequestInit & { json?: any }} options
 */
export async function api(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const { json, headers, ...rest } = options;

  const res = await fetch(url, {
    method: json ? "POST" : (options.method || "GET"),
    headers: {
      "Content-Type": json ? "application/json" : "application/json",
      ...(headers || {}),
    },
    credentials: "include",
    body: json ? JSON.stringify(json) : options.body,
    ...rest,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText} - ${text}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}
