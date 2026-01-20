import "../css/menu.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useUserStore } from "../stores/useAuthStore";

const HeaderComponent = ({ title }) => {
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.reset);
  const resetAuth = useAuthStore((state) => state.reset);
  const navigation = useNavigate();

  const homeHandler = () => {
    navigation("/");
  };
  const loginHandler = () => {
    navigation("/login");
  };
  const logoutHandler = () => {
    // ✅ 두 store 모두 초기화
    resetUser();
    resetAuth();
    localStorage.clear();
    navigation("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-3">
        <img
          src="/static/logo.png"
          alt="HRT"
          onClick={homeHandler}
          className="header-main"
        />
        {title ? <div className="fs-2 fst-italic">{title}</div> : <div></div>}
      </div>
      {user ? (
        <div className=" d-flex align-items-center gap-3">
          <div>{user.nickname} 님, 환영합니다!</div>
          <button
            type="button"
            onClick={logoutHandler}
            className="btn btn-outline-secondary"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-3">
          <div>로그인 후 이용해주세요.</div>
          <button
            type="button"
            onClick={loginHandler}
            className="btn btn-outline-secondary"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

const imgStyle = {
  width: 30,
};

export default HeaderComponent;
