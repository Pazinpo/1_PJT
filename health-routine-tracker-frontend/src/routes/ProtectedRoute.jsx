import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore"; // accessToken 저장된 zustand
// (원하시면 user 객체로 검사해도 됩니다: useUserStore)

export default function ProtectedRoute() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const location = useLocation();

  const isAuthed = !!accessToken; // 또는 !!useUserStore((s)=>s.user)
  if (!isAuthed) {
    // 로그인 안 된 경우: 원래 가려던 위치를 state에 담아 로그인으로
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />; // 자식 라우트 렌더
}
