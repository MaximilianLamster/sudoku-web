import styled from "styled-components";
import type { Board } from "../engine/types";
import SudokuCell from "./SudokuCell";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 56px 56px 56px 8px 56px 56px 56px 8px 56px 56px 56px;
  grid-template-rows: 56px 56px 56px 8px 56px 56px 56px 8px 56px 56px 56px;
  gap: 4px;

  @media (max-width: 599px) {
    grid-template-columns: 35px 35px 35px 5px 35px 35px 35px 5px 35px 35px 35px;
    grid-template-rows: 35px 35px 35px 5px 35px 35px 35px 5px 35px 35px 35px;
    gap: 2px;
  }
`;

interface SelectedCell {
  row: number;
  col: number;
}

interface SudokuGridProps {
  puzzle: Board;
  initialPuzzle: Board;
  selectedCell: SelectedCell | null;
  onCellClick: (row: number, col: number) => void;
  errorCells: Set<string>;
  flashCells: Set<string>;
  hints: Map<string, Set<number>>;
}

function isRowColBoxHighlighted(
  row: number,
  col: number,
  selected: SelectedCell | null
): boolean {
  if (!selected) return false;
  if (row === selected.row && col === selected.col) return false;

  if (row === selected.row) return true;
  if (col === selected.col) return true;
  const boxRow = Math.floor(row / 3);
  const boxCol = Math.floor(col / 3);
  const selBoxRow = Math.floor(selected.row / 3);
  const selBoxCol = Math.floor(selected.col / 3);
  if (boxRow === selBoxRow && boxCol === selBoxCol) return true;

  return false;
}

// Map sudoku index (0-8) to grid line (1-based), skipping spacer tracks at 4 and 8
function gridLine(index: number): number {
  // 0,1,2 → 1,2,3 | 3,4,5 → 5,6,7 | 6,7,8 → 9,10,11
  return index + 1 + Math.floor(index / 3);
}

interface CellPositionProps {
  $gridRow: number;
  $gridCol: number;
}

const CellPosition = styled.div<CellPositionProps>`
  grid-column: ${(props) => props.$gridCol};
  grid-row: ${(props) => props.$gridRow};
`;

function SudokuGrid({
  puzzle,
  initialPuzzle,
  selectedCell,
  onCellClick,
  errorCells,
  flashCells,
  hints,
}: SudokuGridProps) {
  const selectedValue =
    selectedCell !== null ? puzzle[selectedCell.row][selectedCell.col] : 0;

  const cells = [];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = puzzle[row][col];
      const isGiven = initialPuzzle[row][col] !== 0;
      const isSelected =
        selectedCell !== null &&
        selectedCell.row === row &&
        selectedCell.col === col;
      const cellKey = `${row}-${col}`;

      // Row/col/box highlight only when selected cell is empty
      const highlighted =
        selectedValue === 0
          ? isRowColBoxHighlighted(row, col, selectedCell)
          : false;

      // Same-number glow when selected cell has a value
      const isSameNumber =
        selectedValue > 0 && value === selectedValue && !isSelected;

      cells.push(
        <CellPosition
          key={cellKey}
          $gridRow={gridLine(row)}
          $gridCol={gridLine(col)}
        >
          <SudokuCell
            value={value}
            isGiven={isGiven}
            isSelected={isSelected}
            isHighlighted={highlighted}
            isError={errorCells.has(cellKey)}
            isFlash={flashCells.has(cellKey)}
            isSameNumber={isSameNumber}
            hints={hints.get(cellKey)}
            onClick={() => onCellClick(row, col)}
          />
        </CellPosition>
      );
    }
  }

  return <Grid>{cells}</Grid>;
}

export default SudokuGrid;
