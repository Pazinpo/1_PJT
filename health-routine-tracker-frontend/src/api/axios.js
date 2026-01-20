// src/api/api.js

import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8081/v1";

// ─────────────────────────────────────────────────────────────
// 기본 axios 인스턴스들
// ─────────────────────────────────────────────────────────────

const accessToken = useAuthStore.getState().accessToken;

const api = axios.create({
  baseURL: BASE_URL,
  headers: accessToken ? { Authorization: "Bearer " + accessToken } : {},
  withCredentials: true,
});

// ✅ 매 요청 직전에 최신 토큰을 주입
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 일반 JSON 인스턴스 (필요시 사용)
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export { api, instance };
