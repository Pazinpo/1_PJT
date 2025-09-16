import "../css/routine.css";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const RoutineComponent = ({ routine }) => {
  const [like, setLike] = useState(false);
  return (
    <div className="routine container  px-3 pt-3 mb-3">
      {/* <div className="routine container shadow-sm px-3 pt-3 mb-3"> */}
      <p className="mb-5 ">{routine.nickname}</p>
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
            {routine.sleepingTime ? routine.sleepingTime : "--:--:--"}
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
          <p className="m-0 w-25">{routine.water ? routine.water : "000"}ml</p>
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
          <p className="m-0 w-25">
            {routine.exercise ? routine.exercise : "--"}
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
