// components/Round.tsx
import React, { useState } from 'react';
import Image from './Image';

interface RoundProps {
  users: { id: string, name: string }[];
  imageUrls: string[];
  roundNumber: number;
}

const Round: React.FC<RoundProps> = ({ users, imageUrls, roundNumber }) => {
  const [feedbackData, setFeedbackData] = useState<{ scores: number[], feedback: string[] } | null>(null);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const fetchFeedback = () => {
    // Simulating an API call to get feedback
    const feedback = {
      "scores": [1, 2],
      "feedback": ["Short feedback on visual appeal, composition, and lighting.", "Short feedback on visual appeal, composition, and lighting."],
    };
    
    // Compute the winner based on the scores
    const maxScore = Math.max(...feedback.scores);
    const winnerIdx = feedback.scores.indexOf(maxScore);

    setFeedbackData(feedback);
    setWinnerIndex(winnerIdx);
  };

  const allUrlsAvailable = imageUrls.length === users.length && imageUrls.every(url => url !== 'loading');

  return (
    <div className="round-container w-full flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Round {roundNumber}</h2>
      <div className="w-full flex justify-center space-x-32">
        {users.map((user, index) => (
          <div key={user.id} className={`user-container flex flex-col items-center space-y-4 ${winnerIndex === index ? 'bg-green-200 p-4 rounded-lg' : ''}`}>
            <div className="user-name font-bold">{user.name}</div>
            <Image url={imageUrls[index]} />
          </div>
        ))}
      </div>

      {allUrlsAvailable && !feedbackData && (
        <button
          onClick={fetchFeedback}
          className="bg-green-500 text-white p-4 rounded flex items-center space-x-2 mt-4">
          <span>Get Results</span>
        </button>
      )}

      {feedbackData && (
        <div className="feedback-container mt-8 p-4 bg-white rounded-lg shadow-lg w-full">
          <h3 className="text-xl font-bold mb-2">Feedback</h3>
          <div className="flex justify-between space-x-8">
            {users.map((user, index) => (
              <div key={user.id} className={`flex-1 ${winnerIndex === index ? 'bg-green-200 p-4 rounded-lg' : ''}`}>
                <h4 className="text-lg font-semibold">{user.name}</h4>
                <p><strong>Score:</strong> {feedbackData.scores[index]}</p>
                <p><strong>Feedback:</strong> {feedbackData.feedback[index]}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-bold mt-4">Winner: {users[winnerIndex]?.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Round;
