// components/Round.tsx
import React, { useState } from 'react';
import Image from './Image';
import ClipLoader from "react-spinners/ClipLoader";

interface RoundProps {
  orginalUrl: string;
  users: { id: string, name: string }[];
  imageUrls: string[];
  roundNumber: number;
}

const Round: React.FC<RoundProps> = ({ orginalUrl, users, imageUrls, roundNumber }) => {
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{ scores: number[], feedback: string[], winner: number, explanation?: string } | null>(null);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const fetchFeedback = async () => {
    setFeedbackLoading(true);
    try {
      const baseUrl = 'http://127.0.0.1:8000';
      const url = `${baseUrl}/compare_images`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_image_url: orginalUrl,
          image1_url: imageUrls[0],
          image2_url: imageUrls[1],
        })      });

      if (!response.ok) {
        throw new Error('Failed to compare images');
      }

      const feedback = await response.json();
      console.log('Feedback data:', feedback);

      setFeedbackData(feedback);
      setWinnerIndex(feedback.winner);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setFeedbackLoading(false);
    }
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
          <span>Get feedback</span>
        </button>
      )}

      {feedbackLoading && (
        <div className="feedback-loading-container mt-8 p-4 bg-white rounded-lg shadow-lg w-full">
          <h3 className="text-xl font-bold mb-2">Loading Feedback...</h3>
          <div className="flex justify-between space-x-8">
            {users.map((user) => (
              <div key={user.id} className="flex-1 flex justify-center items-center">
                <ClipLoader color="#4A90E2" loading={feedbackLoading} />
              </div>
            ))}
          </div>
        </div>
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
