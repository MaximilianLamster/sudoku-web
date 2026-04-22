import { useState, useEffect, useCallback, useMemo } from "react";
import type { Board } from "../engine/types";
import { Difficulty } from "../engine/types";
import { generateSudoku } from "../engine/generator";

interface SelectedCell {
  row: number;
  col: number;
}

export type GameState = "playing" | "won" | "lost";

export interface UseSudokuGameReturn {
  solution: Board;
  initialPuzzle: Board;
  puzzle: Board;
  selectedCell: SelectedCell | null;
  selectCell: (row: number, col: number) => void;
  setCellValue: (value: number) => void;
  erase: () => void;
  lives: number;
  errorCells: Set<string>;
  flashCells: Set<string>;
  gameState: GameState;
  hints: Map<string, Set<number>>;
  isHintMode: boolean;
  toggleHintMode: () => void;
  toggleHint: (value: number) => void;
  completedNumbers: Set<number>;
  isSelectedCellErasable: boolean;
}

function getConflictingCells(
  row: number,
  col: number,
  value: number,
  puzzle: Board
): string[] {
  const conflicts: string[] = [];

  // Same row
  for (let c = 0; c < 9; c++) {
    if (c !== col && puzzle[row][c] === value) {
      conflicts.push(`${row}-${c}`);
    }
  }

  // Same column
  for (let r = 0; r < 9; r++) {
    if (r !== row && puzzle[r][col] === value) {
      conflicts.push(`${r}-${col}`);
    }
  }

  // Same 3x3 box
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;
  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (r !== row && c !== col && puzzle[r][c] === value) {
        const key = `${r}-${c}`;
        if (!conflicts.includes(key)) {
          conflicts.push(key);
        }
      }
    }
  }

  return conflicts;
}

