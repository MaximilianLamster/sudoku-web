import styled from "styled-components";

interface StyledCellProps {
  $isGiven: boolean;
  $isSelected: boolean;
  $isHighlighted: boolean;
  $isError: boolean;
  $isFlash: boolean;
  $isSameNumber: boolean;
}

const Cell = styled.div<StyledCellProps>`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 600;

  @media (max-width: 599px) {
    width: 35px;
    height: 35px;
    font-size: 1.1rem;
  }
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease, box-shadow 0.15s ease,
    border-color 0.15s ease;

  color: ${({ theme, $isError, $isGiven }) => {
    if ($isError) return theme.textError;
    if ($isGiven) return theme.textGiven;
    return theme.textUserAccent;
  }};

  background-color: ${({ theme, $isFlash, $isHighlighted }) => {
    if ($isFlash) return theme.cellFlashBg;
    if ($isHighlighted) return theme.cellHighlight;
    return "transparent";
  }};

  border-width: ${({ $isSelected }) => ($isSelected ? "2px" : "1px")};
  border-style: solid;
  border-color: ${({ theme, $isFlash, $isSelected, $isSameNumber }) => {
    if ($isFlash) return theme.cellFlashBorder;
    if ($isSelected) return theme.cellSelectedBorder;
    if ($isSameNumber) return theme.cellSameNumberBorder;
    return theme.borderColor;
  }};

  box-shadow: ${({ theme, $isSelected, $isSameNumber }) => {
    if ($isSelected) return `0 0 6px 1px ${theme.cellSelectedShadow}`;
    if ($isSameNumber) return `0 0 4px 1px ${theme.cellSameNumberShadow}`;
    return "none";
  }};

  &:hover {
    background-color: ${({ theme, $isFlash }) =>
      $isFlash ? theme.cellFlashHover : theme.cellHighlight};
  }
`;

const HintGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
`;

const HintDigit = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.58rem;
  font-weight: 400;
  color: ${({ theme }) => theme.hintDigit};
  line-height: 1;

  @media (max-width: 599px) {
    font-size: 0.4rem;
  }
`;

interface SudokuCellProps {
  value: number;
  isGiven: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
  isFlash: boolean;
  isSameNumber: boolean;
  hints?: Set<number>;
  onClick: () => void;
}

function SudokuCell({
  value,
  isGiven,
  isSelected,
  isHighlighted,
  isError,
  isFlash,
  isSameNumber,
  hints,
  onClick,
}: SudokuCellProps) {
  const renderContent = () => {
    if (value > 0) return value;
    if (hints && hints.size > 0) {
      return (
        <HintGrid>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <HintDigit key={n}>{hints.has(n) ? n : ""}</HintDigit>
          ))}
        </HintGrid>
      );
    }
    return "";
  };

  return (
    <Cell
      $isGiven={isGiven}
      $isSelected={isSelected}
      $isHighlighted={isHighlighted}
      $isError={isError}
      $isFlash={isFlash}
      $isSameNumber={isSameNumber}
      onClick={onClick}
    >
      {renderContent()}
    </Cell>
  );
}

export default SudokuCell;
