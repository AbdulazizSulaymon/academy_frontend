import React, { useCallback, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const canvasStyles: Record<string, any> = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

const useConfetti = () => {
  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: any, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        origin: { y: 1, x: 0 },
        ...opts,
        particleCount: Math.floor(300 * particleRatio),
        decay: 0.93,
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
      angle: 50,
    });

    makeShot(0.2, {
      spread: 60,
      angle: 55,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      angle: 55,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      angle: 45,
      startVelocity: 45,
    });

    // Right corner
    makeShot(0.25, {
      spread: 100,
      startVelocity: 55,
      origin: { y: 1, x: 1 },
      angle: 90 + 50,
    });

    makeShot(0.2, {
      origin: { y: 1, x: 1 },
      spread: 60,
      angle: 90 + 55,
    });

    makeShot(0.35, {
      spread: 200,
      decay: 0.91,
      origin: { y: 1, x: 1 },
      scalar: 0.8,
      angle: 90 + 45,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      origin: { y: 1, x: 1 },
      angle: 90 + 55,
      scalar: 1.2,
    });

    makeShot(0.1, {
      origin: { y: 1, x: 1 },
      spread: 120,
      angle: 90 + 45,
      startVelocity: 45,
    });
  }, [makeShot]);
  return {
    playConfetti: fire,
    confetti: <ReactCanvasConfetti style={canvasStyles} refConfetti={getInstance} />,
  };
};

export default useConfetti;
