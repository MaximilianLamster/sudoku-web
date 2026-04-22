import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.6s ease;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  text-align: center;
`;

const OkayButton = styled.button`
  padding: 1rem 3rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  background-color: ${({ theme }) => theme.overlayButtonBg};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  min-width: 240px;
  transition: box-shadow 0.3s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0 0 15px 3px rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface GameOverlayProps {
  type: "won" | "lost";
  onOkay: () => void;
}

function GameOverlay({ type, onOkay }: GameOverlayProps) {
  const title = type === "won" ? "Congratulations, You Win" : "You lost";

  return (
    <Overlay>
      <Title>{title}</Title>
      <OkayButton onClick={onOkay}>Okay</OkayButton>
    </Overlay>
  );
}

export default GameOverlay;
