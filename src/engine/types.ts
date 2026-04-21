/** 9x9 Board — Werte 1-9 für gefüllte Zellen, 0 für leere Zellen */
export type Board = number[][];

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export interface DifficultyRange {
  min: number;
  max: number;
}

/** Anzahl fehlender Zellen pro Schwierigkeitsgrad */
export const DIFFICULTY_RANGES: Record<Difficulty, DifficultyRange> = {
  [Difficulty.EASY]: { min: 30, max: 35 },
  [Difficulty.MEDIUM]: { min: 36, max: 45 },
  [Difficulty.HARD]: { min: 46, max: 53 },
};

export interface SudokuBoard {
  solution: Board;
  puzzle: Board;
  difficulty: Difficulty;
}
