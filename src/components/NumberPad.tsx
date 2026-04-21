import styled from "styled-components";

const PadContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const PadButton = styled.button`
  width: 52px;
  height: 52px;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.15s ease,
    background-color 0.15s ease;

  &:active {
    transform: scale(0.93);
    background: rgba(255, 255, 255, 0.06);
  }
`;

interface HintToggleButtonProps {
  $isActive: boolean;
}

const HintToggleButton = styled(PadButton)<HintToggleButtonProps>`
  background: ${(props) => props.$isActive ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  border: ${(props) =>
    props.$isActive
      ? "2px solid rgba(255, 255, 255, 0.8)"
      : "1px solid rgba(255, 255, 255, 0.2)"};
  color: ${(props) => props.$isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)"};
  box-shadow: ${(props) => props.$isActive ? "0 0 8px rgba(255, 255, 255, 0.2)" : "none"};
`;

interface NumberPadProps {
  onNumberClick: (n: number) => void;
  onErase: () => void;
  isHintMode: boolean;
  onToggleHintMode: () => void;
}

function NumberPad({
  onNumberClick,
  onErase,
  isHintMode,
  onToggleHintMode,
}: NumberPadProps) {
  return (
    <PadContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <PadButton key={n} onClick={() => onNumberClick(n)}>
          {n}
        </PadButton>
      ))}
      <PadButton onClick={onErase}>⌫</PadButton>
      <HintToggleButton $isActive={isHintMode} onClick={onToggleHintMode}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </HintToggleButton>
    </PadContainer>
  );
}

export default NumberPad;
