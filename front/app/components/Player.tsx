// components/Players.tsx
import React from 'react';

interface Player {
  id: string;
  name: string;
}

interface PlayerProps {
  player: Player;
}

const Player: React.FC<PlayerProps> = ({ player }) => {
  return (
    <div className="player flex justify-center items-center bg-gray-100 p-4 rounded shadow">
      Player: {player.name}
    </div>
  );
};

export default Player;
