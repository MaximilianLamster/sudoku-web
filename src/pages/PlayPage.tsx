import { useCallback, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Difficulty } from "../engine/types";
import { useSudokuGame } from "../hooks/useSudokuGame";
import SudokuGrid from "../components/SudokuGrid";
import NumberPad from "../components/NumberPad";
import Lives from "../components/Lives";
import GameOverlay from "../components/GameOverlay";

const DIFFICULTY_MAP: Record<string, Difficulty> = {
  easy: Difficulty.EASY,
  medium: Difficulty.MEDIUM,
  hard: Difficulty.HARD,
};

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
  color: #fff;
  padding: 2rem;
  position: relative;
  animation: ${(props) => (props.$fading ? fadeOut : fadeIn)} ${(props) => (props.$fading ? "0.4s" : "0.5s")} ease forwards;
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  z-index: 10;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin: 1.5rem 0;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled.button`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const DifficultyLabel = styled.span`
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: capitalize;
`;

function PlayPage() {
  const { difficulty: diffParam } = useParams<{ difficulty: string }>();
  const mapped = diffParam ? DIFFICULTY_MAP[diffParam.toLowerCase()] : undefined;

  if (!mapped) {
    return <Navigate to="/" replace />;
  }

  return <PlayPageInner difficulty={mapped} label={diffParam!} />;
}

interface PlayPageInnerProps {
  difficulty: Difficulty;
  label: string;
}

function PlayPageInner({ difficulty, label }: PlayPageInnerProps) {
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  const fadeToHome = useCallback(() => {
    setFading(true);
    setTimeout(() => navigate("/"), 400);
  }, [navigate]);

  const {
    puzzle,
    initialPuzzle,
    selectedCell,
    selectCell,
    setCellValue,
    clearCell,
    lives,
    errorCells,
    flashCells,
    gameState,
    hints,
    isHintMode,
    toggleHintMode,
    toggleHint,
    clearHints,
  } = useSudokuGame(difficulty);

  const handleNumberClick = useCallback(
    (n: number) => {
      if (isHintMode) {
        toggleHint(n);
      } else {
        setCellValue(n);
      }
    },
    [isHintMode, toggleHint, setCellValue]
  );

  const handleErase = useCallback(() => {
    if (isHintMode) {
      clearHints();
    } else {
      clearCell();
    }
  }, [isHintMode, clearHints, clearCell]);

  return (
    <Container $fading={fading}>
      <TopBar>
        <BackButton onClick={fadeToHome}>← Zurück</BackButton>
        <Lives lives={lives} />
      </TopBar>
      <GameContent>
        <SudokuGrid
          puzzle={puzzle}
          initialPuzzle={initialPuzzle}
          selectedCell={selectedCell}
          onCellClick={selectCell}
          errorCells={errorCells}
          flashCells={flashCells}
          hints={hints}
        />
        <Divider />
        <NumberPad
          onNumberClick={handleNumberClick}
          onErase={handleErase}
          isHintMode={isHintMode}
          onToggleHintMode={toggleHintMode}
        />
      </GameContent>
      <DifficultyLabel>{label}</DifficultyLabel>
      {gameState !== "playing" && <GameOverlay type={gameState} onOkay={fadeToHome} />}
    </Container>
  );
}

export default PlayPage;
