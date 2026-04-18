import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #0b0512;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;
  color: white;
`;

const WaveBackgroundDark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
  background-color: #1a0a2d;
  clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 80% 50%, 60% 30%, 40% 60%, 20% 40%, 0% 55%);
  z-index: 0;
`;

const WaveBackgroundLight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background-color: #261142;
  clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 75% 55%, 50% 25%, 25% 65%, 0% 40%);
  z-index: 1;
`;

const TopLeftLogo = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  font-size: 1.2rem;
  font-weight: 800;
  font-style: italic;
  letter-spacing: 2px;
  color: #d1baf4;
  z-index: 10;
`;

const TitleContainer = styled.div`
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  font-style: italic;
  margin: 0;
  padding: 0;
  background: linear-gradient(to right, #d3a4f9, #a666f2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(166, 102, 242, 0.6);
  letter-spacing: 4px;
`;

const SubTitle = styled.p`
  font-size: 0.8rem;
  letter-spacing: 6px;
  color: #ff66b2;
  margin-top: 10px;
  font-weight: 600;
`;

const AbstractShapeLeft = styled.div`
  position: absolute;
  left: 15%;
  top: 45%;
  width: 80px;
  height: 80px;
  border: 1px solid rgba(166, 102, 242, 0.4);
  border-radius: 20px 5px 20px 5px;
  transform: rotate(-15deg);
  z-index: 5;
`;

const AbstractShapeRight = styled.div`
  position: absolute;
  right: 25%;
  top: 42%;
  font-size: 2rem;
  color: rgba(79, 209, 197, 0.3);
  font-weight: 300;
  z-index: 5;
  transform: rotate(15deg);
`;

const FormWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  margin-top: 40px;
  z-index: 10;
  background: linear-gradient(to bottom right, #ff66b2, #a666f2, #4fd1c5);
  padding: 2px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
`;

const FormInner = styled.form`
  background-color: #0d0714;
  border-radius: 15px;
  padding: 40px 50px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
`;

const LockBadge = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 210, 255, 0.4);
  transform: rotate(10deg);
  border: 2px solid rgba(255,255,255,0.2);
  z-index: 20;

  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const Label = styled.label`
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: #a0aec0;
  font-weight: 700;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  background-color: #1a0f2e;
  border: 1px solid rgba(166, 102, 242, 0.3);
  border-radius: 8px;
  padding: 18px 20px;
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    font-style: italic;
  }

  &:focus {
    border-color: #a666f2;
  }
`;

const InputRightIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.3);
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #b45af2, #8b31df);
  border: none;
  border-radius: 8px;
  padding: 20px;
  color: white;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(139, 49, 223, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(139, 49, 223, 0.6);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const ErrorText = styled.p`
  color: #ff4d4d;
  font-size: 0.8rem;
  text-align: center;
  margin: 0;
`;

export default function Login() {
  const [npm, setNpm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ npm })
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('storage'));
        navigate('/challenges');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Koneksi ke server gagal.');
    }
  };

  return (
    <PageContainer>
      <WaveBackgroundDark />
      <WaveBackgroundLight />
      <TopLeftLogo>ENIGMA</TopLeftLogo>
      <TitleContainer>
        <MainTitle>ENIGMA</MainTitle>
        <SubTitle>SECURE ACCESS PROTOCOL</SubTitle>
      </TitleContainer>
      <AbstractShapeLeft />
      <AbstractShapeRight>✕</AbstractShapeRight>
      <FormWrapper>
        <FormInner onSubmit={handleLogin}>
          <LockBadge>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </LockBadge>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Label>TERMINAL IDENTITY</Label>
            <InputContainer>
              <InputField 
                type="text" 
                value={npm}
                onChange={(e) => setNpm(e.target.value)}
                placeholder="Masukan NPM..." 
                required 
              />
              <InputRightIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 14 12 22 20 14"></polyline>
                  <polyline points="4 6 12 14 20 6"></polyline>
                </svg>
              </InputRightIcon>
            </InputContainer>
          </div>
          {error && <ErrorText>{error}</ErrorText>}
          <SubmitButton type="submit">
            INITIATE LOGIN
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
            </svg>
          </SubmitButton>
        </FormInner>
      </FormWrapper>
    </PageContainer>
  );
}