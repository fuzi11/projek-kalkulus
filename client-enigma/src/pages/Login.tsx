import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div` 
  min-height: 100vh;
  width: 100%;
  background-color: #08040f;
  background-image: 
    url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 250 150 500 50 T 1000 50' stroke='rgba(255,255,255,0.03)' fill='none' stroke-width='2'/%3E%3Cpath d='M0 150 Q 300 250 600 150 T 1200 150' stroke='rgba(255,255,255,0.03)' fill='none' stroke-width='2'/%3E%3Cpath d='M0 350 Q 400 450 800 350 T 1600 350' stroke='rgba(6, 182, 212, 0.08)' fill='none' stroke-width='1.5'/%3E%3Cpath d='M0 450 Q 450 550 900 450 T 1800 450' stroke='rgba(6, 182, 212, 0.06)' fill='none' stroke-width='1'/%3E%3Cpath d='M0 650 Q 550 750 1100 650 T 2200 650' stroke='rgba(6, 182, 212, 0.1)' fill='none' stroke-width='2.5'/%3E%3C/svg%3E"),
    radial-gradient(circle at bottom center, rgba(6, 182, 212, 0.45) 0%, rgba(8, 145, 178, 0.2) 35%, transparent 65%),
    radial-gradient(circle at top center, rgba(88, 28, 135, 0.4) 0%, rgba(46, 16, 101, 0.2) 50%, transparent 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  position: relative;
  overflow: hidden;
  color: white;
`;

const TopWaves = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  z-index: 0;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

const TopLeftLogo = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  font-size: 1.3rem;
  font-weight: 800;
  font-style: italic;
  letter-spacing: 1px;
  color: #c084fc; 
  z-index: 10;
`;

const TitleContainer = styled.div`
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;

const MainTitle = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  font-style: italic;
  margin: 0;
  padding: 0;
  color: transparent;
  -webkit-text-stroke: 2px #d946ef;
  text-shadow: 0 0 25px rgba(217, 70, 239, 0.6);
  letter-spacing: 2px;
`;

const SubTitle = styled.p`
  font-size: 0.8rem;
  letter-spacing: 6px;
  color: #cbd5e1;
  margin-top: -5px;
  font-weight: 600;
  text-transform: uppercase;
`;

const FormWrapperOuter = styled.div`
  position: relative;
  width: 90%;
  max-width: 680px;
  margin-top: 50px;
  z-index: 10;
  background: linear-gradient(to right, #d946ef, #06b6d4);
  border-radius: 16px;
  padding: 2px; 
  box-shadow: 0 0 30px rgba(217, 70, 239, 0.2), 0 0 30px rgba(6, 182, 212, 0.3);
`;

const FormInner = styled.form`
  background-color: #160a28;
  border-radius: 14px;
  padding: 40px 45px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
`;

const LockBadge = styled.div`
  position: absolute;
  top: -40px;
  right: -25px;
  width: 80px;
  height: 85px;
  background: linear-gradient(135deg, #22d3ee 0%, #0891b2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(15deg);
  box-shadow: -5px 10px 20px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(34, 211, 238, 0.8);
  border: 1px solid #a5f3fc;
  z-index: 20;

  svg {
    width: 45px;
    height: 45px;
    color: white;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
  }
`;

const Label = styled.label`
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  background-color: #1e1136;
  border: 1px solid #3b1e5e;
  border-radius: 8px;
  padding: 18px 20px;
  color: white;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #64748b;
    font-style: italic;
  }

  &:focus {
    border-color: #22d3ee;
    box-shadow: 0 0 10px rgba(34, 211, 238, 0.2);
  }
`;

const InputRightIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #22d3ee;
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #9333ea, #6b21a8);
  border: none;
  border-radius: 8px;
  padding: 18px;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
  box-shadow: 0 5px 15px rgba(107, 33, 168, 0.5);

  &:hover {
    filter: brightness(1.2);
  }
  
  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4d;
  font-size: 0.85rem;
  text-align: center;
  margin: 0;
  letter-spacing: 1px;
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
      <TopWaves>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2e1065" fillOpacity="0.6" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,181.3C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          <path fill="#17092b" fillOpacity="0.8" d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,208C840,203,960,149,1080,133.3C1200,117,1320,139,1380,149.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </TopWaves>

      <TopLeftLogo>ENIGMA</TopLeftLogo>
      
      <TitleContainer>
        <MainTitle>ENIGMA</MainTitle>
        <SubTitle>SECURE ACCESS PROTOCOL</SubTitle>
      </TitleContainer>

      <FormWrapperOuter>
        <LockBadge>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-3m0 0a1.5 1.5 0 00-1.5-1.5m1.5 1.5a1.5 1.5 0 011.5-1.5" opacity="0.6" />
          </svg>
        </LockBadge>

        <FormInner onSubmit={handleLogin}>
          
          <div>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8V4h4m8 0h4v4m0 8v4h-4m-8 0H4v-4" stroke="#22d3ee" strokeWidth="1" opacity="0.5"/>
                  <path d="M9 11a3 3 0 016 0c0 1.5-1 2.5-1 4m-4-2c0-1.5.5-2 1.5-2m-2.5 4a5 5 0 0110 0" stroke="#22d3ee" />
                </svg>
              </InputRightIcon>
            </InputContainer>
          </div>

          {error && <ErrorText>{error}</ErrorText>}

          <SubmitButton type="submit">
            INITIATE LOGIN 
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
            </svg>
          </SubmitButton>

        </FormInner>
      </FormWrapperOuter>

    </PageContainer>
  );
}