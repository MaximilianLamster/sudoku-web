import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ThemeToggle from "../components/ThemeToggle";

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
  background: ${({ theme }) => theme.background};
  position: relative;
  animation: ${(props) => (props.$fading ? fadeOut : fadeIn)} ${(props) =>
    props.$fading ? "0.4s" : "0.5s"} ease forwards;
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem 1.5rem;
  z-index: 10;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.titleColor};
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
  $variant: "easy" | "medium" | "hard";
}

const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: 1rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textUser};
  background-color: ${({ theme, $variant }) => {
    if ($variant === "easy") return theme.diffButtonEasyBg;
    if ($variant === "medium") return theme.diffButtonMediumBg;
    return theme.diffButtonHardBg;
  }};
  border: 1px solid ${({ theme }) => theme.diffButtonBorder};
  border-radius: 12px;
  cursor: pointer;
  min-width: 240px;
  transition: box-shadow 0.3s ease, transform 0.15s ease, border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.diffButtonBorderHover};
    box-shadow: 0 0 15px 3px ${({ theme }) => theme.diffButtonShadowHover};
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
      <TopBar>
        <ThemeToggle />
      </TopBar>
      <Title>Simple Sudoku</Title>
      <ButtonGroup>
        <DifficultyButton
          $variant="easy"
          onClick={() => handleClick("/play/easy")}
        >
          Easy
        </DifficultyButton>
        <DifficultyButton
          $variant="medium"
          onClick={() => handleClick("/play/medium")}
        >
          Medium
        </DifficultyButton>
        <DifficultyButton
          $variant="hard"
          onClick={() => handleClick("/play/hard")}
        >
          Hard
        </DifficultyButton>
      </ButtonGroup>
    </Container>
  );
}

export default HomePage;
