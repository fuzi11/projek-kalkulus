import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; 
const socket: Socket = io(SERVER_URL);

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #050a05;
  background-image: 
    radial-gradient(circle at top right, rgba(6, 182, 212, 0.15) 0%, transparent 40%),
    radial-gradient(circle at bottom left, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
    radial-gradient(circle at center, rgba(6, 78, 59, 0.05) 0%, transparent 60%);
  color: white;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

const MainArea = styled.main`
  flex: 1;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const TitleWrapper = styled.div`
  position: relative;
  margin-bottom: 50px;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #22d3ee, #d946ef, transparent);
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.8);
    border-radius: 5px;
  }
`;

const TitleText = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: 5px;
  margin: 0;
  color: transparent;
  -webkit-text-stroke: 1.5px #e879f9;
  text-shadow: 0 0 20px rgba(232, 121, 249, 0.4);
  background: linear-gradient(to right, #fdf4ff, #e879f9);
  -webkit-background-clip: text;
  background-clip: text;
`;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SyncingText = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #22d3ee;
  font-family: monospace;
  font-size: 1rem;
  letter-spacing: 2px;
  animation: ${pulse} 1.5s infinite;
  text-transform: uppercase;
`;

const ItemCard = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${(props) => props.$isCurrentUser ? 'linear-gradient(90deg, #3b0764, #2e1065)' : '#022c22'};
  border: 1px solid ${(props) => props.$isCurrentUser ? '#d946ef' : '#065f46'};
  box-shadow: ${(props) => props.$isCurrentUser ? '0 0 20px rgba(217, 70, 239, 0.2)' : 'none'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.$isCurrentUser ? '0 0 25px rgba(217, 70, 239, 0.4)' : '0 5px 20px rgba(34, 211, 238, 0.1)'};
    border-color: ${(props) => props.$isCurrentUser ? '#f0abfc' : '#10b981'};
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const RankBadge = styled.div<{ $isCurrentUser: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  background-color: ${(props) => props.$isCurrentUser ? '#a855f7' : '#064e3b'};
  color: ${(props) => props.$isCurrentUser ? '#ffffff' : '#34d399'};
  box-shadow: ${(props) => props.$isCurrentUser ? '0 0 10px rgba(168, 85, 247, 0.5)' : 'none'};
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NameText = styled.span<{ $isCurrentUser: boolean }>`
  font-size: 1.05rem;
  font-weight: 600;
  color: ${(props) => props.$isCurrentUser ? '#ffffff' : '#e2e8f0'};
  letter-spacing: 0.5px;
`;

const YouLabel = styled.span`
  background-color: #f0abfc;
  color: #4a044e;
  font-size: 0.65rem;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 1px;
`;

const ScoreText = styled.div<{ $isCurrentUser: boolean }>`
  font-size: 1.15rem;
  font-weight: 800;
  color: ${(props) => props.$isCurrentUser ? '#f0abfc' : '#34d399'};
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  span {
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 4px;
    color: ${(props) => props.$isCurrentUser ? '#d8b4fe' : '#059669'};
  }
`;

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{"name": ""}');

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/leaderboard`);
        const data = await res.json();
        if (data.success && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      } catch (error) {}
    };
    fetchInitialLeaderboard();

    socket.on('update_leaderboard', (data) => {
      setLeaderboard(data);
    });

    return () => { 
      socket.off('update_leaderboard'); 
    };
  }, []);

  return (
    <PageContainer>
      <Header />
      
      <MainArea>
        <TitleWrapper>
          <TitleText>PERINGKAT</TitleText>
        </TitleWrapper>

        <ListWrapper>
          {leaderboard.length === 0 ? (
            <SyncingText>Menyinkronkan data...</SyncingText>
          ) : (
            leaderboard.map((p, i) => {
              const playerName = p.name || p.nama || p.username || p.npm || "Unknown Agent";
              const isCurrentUser = playerName === user.name || playerName === user.npm;

              return (
                <ItemCard key={i} $isCurrentUser={isCurrentUser}>
                  <LeftSection>
                    <RankBadge $isCurrentUser={isCurrentUser}>
                      {i + 1}
                    </RankBadge>
                    
                    <PlayerInfo>
                      <NameText $isCurrentUser={isCurrentUser}>
                        {playerName}
                      </NameText>
                      {isCurrentUser && <YouLabel>YOU</YouLabel>}
                    </PlayerInfo>
                  </LeftSection>
                  
                  <ScoreText $isCurrentUser={isCurrentUser}>
                    {p.points} <span>PTS</span>
                  </ScoreText>
                </ItemCard>
              );
            })
          )}
        </ListWrapper>
      </MainArea>
    </PageContainer>
  );
}