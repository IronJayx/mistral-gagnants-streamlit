"use client";
import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface UserInputProps {
  presetPrompt?: string;
  onSubmit: (input: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(input);
    setInput(''); // Clear input after submission if needed
  };

  return (
    <div className="flex items-center p-2 border rounded-lg shadow-sm bg-gray-300">
      <input 
        type="text" 
        className="flex-grow p-2 bg-transparent focus:outline-none" 
        placeholder="Enter a prompt that match the image"
        value={input}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <button 
        className="p-2"
        onClick={handleSubmit}
      >
        <Send className="w-6 h-6 text-gray-500" />
      </button>
    </div>
  );
}

export default UserInput;
