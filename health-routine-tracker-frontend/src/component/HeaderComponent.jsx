import "../css/menu.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponent = ({ title }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const homeHandler = () => {
    navigation("/");
  };
  const loginHandler = () => {
    navigation("");
  };
  const logoutHandler = () => {
    navigation("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <img
          src="/static/logo.png"
          alt="HRT"
          onClick={homeHandler}
          className="header-main"
        />
        {title ? (
          <div className="fs-1 fst-italic text-dark-emphasis ps-3">{title}</div>
        ) : (
          <div></div>
        )}
      </div>
      {user ? (
        <div className=" d-flex align-items-center gap-3">
          <div>user 님, 환영합니다!</div>
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
