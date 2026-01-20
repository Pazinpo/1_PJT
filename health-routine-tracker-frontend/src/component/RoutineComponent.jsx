import "../css/routine.css";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { useUserStore } from "../stores/useAuthStore";

const RoutineComponent = ({ routine }) => {
  const [like, setLike] = useState(false);
  const user = useUserStore.getState().user;
  return (
    <div className="routine container  px-3 pt-3 mb-3">
      {/* <div className="routine container shadow-sm px-3 pt-3 mb-3"> */}
      <p className="mb-5 ">
        {/* 이름 날짜 디자인 수정 필요 */}
        {user.nickname} {routine.date}
      </p>
      <div className="container d-flex gap-5 pb-4 justify-content-justify-content-start">
        {/* sleeping time */}
        <div className="d-flex flex-row align-items-center gap-3" xs="auto">
          <Image
            src="/static/alarm.png"
            alt="sleeping"
            width={35}
            height={35}
            className="p-0"
          />
          <p className="m-0 w-25">
            {routine.sleepHours ? routine.sleepHours : "--:--:--"}
          </p>
        </div>

        {/* water */}
        <div className="d-flex flex-row align-items-center gap-3" xs="auto">
          <Image
            src="/static/droplet.png"
            alt="sleeping"
            width={35}
            height={35}
            className="p-0"
          />
          <p className="m-0 w-25">
            {routine.waterMl ? routine.waterMl : "000"}ml
          </p>
        </div>

        {/* exercise */}
        <div className="d-flex flex-row align-items-center gap-3" xs="auto">
          <Image
            src="/static/directions_walk.png"
            alt="sleeping"
            width={35}
            height={35}
            className="p-0"
          />
          <p className="m-0">
            {routine.exerciseType
              ? `${routine.exerciseType} : ${routine.exerciseMinutes}`
              : "--- : ---"}
          </p>
        </div>
      </div>
      <div className="container pb-3 d-flex justify-content-end" xs="auto">
        {!like ? (
          <Image src="/static/heart.png" width={30} />
        ) : (
          <Image src="/static/heartFilled.png" width={30} />
        )}
      </div>
    </div>
  );
};

export default RoutineComponent;
