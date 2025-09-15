import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/* ===== styled-components ===== */
const Container = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f2f2f2;
`;

const FormWrapper = styled.div`
  width: 360px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  display: grid;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0 0 6px 0;
  text-align: center;
`;

const Input = styled.input`
  height: 42px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0 12px;
  outline: none;
  &:focus {
    border-color: #2d6cdf;
    box-shadow: 0 0 0 3px rgba(45, 108, 223, 0.15);
  }
`;

const Button = styled.button`
  height: 44px;
  border: none;
  border-radius: 8px;
  background: #2d6cdf;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

const Divider = styled.hr`
  height: 4px;
  background: #111;
  border: 0;
  margin: 18px 0 16px;
`;

const LinkRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* 버튼 사이 간격 */
  margin-top: 6px;
`;

const TextLink = styled.button`
  background: #e6e6e6;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 16px;
  min-width: 100px;
  cursor: pointer;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);

  &:hover {
    filter: brightness(0.97);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const Header = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 200px;
  width: auto;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const moveUrl = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !passwd) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    alert("로그인 성공! ");
    moveUrl("/blog");
  };

  return (
    <Container>
      <Header>
        <Logo src="/logo.png" alt="HRT 로고" />
      </Header>
      <FormWrapper>
        <Title>로그인</Title>
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          required
        />
        <Button type="button" onClick={handleSubmit}>
          로그인
        </Button>
        <Divider />
        <LinkRow>
          <TextLink>아이디 찾기</TextLink>
          <TextLink>비밀번호 찾기</TextLink>
          <TextLink onClick={() => moveUrl("/signup")}>회원가입</TextLink>
        </LinkRow>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
