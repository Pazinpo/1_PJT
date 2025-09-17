import "../css/menu.css";
import { useNavigate } from "react-router-dom";

const MenuComponent = () => {
  const navigate = useNavigate();

  // home 버튼 클릭 핸들러
  const homeHandler = () => {
    navigate("/");
  };
  // mypage 버튼 클릭 핸들러
  // todo : url 연결 필요
  const myPageHandler = () => {
    navigate("/mypage/myroutine");
  };
  // create routine 버튼 클릭 핸들러
  // todo : url 연결 필요
  const createPageHandler = () => {
    navigate("/post");
  };

  return (
    <div className="w-25 border-end me-3 d-flex flex-column justify-content-between">
      <div className="d-flex flex-column gap-3">
        <div className="menu" onClick={homeHandler}>
          HOME
        </div>
        <div className="menu" onClick={myPageHandler}>
          MyPage
        </div>
        <div className="menu" onClick={createPageHandler}>
          Create Routine
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