export function useSudokuGame(difficulty: Difficulty): UseSudokuGameReturn {
  const generated = useMemo(() => generateSudoku(difficulty), [difficulty]);

  const [solution] = useState<Board>(() => generated.solution);
  const [initialPuzzle] = useState<Board>(() =>
    generated.puzzle.map((row) => [...row])
  );
  const [puzzle, setPuzzle] = useState<Board>(() =>
    generated.puzzle.map((row) => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [lives, setLives] = useState(3);
  const [errorCells, setErrorCells] = useState<Set<string>>(new Set());
  const [conflictMap, setConflictMap] = useState<Map<string, string[]>>(new Map());
  const [gameState, setGameState] = useState<GameState>("playing");
  const [hints, setHints] = useState<Map<string, Set<number>>>(new Map());
  const [isHintMode, setIsHintMode] = useState(false);

  // Derive flashCells from conflictMap
  const flashCells = useMemo(() => {
    const set = new Set<string>();
    conflictMap.forEach((conflicts) => {
      conflicts.forEach((key) => set.add(key));
    });
    return set;
  }, [conflictMap]);

  // Numbers where all 9 instances are correctly placed (spec 007)
  const completedNumbers = useMemo(() => {
    const counts = new Map<number, number>();
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = puzzle[r][c];
        if (val !== 0 && val === solution[r][c]) {
          counts.set(val, (counts.get(val) ?? 0) + 1);
        }
      }
    }
    const completed = new Set<number>();
    counts.forEach((count, num) => {
      if (count === 9) completed.add(num);
    });
    return completed;
  }, [puzzle, solution]);

  // Erase button is active when selected cell has a wrong value or has hints only (spec 007 + 008)
  const isSelectedCellErasable = useMemo(() => {
    if (!selectedCell) return false;
    const { row, col } = selectedCell;
    const cellKey = `${row}-${col}`;
    if (errorCells.has(cellKey)) return true;
    if (puzzle[row][col] === 0 && hints.has(cellKey)) return true;
    return false;
  }, [selectedCell, errorCells, puzzle, hints]);

  const selectCell = useCallback((row: number, col: number) => {
    setSelectedCell((prev) =>
      prev && prev.row === row && prev.col === col ? null : { row, col }
    );
  }, []);

  const removeHintsForNumber = useCallback(
    (row: number, col: number, value: number) => {
      setHints((prev) => {
        const next = new Map(prev);
        let changed = false;

        // Same row
        for (let c = 0; c < 9; c++) {
          const key = `${row}-${c}`;
          const set = next.get(key);
          if (set && set.has(value)) {
            const newSet = new Set(set);
            newSet.delete(value);
            if (newSet.size === 0) {
              next.delete(key);
            } else {
              next.set(key, newSet);
            }
            changed = true;
          }
        }

        // Same column
        for (let r = 0; r < 9; r++) {
          const key = `${r}-${col}`;
          const set = next.get(key);
          if (set && set.has(value)) {
            const newSet = new Set(set);
            newSet.delete(value);
            if (newSet.size === 0) {
              next.delete(key);
            } else {
              next.set(key, newSet);
            }
            changed = true;
          }
        }

        // Same 3x3 box
        const boxRowStart = Math.floor(row / 3) * 3;
        const boxColStart = Math.floor(col / 3) * 3;
        for (let r = boxRowStart; r < boxRowStart + 3; r++) {
          for (let c = boxColStart; c < boxColStart + 3; c++) {
            const key = `${r}-${c}`;
            const set = next.get(key);
            if (set && set.has(value)) {
              const newSet = new Set(set);
              newSet.delete(value);
              if (newSet.size === 0) {
                next.delete(key);
              } else {
                next.set(key, newSet);
              }
              changed = true;
            }
          }
        }

        return changed ? next : prev;
      });
    },
    []
  );

  const setCellValue = useCallback(
    (value: number) => {
      if (gameState !== "playing") return;
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      if (initialPuzzle[row][col] !== 0) return;

      // Guard: correct cells cannot be overwritten (spec 007)
      const currentValue = puzzle[row][col];
      if (currentValue !== 0 && currentValue === solution[row][col]) return;

      const isCorrect = value === solution[row][col];
      const cellKey = `${row}-${col}`;

      // Clear hints for this cell (spec 008)
      setHints((prev) => {
        if (!prev.has(cellKey)) return prev;
        const next = new Map(prev);
        next.delete(cellKey);
        return next;
      });

      // Set the value
      setPuzzle((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = value;
        return next;
      });

      if (isCorrect) {
        // Cell stays selected after correct answer (spec 009)

        // Remove error state and conflicts if overwriting a previous wrong answer
        setErrorCells((prev) => {
          if (!prev.has(cellKey)) return prev;
          const next = new Set(prev);
          next.delete(cellKey);
          return next;
        });
        setConflictMap((prev) => {
          if (!prev.has(cellKey)) return prev;
          const next = new Map(prev);
          next.delete(cellKey);
          return next;
        });

        // Remove this value from hints in same row/col/box
        removeHintsForNumber(row, col, value);

        // Check for win: all cells filled and match solution
        setPuzzle((current) => {
          let allCorrect = true;
          for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
              if (current[r][c] !== solution[r][c]) {
                allCorrect = false;
                break;
              }
            }
            if (!allCorrect) break;
          }
          if (allCorrect) {
            setGameState("won");
          }
          return current;
        });
      } else {
        // Wrong answer
        setErrorCells((p) => new Set(p).add(cellKey));
        setLives((p) => {
          const newLives = p - 1;
          if (newLives === 0) {
            setGameState("lost");
          }
          return newLives;
        });

        // Track conflicting cells for this error
        setPuzzle((current) => {
          const conflicts = getConflictingCells(row, col, value, current);
          setConflictMap((prev) => {
            const next = new Map(prev);
            next.set(cellKey, conflicts);
            return next;
          });
          return current;
        });
      }
    },
    [selectedCell, initialPuzzle, solution, puzzle, gameState, removeHintsForNumber]
  );

  const toggleHintMode = useCallback(() => {
    setIsHintMode((prev) => !prev);
  }, []);

  const toggleHint = useCallback(
    (value: number) => {
      if (gameState !== "playing") return;
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      if (initialPuzzle[row][col] !== 0) return;
      if (puzzle[row][col] > 0) return; // only on empty cells (spec 008)

      const cellKey = `${row}-${col}`;

      setHints((prev) => {
        const currentSet = prev.get(cellKey);

        // If hint already present, remove it (toggle off)
        if (currentSet && currentSet.has(value)) {
          const next = new Map(prev);
          const newSet = new Set(currentSet);
          newSet.delete(value);
          if (newSet.size === 0) {
            next.delete(cellKey);
          } else {
            next.set(cellKey, newSet);
          }
          return next;
        }

        // Collision check: does value exist as placed number in same row/col/box?
        for (let c = 0; c < 9; c++) {
          if (puzzle[row][c] === value) return prev;
        }
        for (let r = 0; r < 9; r++) {
          if (puzzle[r][col] === value) return prev;
        }
        const boxRowStart = Math.floor(row / 3) * 3;
        const boxColStart = Math.floor(col / 3) * 3;
        for (let r = boxRowStart; r < boxRowStart + 3; r++) {
          for (let c = boxColStart; c < boxColStart + 3; c++) {
            if (puzzle[r][c] === value) return prev;
          }
        }

        // No conflict, add hint
        const next = new Map(prev);
        const newSet = new Set(currentSet || []);
        newSet.add(value);
        next.set(cellKey, newSet);
        return next;
      });
    },
    [selectedCell, initialPuzzle, puzzle, gameState]
  );

  // Unified context-sensitive erase (spec 008)
  const erase = useCallback(() => {
    if (gameState !== "playing") return;
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (initialPuzzle[row][col] !== 0) return;

    const cellKey = `${row}-${col}`;

    if (errorCells.has(cellKey)) {
      // Clear wrong value
      setErrorCells((prev) => {
        const next = new Set(prev);
        next.delete(cellKey);
        return next;
      });
      setConflictMap((prev) => {
        if (!prev.has(cellKey)) return prev;
        const next = new Map(prev);
        next.delete(cellKey);
        return next;
      });
      setPuzzle((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = 0;
        return next;
      });
    } else if (puzzle[row][col] === 0 && hints.has(cellKey)) {
      // Clear hints on empty cell
      setHints((prev) => {
        if (!prev.has(cellKey)) return prev;
        const next = new Map(prev);
        next.delete(cellKey);
        return next;
      });
    }
  }, [selectedCell, initialPuzzle, errorCells, puzzle, hints, gameState]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (gameState !== "playing") return;
      if (!selectedCell) return;

      const digitMatch = e.code.match(/^(?:Digit|Numpad)(\d)$/);
      if (digitMatch) {
        const num = parseInt(digitMatch[1], 10);
        if (num >= 1 && num <= 9) {
          if (isHintMode) {
            toggleHint(num);
          } else if (!completedNumbers.has(num)) {
            setCellValue(num);
          }
        }
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        erase();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, setCellValue, erase, gameState, isHintMode, toggleHint, completedNumbers]);

  return {
    solution,
    initialPuzzle,
    puzzle,
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
  };
}
