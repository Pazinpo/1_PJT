import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import api from "../api/axios"; // 백엔드 붙일 때 사용

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !passwd) return alert("이메일/비밀번호를 입력하세요.");

    // // 백엔드 연결 시
    // const res = await api.post("/auth/login", { email, password: passwd });
    // localStorage.setItem("accessToken", res.data.token);

    alert("로그인 성공!(UI 테스트)");
    navigate("/blog");
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
              <div>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="비밀번호"
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                로그인
              </button>
            </form>
            
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
