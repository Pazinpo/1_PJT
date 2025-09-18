import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios"; // BASE_URL = http://localhost:8080

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState(""); // 변수명은 passwd 유지
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!email.trim() || !passwd) {
      alert("이메일/비밀번호를 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      // BASE_URL이 http://localhost:8080 이므로 /v1 포함해서 호출
      const res = await api.post(
        "/v1/auth/login",
        { email: email.trim(), password: passwd },
        // 혹시 기본 Authorization 헤더가 세팅돼 있다면 제거
        { headers: { Authorization: undefined } }
      );

      // ✅ 백엔드가 바디로 토큰을 주는 경우만 신뢰 (CORS상 헤더는 읽지 않음)
      const token =
        res.data?.token ??
        res.data?.accessToken ??
        res.data?.jwt ??
        res.data?.authorization ??
        res.data?.data?.token ??
        res.data?.data?.accessToken ??
        "";

      if (!token) {
        // 응답 구조 확인용 로그 (개발 중에만)
        console.log("[login response data]", res.data);
        setErrMsg(
          "로그인 성공했지만 토큰을 받지 못했습니다. (응답 바디 확인 필요)"
        );
        return;
      }

      localStorage.setItem("accessToken", token);

      alert("로그인 성공!");
      navigate("/"); 
    } catch (error) {
      const status = error?.response?.status;
      const msg =
        error?.response?.data?.message ||
        (status === 401
          ? "아이디 또는 비밀번호가 올바르지 않습니다."
          : "로그인 실패. 잠시 후 다시 시도하세요.");
      setErrMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light position-relative">
      <div className="position-absolute top-0 start-0 m-3">
        <img src="/logo.png" alt="HRT" style={{ height: 120 }} />
      </div>

      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card shadow-sm"
          style={{ maxWidth: 420, width: "100%" }}
        >
          <div className="card-body p-4">
            <h3 className="text-center fw-bold mb-3">로그인</h3>

            <form onSubmit={handleSubmit} className="d-grid gap-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="비밀번호"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >
                {loading ? "로그인 중..." : "로그인"}
              </button>
            </form>

            {errMsg && (
              <div className="alert alert-danger mt-3" role="alert">
                {errMsg}
              </div>
            )}

            <hr className="my-4 border-3 border-dark opacity-100" />

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button type="button" className="btn btn-outline-secondary px-4">
                아이디 찾기
              </button>
              <button type="button" className="btn btn-outline-secondary px-4">
                비밀번호 찾기
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
