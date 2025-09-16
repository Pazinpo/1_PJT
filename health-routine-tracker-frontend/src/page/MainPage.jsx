import { useNavigate } from "react-router-dom";
import RoutineComponent from "../component/RoutineComponent";
import MenuComponent from "../component/MenuComponent";
import HeaderComponent from "../component/HeaderComponent";

const MainPage = () => {
  const navigation = useNavigate();

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
      <HeaderComponent />
      <div className="d-flex container">
        {/* <div className="w-25 border-end me-3">메뉴창</div> */}
        <MenuComponent />
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
