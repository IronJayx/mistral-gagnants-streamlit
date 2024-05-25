// components/Reveal.tsx
import React from 'react';

interface RevealProps {
  winnerName: string;
  gamePrompt: string;
}

const Reveal: React.FC<RevealProps> = ({ winnerName, gamePrompt }) => {
  return (
    <div className="reveal-container w-full flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
      <p className="text-xl">Original Prompt: {gamePrompt}</p>
    </div>
  );
};

export default Reveal;
