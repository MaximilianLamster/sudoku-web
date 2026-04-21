import type { Board, SudokuBoard } from "./types";
import { Difficulty, DIFFICULTY_RANGES } from "./types";
import { solveBySingles } from "./solver";

/**
 * Erzeugt ein zufällig gemischtes Array der Zahlen 1-9.
 */
function shuffledDigits(): number[] {
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [digits[i], digits[j]] = [digits[j], digits[i]];
  }
  return digits;
}

/**
 * Prüft ob ein Wert an einer bestimmten Position gültig ist.
 */
function isValid(board: Board, row: number, col: number, num: number): boolean {
  // Zeile prüfen
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }

  // Spalte prüfen
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }

  // 3x3-Box prüfen
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
}

/**
 * Erzeugt ein vollständiges, gültiges 9x9 Sudoku-Board mittels Backtracking
 * mit zufälliger Ziffernreihenfolge.
 */
export function generateFullBoard(): Board {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function fill(pos: number): boolean {
    if (pos === 81) return true;

    const row = Math.floor(pos / 9);
    const col = pos % 9;

    const digits = shuffledDigits();
    for (const num of digits) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (fill(pos + 1)) return true;
        board[row][col] = 0;
      }
    }

    return false;
  }

  fill(0);
  return board;
}

/**
 * Deep-Copy eines Boards.
 */
function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

/**
 * Erzeugt eine zufällige Permutation der Indizes 0..n-1.
 */
function shuffledIndices(n: number): number[] {
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

/**
 * Erzeugt ein Sudoku-Puzzle mit dem angegebenen Schwierigkeitsgrad.
 *
 * Algorithmus:
 * 1. Vollständiges Board generieren
 * 2. Zellen in zufälliger Reihenfolge entfernen
 * 3. Nach jeder Entfernung: Solver-Check ob noch mit Singles lösbar
 * 4. Falls nicht lösbar: Zelle wieder einsetzen
 * 5. Stoppen wenn Zielbereich erreicht
 * 6. Falls Zielbereich nicht erreichbar: neues Board starten (max Retries)
 */
export function generateSudoku(difficulty: Difficulty): SudokuBoard {
  const range = DIFFICULTY_RANGES[difficulty];
  const maxRetries = 20;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const solution = generateFullBoard();
    const puzzle = cloneBoard(solution);
    const cellOrder = shuffledIndices(81);

    let removedCount = 0;

    for (const idx of cellOrder) {
      if (removedCount >= range.max) break;

      const row = Math.floor(idx / 9);
      const col = idx % 9;

      if (puzzle[row][col] === 0) continue;

      const backup = puzzle[row][col];
      puzzle[row][col] = 0;
      removedCount++;

      // Prüfen ob noch mit Singles lösbar
      const solved = solveBySingles(puzzle);
      if (solved === null) {
        // Nicht lösbar — Zelle wieder einsetzen
        puzzle[row][col] = backup;
        removedCount--;
      }
    }

    if (removedCount >= range.min) {
      return { solution, puzzle, difficulty };
    }
    // Zielbereich nicht erreicht — neues Board versuchen
  }

  // Fallback: letzten Versuch zurückgeben (sollte selten vorkommen)
  // Nochmal ein Board generieren und so viele Zellen wie möglich entfernen
  const solution = generateFullBoard();
  const puzzle = cloneBoard(solution);
  const cellOrder = shuffledIndices(81);

  for (const idx of cellOrder) {
    const row = Math.floor(idx / 9);
    const col = idx % 9;

    if (puzzle[row][col] === 0) continue;

    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    const solved = solveBySingles(puzzle);
    if (solved === null) {
      puzzle[row][col] = backup;
    }
  }

  return { solution, puzzle, difficulty };
}
