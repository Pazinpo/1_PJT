import { useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";    

/* ================= styles ================= */

const PageWrap = styled.div`
  min-height: 100vh;
  background: #f0f0f0;
  display: grid;
  place-items: center;
  position: relative;
`;

const TopBar = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
`;

const Logo = styled.img`
  height: 150px;     /* 로고 크기 조절 */
  width: auto;
  display: block;
  margin-bottom: 6px;
`;

const Bar = styled.div`
  height: 4px;
  width: 100vw;     /* 화면 가로 전체 */
  background: #111;
`;

const Panel = styled.div`
  width: 540px;                 /* 이미지 비율 감안해서 넓이 지정 */
  max-width: 90vw;
  background: #dcdcdc;          /* 연한 회색 패널 */
  border: 1px solid #bdbdbd;
  padding: 24px 28px;
  box-shadow: 0 10px 22px rgba(0,0,0,.08);
  display: grid;
  gap: 14px;
`;

const Title = styled.h2`
  margin: 0 0 4px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;          /* 이미지처럼 살짝 벌림 */
  color: #111;
  background: #dcdcdc;
`;

const Input = styled.input`
  height: 44px;
  font-size: 22px;              /* 이미지처럼 크게 */
  padding: 6px 14px;
  border: none;
  outline: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px #cfcfcf;

  &::placeholder { color: #666; }
`;

const Submit = styled.button`
  height: 46px;
  font-size: 22px;
  font-weight: 700;
  color: #0b260b;               /* 검은 텍스트 느낌 */
  background: #2bb140;          /* 초록 버튼 */
  border: 1px solid #218c33;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 6px;

  &:hover { filter: brightness(0.97); }
  &:active { transform: translateY(1px); }
`;


const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");

    const moveUrl = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("회원가입 성공")
        moveUrl("/login");
    };

    return (
    <PageWrap>
      <TopBar>
        <Logo src="/logo.png" alt="HRT" />
        <Bar />
      </TopBar>

      <Panel as="form" onSubmit={handleSubmit}>
        <Title>회원가입</Title>

        <Input
          type="email"
          placeholder="example@xx.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="password"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Submit type="submit">회원 가입</Submit>
      </Panel>
    </PageWrap>
  );
}

export default SignUpPage;