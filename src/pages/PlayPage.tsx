import { useCallback, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Difficulty } from "../engine/types";
import { useSudokuGame } from "../hooks/useSudokuGame";
import SudokuGrid from "../components/SudokuGrid";
import NumberPad from "../components/NumberPad";
import Lives from "../components/Lives";
import GameOverlay from "../components/GameOverlay";
import ThemeToggle from "../components/ThemeToggle";

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
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textUser};
  padding: 2rem;
  position: relative;

  @media (max-width: 599px) {
    padding: 5rem 1rem 1rem;
  }
  animation: ${(props) => (props.$fading ? fadeOut : fadeIn)} ${(props) =>
    props.$fading ? "0.4s" : "0.5s"} ease forwards;
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
  background: ${({ theme }) => theme.divider};
  margin: 1.5rem 0;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LivesRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const BackButton = styled.button`
  color: ${({ theme }) => theme.backButton};
  font-size: 0.9rem;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.textUser};
  }
`;

const DifficultyLabel = styled.span`
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.difficultyLabel};
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
    erase,
    lives,
    errorCells,
    flashCells,
    gameState,
    hints,
    isHintMode,
    toggleHintMode,
    toggleHint,
    completedNumbers,
    isSelectedCellErasable,
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

  return (
    <Container $fading={fading}>
      <TopBar>
        <BackButton onClick={fadeToHome}>← Zurück</BackButton>
        <ThemeToggle />
      </TopBar>
      <GameContent>
        <LivesRow>
          <Lives lives={lives} />
        </LivesRow>
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
          onErase={erase}
          isHintMode={isHintMode}
          onToggleHintMode={toggleHintMode}
          completedNumbers={completedNumbers}
          isErasable={isSelectedCellErasable}
        />
      </GameContent>
      <DifficultyLabel>{label}</DifficultyLabel>
      {gameState !== "playing" && <GameOverlay type={gameState} onOkay={fadeToHome} />}
    </Container>
  );
}

export default PlayPage;
