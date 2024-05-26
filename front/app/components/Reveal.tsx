// components/Reveal.tsx
import React from 'react';

interface RevealProps {
  winnerName: string;
  gamePrompt: string;
  promptHeader: string;
  promptBestPractice: string;
}

const Reveal: React.FC<RevealProps> = ({ winnerName, gamePrompt, promptHeader, promptBestPractice }) => {
  return (
    <div className="reveal-container w-full flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Original Prompt</h2>
      <p className="text-xl mb-4">{gamePrompt}</p>
      <h3 className="text-xl font-bold mb-2">{promptHeader}</h3>
      <p className="text-lg mb-4 whitespace-pre-line">{promptBestPractice}</p>
      <h3 className="text-xl font-bold mt-4">Winner: {winnerName}</h3>
    </div>
  );
};

export default Reveal;
