'use client'
import { useState } from 'react';
import styled from 'styled-components';
import AppLayout from "@/components/layout/MobileLayout";
import OrangeButton from '@/components/OrangeButton';
import { useRouter } from 'next/navigation';

const Wrapper = styled.div`
  margin-top: 150px;
  width: 100%; 
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
`;

const HeaderLogo = styled.img`
  padding: 35px 20px;
`;

const ButtonContainer = styled.div`
  gap: 13px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const Button = styled.input`
  width: 100%;
  padding: 13px 22px;
  border-radius: 15px;
  border: 0px;
  color: var(--gray6);
  background-color: var(--gray2);
  font-size: 16px;
  text-align: left;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const PasswordIcon = styled.img`
  position: absolute;
  right: 15px; 
  width: 23px;
`;

const ExtraButtonContainer = styled.div`
  font-size: 13px;
  display: flex;
  margin-top: 10px;
  color: var(--gray5);
  align-items: right;
  text-align: right;
  justify-content: flex-end;
`;

const SignUpButton = styled.button`
  font-size: 15px;
  margin: 0 5px;
  color: var(--gray5);
  border: 0px;
  background-color: white;
  width: auto;
`;

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const login = async () => {
    const response = await fetch('/api/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful login
      console.log(data.data.token)
      const { token } = data.data;
      localStorage.setItem('token', token);  
      router.push('/borrow');  
    } else {
      // Handle login failure
      setErrorMessage(data.message || '로그인에 실패하였습니다.');
    }
  };

  const handleClick = () => {
    router.push('/sign-up');
  };

  const findPassword = () => {
    router.push('/find-password');
  };

  return (
    <AppLayout>
      <Wrapper>
        <HeaderLogo src='/img/aeco-logo.svg'></HeaderLogo>
        <ButtonContainer>
          <Button 
            type="email" 
            placeholder="이메일" 
            value={email} 
            onChange={handleEmailChange} 
          />
          <PasswordInputContainer>
            <Button 
              type="password" 
              placeholder="비밀번호" 
              value={password} 
              onChange={handlePasswordChange} 
            />
            <PasswordIcon src="/img/pw-eye.svg" alt="Password Icon" />
          </PasswordInputContainer>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <OrangeButton text='로그인' onClick={login}></OrangeButton>
          <ExtraButtonContainer>
            <SignUpButton onClick={handleClick}>회원가입</SignUpButton> 
            <span> | </span>
            <SignUpButton onClick={findPassword}>비밀번호 찾기</SignUpButton>
          </ExtraButtonContainer>
        </ButtonContainer>
      </Wrapper>
    </AppLayout>
  );
};

export default SignUpPage;
