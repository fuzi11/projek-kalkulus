import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001'; 
const socket: Socket = io(SERVER_URL);

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a0b2e; /* Warna ungu gelap sesuai gambar */
  color: white;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
`;

const MainArea = styled.main`
  flex: 1;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const TitleText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 4px;
  margin: 0;
  color: #ffffff;
  text-transform: uppercase;
`;

const ListWrapper = styled.div`
  width: 100%;
  max-width: 800px; /* Ukuran lebih lebar sesuai gambar */
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const SyncingText = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #a855f7;
  font-size: 1.2rem;
  animation: ${pulse} 1.5s infinite;
`;

const ItemCard = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  border-radius: 12px;
  /* Warna background ungu sangat gelap untuk list item */
  background-color: ${(props) => props.$isCurrentUser ? '#7e22ce' : '#0f051d'};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.01);
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const RankBadge = styled.div`
  width: 40px;
  font-weight: 400;
  font-size: 1.8rem;
  color: #ffffff;
  text-align: center;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NameText = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: #ffffff;
`;

const YouLabel = styled.span`
  background-color: #a855f7;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 50px;
  opacity: 0.8;
  text-transform: uppercase;
`;

const ScoreText = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #ffffff;
  
  span {
    font-size: 1rem;
    margin-left: 8px;
    opacity: 0.9;
  }
`;

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{"name": "", "npm": ""}');

  useEffect(() => {
    const fetchInitialLeaderboard = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/api/leaderboard`);
        const data = await res.json();
        if (data.success && data.leaderboard) {
          setLeaderboard(data.leaderboard);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      }
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
              const isCurrentUser = playerName === user.name || (user.npm && playerName === user.npm);

              return (
                <ItemCard key={i} $isCurrentUser={isCurrentUser}>
                  <LeftSection>
                    <RankBadge>
                      {i + 1}
                    </RankBadge>
                    
                    <PlayerInfo>
                      <NameText>
                        {playerName}
                      </NameText>
                      {isCurrentUser && <YouLabel>YOU</YouLabel>}
                    </PlayerInfo>
                  </LeftSection>
                  
                  <ScoreText>
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