"use client";

// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Round from './components/Round';
import Reveal from './components/Reveal';
import UserInput from './components/UserInput';
import { ArrowRight, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { games, players } from './static/game';

export default function Home() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [roundLive, setRoundLive] = useState(true);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showReveal, setShowReveal] = useState(false);

  // Use objects instead of arrays
  const [round1ImageUrls, setRound1ImageUrls] = useState<{ [key: number]: string }>({});
  const [round2ImageUrls, setRound2ImageUrls] = useState<{ [key: number]: string }>({});
  const [showRound2, setShowRound2] = useState(false);

  useEffect(() => {
    const isFirstRound = currentRound < players.length;
    const roundUrls = isFirstRound ? round1ImageUrls : round2ImageUrls;

    const allUrlsFilled = Object.keys(roundUrls).length === players.length && Object.values(roundUrls).every(url => url !== 'loading');
    
    if (allUrlsFilled) {
      setCurrentRound((prevRound) => prevRound + 1);
      if (currentRound + 1 === players.length) {
        setRoundLive(false);
      } else if (currentRound + 1 === players.length * 2) {
        setRoundLive(false);
      }
    }
  }, [round1ImageUrls, round2ImageUrls, currentRound]);

  const handleUserInputSubmit = async (input: string, playerIndex: number) => {
    console.log(`Updated user ${playerIndex} input:`, input);

    const isFirstRound = currentRound < players.length;

    if (isFirstRound) {
      setRound1ImageUrls((prevUrls) => ({
        ...prevUrls,
        [playerIndex]: 'loading',
      }));
    } else {
      setRound2ImageUrls((prevUrls) => ({
        ...prevUrls,
        [playerIndex]: 'loading',
      }));
    }

    try {
      const response = await fetch('/api/prompt2image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      console.log('Generated image URL:', data.url);

      if (isFirstRound) {
        setRound1ImageUrls((prevUrls) => ({
          ...prevUrls,
          [playerIndex]: data.url,
        }));
      } else {
        setRound2ImageUrls((prevUrls) => ({
          ...prevUrls,
          [playerIndex]: data.url,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNextRoundClick = () => {
    setShowRound2(true);
    setRoundLive(true); // Allow user input for Round 2
  };

  const handleSubmit = (input: string) => {
    handleUserInputSubmit(input, currentPlayerIndex);
    // Move to the next player
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
  };

  const restartGame = () => {
    setCurrentPlayerIndex(0);
    setRoundLive(true);
    setCurrentRound(0);
    setRound1ImageUrls({});
    setRound2ImageUrls({});
    setShowRound2(false);
    setShowReveal(false);
  };

  const handlePreviousGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : games.length - 1));
  };

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex < games.length - 1 ? prevIndex + 1 : 0));
  };

  const handleRevealClick = () => {
    setShowReveal(true);
  };

  return (
    <main className="flex min-h-screen p-12 space-x-16">
      <div className="flex flex-col w-1/4 space-y-8 items-center">
        <div className="z-10 max-w-xs w-full items-center justify-between font-mono text-sm lg:flex flex-col">
          <Game game={games[currentGameIndex]} />
        </div>
        <div className="flex space-x-4 justify-center">
          <button onClick={handlePreviousGame} className="bg-gray-300 p-2 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNextGame} className="bg-gray-300 p-2 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col w-3/4 space-y-16">

      {showReveal && (
          <Reveal winnerName={players[0].name} gamePrompt={games[currentGameIndex].prompt} />
        )}
        
        {/* Display Round 2 if it's ready */}
        {showRound2 && <Round users={players} imageUrls={Object.values(round2ImageUrls)} roundNumber={2} />}

        {/* Display Round 1 */}
        <Round users={players} imageUrls={Object.values(round1ImageUrls)} roundNumber={1} />

        <div className="h-24"></div>

        {roundLive ? (
          <div className="fixed bottom-0 right-32 w-full max-w-xl p-4 mx-auto">
            <UserInput onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="fixed bottom-0 left-32 w-full max-w-xl p-4 mx-auto">
            {!showRound2 ? (
              <button
                onClick={handleNextRoundClick}
                className="bg-green-500 text-white p-4 rounded flex items-center space-x-2">
                <ArrowRight className="w-5 h-5" />
                <span>Go to Round 2</span>
              </button>
            ) : !showReveal ? (
              <button
                onClick={handleRevealClick}
                className="bg-yellow-500 text-white p-4 rounded flex items-center space-x-2">
                <span>Reveal Winner</span>
              </button>
            ) : (
              <button
                onClick={restartGame}
                className="bg-blue-500 text-white p-4 rounded flex items-center space-x-2">
                <RefreshCw className="w-5 h-5" />
                <span>Restart Game</span>
              </button>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
