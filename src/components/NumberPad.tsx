import styled from "styled-components";

const PadContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 599px) {
    flex-wrap: wrap;
    gap: 4px;
    width: 329px;
  }
`;

interface PadButtonProps {
  $disabled?: boolean;
}

const PadButton = styled.button<PadButtonProps>`
  width: 52px;
  height: 52px;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.buttonText};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  border-radius: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.15 : 1)};
  transition: box-shadow 0.3s ease, transform 0.15s ease,
    background-color 0.15s ease, opacity 0.2s ease;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

  @media (max-width: 599px) {
    width: 33px;
    height: 33px;
    font-size: 1rem;
  }

  &:active {
    transform: scale(0.93);
    background: ${({ theme }) => theme.buttonPressedBg};
  }
`;

interface HintToggleButtonProps {
  $isActive: boolean;
}

const HintToggleButton = styled(PadButton)<HintToggleButtonProps>`
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.buttonActiveBg : "transparent"};
  border: ${({ theme, $isActive }) =>
    $isActive
      ? `2px solid ${theme.buttonActiveBorder}`
      : `1px solid ${theme.buttonBorder}`};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.buttonActiveText : theme.buttonText};
  box-shadow: ${({ theme, $isActive }) =>
    $isActive ? `0 0 8px ${theme.buttonActiveShadow}` : "none"};
`;

interface NumberPadProps {
  onNumberClick: (n: number) => void;
  onErase: () => void;
  isHintMode: boolean;
  onToggleHintMode: () => void;
  completedNumbers: Set<number>;
  isErasable: boolean;
}

function NumberPad({
  onNumberClick,
  onErase,
  isHintMode,
  onToggleHintMode,
  completedNumbers,
  isErasable,
}: NumberPadProps) {
  return (
    <PadContainer>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <PadButton
          key={n}
          $disabled={completedNumbers.has(n)}
          onClick={() => onNumberClick(n)}
        >
          {n}
        </PadButton>
      ))}
      <PadButton $disabled={!isErasable} onClick={onErase}>
        ⌫
      </PadButton>
      <HintToggleButton $isActive={isHintMode} onClick={onToggleHintMode}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </HintToggleButton>
    </PadContainer>
  );
}

export default NumberPad;
