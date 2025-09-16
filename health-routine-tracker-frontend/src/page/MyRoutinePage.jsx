import HeaderComponent from "../component/HeaderComponent";
import MenuComponent from "../component/MenuComponent";
import RoutineComponent from "../component/RoutineComponent";

const MyRoutinePage = () => {
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
    <div className="container">
      <HeaderComponent title="My Routine" />
      <div className="d-flex">
        <MenuComponent />
        <div className="m-0 p-0 w-100">
          <div>
            {users.map((user) => {
              return <RoutineComponent user={user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoutinePage;
