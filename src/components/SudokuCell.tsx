import styled from "styled-components";

interface StyledCellProps {
  $isGiven: boolean;
  $isSelected: boolean;
  $isHighlighted: boolean;
  $isError: boolean;
  $isFlash: boolean;
}

const Cell = styled.div<StyledCellProps>`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) =>
      props.$isFlash ? "rgba(244, 67, 54, 0.8)" : "rgba(255, 255, 255, 0.5)"};
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease, box-shadow 0.15s ease,
    border-color 0.15s ease;
  color: ${(props) => {
    if (props.$isError) return "#e57373";
    if (props.$isGiven) return "rgba(255, 255, 255, 0.55)";
    return "rgba(255, 255, 255, 0.9)";
  }};
  background-color: ${(props) => {
    if (props.$isFlash) return "rgba(244, 67, 54, 0.1)";
    if (props.$isHighlighted) return "rgba(255, 255, 255, 0.04)";
    return "transparent";
  }};
  border-width: ${(props) => (props.$isSelected ? "2px" : "1px")};
  border-color: ${(props) => {
    if (props.$isFlash) return "rgba(244, 67, 54, 0.6)";
    if (props.$isSelected) return "rgba(255, 255, 255, 0.8)";
    return "rgba(255, 255, 255, 0.2)";
  }};
  box-shadow: ${(props) =>
    props.$isSelected ? "0 0 6px 1px rgba(255, 255, 255, 0.4)" : "none"};

  &:hover {
    background-color: ${(props) => {
      if (props.$isFlash) return "rgba(244, 67, 54, 0.15)";
      return "rgba(255, 255, 255, 0.03)";
    }};
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
  font-size: 0.45rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
`;

interface SudokuCellProps {
  value: number;
  isGiven: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  isError: boolean;
  isFlash: boolean;
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
      onClick={onClick}
    >
      {renderContent()}
    </Cell>
  );
}

export default SudokuCell;
