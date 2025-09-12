import { useNavigate } from "react-router-dom";
import RoutineComponent from "../component/RoutineComponent";

const MainPage = () => {
  const navigation = useNavigate();
  const homeHandler = () => {
    navigation("/");
  };

  // dummy data
  const users = [
    {
      nickname: "민재",
      sleepingTime: "07:23:23",
      water: "1200",
      exercise: "Gym",
    },
    {
      nickname: "성우",
      sleepingTime: "04:23:21",
      water: "1800",
      exercise: "Running",
    },
    {
      nickname: "수연",
      sleepingTime: "03:00:21",
      water: "800",
      exercise: null,
    },
  ];

  return (
    <div>
      <div className="container d-flex align-items-center">
        <img src="/static/logo.png" alt="HRT" onClick={homeHandler} />
        <p>메인페이지</p>
      </div>
      <div className="d-flex container">
        <div className="w-25 border-end me-3">메뉴창</div>
        <div className="m-0 p-0 w-100">
          {users.map((user) => {
            return <RoutineComponent user={user} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
