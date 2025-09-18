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

  useEffect(() => {
    // 언마운트 레이스 가드
    let mounted = true;
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchRoutines();
        if (mounted) setRoutines(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setRoutines([]);
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
