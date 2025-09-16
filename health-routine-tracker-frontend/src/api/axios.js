// src/api/api.js

import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

// ─────────────────────────────────────────────────────────────
// 기본 axios 인스턴스들
// ─────────────────────────────────────────────────────────────
const tokenFromLS = localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: BASE_URL,
  headers: tokenFromLS ? { Authorization: `Bearer ${tokenFromLS}` } : {},
  withCredentials: true,
});

// 일반 JSON 인스턴스 (필요시 사용)
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 인증 전용 인스턴스 (자동 토큰/재발급 포함)
const authApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // refresh 쿠키 등 사용 시 필요
});

// ─────────────────────────────────────────────────────────────
// 요청 인터셉터: 매 요청에 최신 accessToken 주입 (Zustand에서 직접 조회)
// ─────────────────────────────────────────────────────────────
authApi.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  config.headers = config.headers || {};
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// ─────────────────────────────────────────────────────────────
// 응답 인터셉터: 토큰 만료 시 재발급 (동시요청 큐잉 처리)
// 서버가 business code로 401xxx를 주거나, HTTP 401를 주는 케이스 모두 처리
// ─────────────────────────────────────────────────────────────
let isTokenRefreshing = false;
let requestQueue = []; // { config, resolve, reject }

function redirectToLogin() {
  try {
    useAuthStore.getState().reset?.();
  } catch (_) {}
  // 훅을 쓸 수 없는 위치이므로 단순 리다이렉트
  window.location.href = "/login";
}

authApi.interceptors.response.use(
  async (response) => {
    const code = response?.data?.code;
    const isBiz401 = Number.isFinite(code) && Math.trunc(code / 1000) === 401;

    if (!isBiz401) {
      return response;
    }

    const originalConfig = response.config;

    if (!isTokenRefreshing) {
      isTokenRefreshing = true;
      try {
        // 리프레시 요청 (쿠키 기반이면 withCredentials 필수)
        const reissueRes = await axios.post(
          `${BASE_URL.replace(/\/+$/, "")}/auth/reissue`,
          {},
          { withCredentials: true }
        );

        // 성공 코드 예시: 201001
        if (reissueRes?.data?.code === 201001) {
          // 새 토큰은 응답 헤더 Authorization에 담겨온다고 가정
          const newAccessToken = reissueRes?.headers?.authorization;
          if (!newAccessToken) {
            throw new Error("No authorization header on refresh response");
          }

          // Zustand 업데이트
          useAuthStore.setState({
            accessToken: newAccessToken.replace(/^Bearer\s+/i, ""),
          });

          // 큐 재시도
          requestQueue.forEach(({ config, resolve, reject }) => {
            config.headers = config.headers || {};
            config.headers.Authorization = newAccessToken;
            authApi.request(config).then(resolve).catch(reject);
          });
          requestQueue = [];

          // 현재 요청도 재시도
          originalConfig.headers = originalConfig.headers || {};
          originalConfig.headers.Authorization = newAccessToken;
          return authApi(originalConfig);
        }

        // 재발급 실패 코드 예시: 404001
        if (reissueRes?.data?.code === 404001) {
          alert("세션이 만료되었습니다.");
          redirectToLogin();
          return Promise.reject(new Error("Refresh token expired"));
        }

        // 정의되지 않은 코드
        redirectToLogin();
        return Promise.reject(new Error("Unknown refresh response"));
      } catch (err) {
        redirectToLogin();
        return Promise.reject(err);
      } finally {
        isTokenRefreshing = false;
      }
    } else {
      // 이미 재발급 중이면 요청을 큐에 저장
      return new Promise((resolve, reject) => {
        requestQueue.push({ config: originalConfig, resolve, reject });
      });
    }
  },
  async (error) => {
    // HTTP 401 직접 처리 (서버가 status로만 내려주는 경우)
    const { response, config } = error || {};
    if (response?.status === 401 && config && !config.__isRetryRequest) {
      // 위와 동일한 큐잉/재발급 로직으로 보낼 수도 있지만
      // 서버별 정책 차이 커서 여기선 로그인 화면으로 보냄
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export { api, instance, authApi };
