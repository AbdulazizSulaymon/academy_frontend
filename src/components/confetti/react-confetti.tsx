import { useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const MyConfetti = () => {
  const { width, height } = useWindowSize();
  const [isRunning, setIsRunning] = useState(true);

  return (
    <Confetti
      width={width}
      height={height}
      run={isRunning}
      recycle={false}
      onConfettiComplete={(confetti) => {
        console.log(confetti);
      }}
    />
  );
};
