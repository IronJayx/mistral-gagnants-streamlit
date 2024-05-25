// components/Game.tsx
import React from 'react';

interface GameProps {
  game: {
    id: string;
    url: string;
    prompt: string;
  };
}

const Game: React.FC<GameProps> = ({ game }) => {
  return (
    <div className="game-container flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Game ID: {game.id}</h1>
      <img src={game.url} alt="Game" className="w-48 h-auto mb-4" />
    </div>
  );
};

export default Game;
