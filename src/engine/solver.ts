import type { Board } from "./types";

/**
 * Berechnet die Kandidaten (mögliche Werte) für eine leere Zelle.
 */
function getCandidates(board: Board, row: number, col: number): Set<number> {
  const candidates = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Zeile prüfen
  for (let c = 0; c < 9; c++) {
    candidates.delete(board[row][c]);
  }

  // Spalte prüfen
  for (let r = 0; r < 9; r++) {
    candidates.delete(board[r][col]);
  }

  // 3x3-Box prüfen
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      candidates.delete(board[r][c]);
    }
  }

  return candidates;
}

/**
 * Versucht Naked Singles anzuwenden.
 * Naked Single: Eine Zelle hat nur genau einen möglichen Kandidaten.
 * Gibt true zurück wenn mindestens eine Zelle gesetzt wurde.
 */
function applyNakedSingles(board: Board): boolean {
  let progress = false;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) continue;

      const candidates = getCandidates(board, row, col);
      if (candidates.size === 1) {
        board[row][col] = candidates.values().next().value!;
        progress = true;
      }
    }
  }

  return progress;
}

/**
 * Versucht Hidden Singles anzuwenden.
 * Hidden Single: Ein Kandidat kommt in einer Zeile/Spalte/Box nur in einer Zelle vor.
 * Gibt true zurück wenn mindestens eine Zelle gesetzt wurde.
 */
function applyHiddenSingles(board: Board): boolean {
  let progress = false;

  // Für jede Einheit (Zeile, Spalte, Box) prüfen
  for (let unit = 0; unit < 9; unit++) {
    // Zeilen
    progress = applyHiddenSinglesInUnit(
      board,
      Array.from({ length: 9 }, (_, i) => [unit, i])
    ) || progress;

    // Spalten
    progress = applyHiddenSinglesInUnit(
      board,
      Array.from({ length: 9 }, (_, i) => [i, unit])
    ) || progress;

    // 3x3-Boxen
    const boxRow = Math.floor(unit / 3) * 3;
    const boxCol = (unit % 3) * 3;
    const cells: [number, number][] = [];
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        cells.push([r, c]);
      }
    }
    progress = applyHiddenSinglesInUnit(board, cells) || progress;
  }

  return progress;
}

/**
 * Wendet Hidden Singles in einer Einheit (Zeile/Spalte/Box) an.
 */
function applyHiddenSinglesInUnit(
  board: Board,
  cells: [number, number][]
): boolean {
  let progress = false;

  for (let digit = 1; digit <= 9; digit++) {
    // Prüfe ob die Ziffer schon in der Einheit platziert ist
    const alreadyPlaced = cells.some(
      ([r, c]) => board[r][c] === digit
    );
    if (alreadyPlaced) continue;

    // Finde alle Zellen in der Einheit, die diese Ziffer als Kandidat haben
    const possibleCells = cells.filter(([r, c]) => {
      if (board[r][c] !== 0) return false;
      return getCandidates(board, r, c).has(digit);
    });

    if (possibleCells.length === 1) {
      const [r, c] = possibleCells[0];
      board[r][c] = digit;
      progress = true;
    }
  }

  return progress;
}

/**
 * Deep-Copy eines Boards.
 */
function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

/**
 * Versucht das Puzzle ausschließlich mit Naked Singles und Hidden Singles zu lösen.
 * Gibt das gelöste Board zurück oder null, wenn es mit diesen Techniken nicht vollständig lösbar ist.
 */
export function solveBySingles(puzzle: Board): Board | null {
  const board = cloneBoard(puzzle);

  let progress = true;
  while (progress) {
    progress = false;
    progress = applyNakedSingles(board) || progress;
    progress = applyHiddenSingles(board) || progress;
  }

  // Prüfen ob vollständig gelöst
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return null;
    }
  }

  return board;
}
