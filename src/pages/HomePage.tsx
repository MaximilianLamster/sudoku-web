import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

interface ContainerProps {
  $fading: boolean;
}

const Container = styled.div<ContainerProps>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #071e1e, #050505);
  animation: ${(props) => (props.$fading ? fadeOut : fadeIn)} ${(props) => (props.$fading ? "0.4s" : "0.5s")} ease forwards;
`;

const Title = styled.h1`
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

interface DifficultyButtonProps {
  $color: string;
}

const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: 1rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  background-color: ${(props) => props.$color};
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  cursor: pointer;
  min-width: 240px;
  transition: box-shadow 0.3s ease, transform 0.15s ease, border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

function HomePage() {
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  const handleClick = (path: string) => {
    setFading(true);
    setTimeout(() => navigate(path), 400);
  };

  return (
    <Container $fading={fading}>
      <Title>Designer Sudoku</Title>
      <ButtonGroup>
        <DifficultyButton
          $color="#0d3d3d"
          onClick={() => handleClick("/play/easy")}
        >
          Easy
        </DifficultyButton>
        <DifficultyButton
          $color="#082020"
          onClick={() => handleClick("/play/medium")}
        >
          Medium
        </DifficultyButton>
        <DifficultyButton
          $color="#0a0a0a"
          onClick={() => handleClick("/play/hard")}
        >
          Hard
        </DifficultyButton>
      </ButtonGroup>
    </Container>
  );
}

export default HomePage;
