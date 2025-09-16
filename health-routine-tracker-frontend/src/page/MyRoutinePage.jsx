import { useEffect, useState } from "react";
import HeaderComponent from "../component/HeaderComponent";
import MenuComponent from "../component/MenuComponent";
import RoutineComponent from "../component/RoutineComponent";
import Spinner from "../component/common/Spinner";
import { fetchRoutines } from "../hooks/useRoutine";

const MyRoutinePage = () => {
  // ✅ 게시글
  const [routines, setRoutines] = useState([]);
  // ✅ 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // ✅ 더미데이터 -> 나중에 삭제 !!
  const dummy = [
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

  useEffect(() => {
    // 언마운트 레이스 가드
    let mounted = true;
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchRoutines();
        if (mounted) setRoutines(Array.isArray(data) ? data : dummy);
      } catch (e) {
        if (mounted) setRoutines(dummy);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container">
      <HeaderComponent title="My Routine" />
      <div className="d-flex">
        <MenuComponent />
        <div className="m-0 p-0 w-100">
          <div>
            {isLoading ? (
              <Spinner />
            ) : routines.length > 0 ? (
              routines.map((routine, idx) => (
                <RoutineComponent
                  key={routine.id ?? routine.nickname ?? idx} // ✅ key 추가
                  routine={routine}
                />
              ))
            ) : (
              <p className="text-center py-4">게시글이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRoutinePage;
