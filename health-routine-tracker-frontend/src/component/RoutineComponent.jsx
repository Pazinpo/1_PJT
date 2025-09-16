import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useState } from "react";

const RoutineComponent = ({ user }) => {
  const [like, setLike] = useState(false);
  return (
    <Container className="shadow-sm px-3 pt-3 mb-3">
      <p className="mb-5 ">{user.nickname}</p>
      <Container className="d-flex gap-5 pb-4">
        {/* sleeping time */}
        <Row className="align-items-center" xs="auto">
          <Image
            src="/static/alarm.png"
            alt="sleeping"
            width={35}
            height={35}
            className="p-0"
          />
          <p className="m-0">
            {user.sleepingTime ? user.sleepingTime : "--:--:--"}
          </p>
        </Row>

        {/* water */}
        <Row className="align-items-center" xs="auto">
          <Image
            src="/static/droplet.png"
            alt="sleeping"
            width={35}
            height={35}
            className="p-0"
          />
          <p className="m-0">{user.water ? user.water : "000"}ml</p>
        </Row>

        {/* exercise */}
        <Row className="align-items-center" xs="auto">
          <Image
            src="/static/directions_walk.png"
            alt="sleeping"
            width={35}
            height={35}
            className="p-0"
          />
          <p className="m-0">{user.exercise ? user.exercise : "--"}</p>
        </Row>
      </Container>
      <Container className="pb-3 d-flex justify-content-end" xs="auto">
        {!like ? (
          <Image src="/static/heart.png" width={30} />
        ) : (
          <Image src="/static/heartFilled.png" width={30} />
        )}
      </Container>
    </Container>
  );
};

export default RoutineComponent;
