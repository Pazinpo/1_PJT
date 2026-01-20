import RoutineComponent from "../component/RoutineComponent";
import MenuComponent from "../component/MenuComponent";
import HeaderComponent from "../component/HeaderComponent";
import { useEffect, useState } from "react";
import Spinner from "../component/common/Spinner";
import { fetchRoutines } from "../hooks/useRoutine";
import { useUserStore } from "../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const user = useUserStore((state) => state.user);

  // ✅ 게시글
  const [routines, setRoutines] = useState([]);
  // ✅ 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // ✅ navigation
  const navigation = useNavigate();

  const btnHandler = () => {
    navigation("/post");
  };

  const routineHandler = (id) => {
    navigation(`/detail/${id}`);
  };

  useEffect(() => {
    // 언마운트 레이스 가드
    let mounted = true;
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchRoutines(user);
        console.log(">>>>> ", data);
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
    <div className="container d-flex flex-column">
      <HeaderComponent />
      <div className="d-flex">
        <MenuComponent />
        <div className="m-0 p-0 w-100">
          {isLoading ? (
            <Spinner />
          ) : routines.length > 0 ? (
            routines.map((routine, idx) => (
              // link 데코 없애기
              <Link to={`/detail/${routine.id}`}>
                <RoutineComponent
                  key={routine.id ?? routine.nickname ?? idx}
                  routine={routine}
                />
              </Link>
            ))
          ) : (
            <div className="d-flex flex-column align-items-center">
              <p className="text-center py-4">게시글이 없습니다.</p>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={btnHandler}
              >
                루틴 작성하러 가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
