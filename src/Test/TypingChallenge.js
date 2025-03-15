// src/Test/TypingChallenge.js
import React, { useState, useEffect } from 'react';
import './TypingChallenge.css';

const sampleWords = [
  { id: 1, left_text: 'apple', right_text: '사과' },
  { id: 2, left_text: 'banana', right_text: '바나나' },
  { id: 3, left_text: 'cherry', right_text: '체리' },
  { id: 4, left_text: 'dog', right_text: '개' },
  { id: 5, left_text: 'cat', right_text: '고양이' },
];

function TypingChallenge() {
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const loadNewWord = () => {
    const randomIndex = Math.floor(Math.random() * sampleWords.length);
    setCurrentWord(sampleWords[randomIndex]);
    setUserInput('');
    setFeedback('');
  };

  useEffect(() => {
    loadNewWord();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord) return;
    setAttempts((prev) => prev + 1);
    if (
      userInput.trim().toLowerCase() === currentWord.right_text.toLowerCase()
    ) {
      setFeedback('Correct!');
      setScore((prev) => prev + 1);
    } else {
      setFeedback(
        `Incorrect! The correct answer is: ${currentWord.right_text}`
      );
    }
  };

  const handleNext = () => {
    loadNewWord();
  };

  return (
    <div className="typing-challenge">
      <h2>Typing Challenge</h2>
      {currentWord && (
        <div className="challenge-card">
          <p className="question">
            Translate: <strong>{currentWord.left_text}</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer here"
              className="answer-input"
            />
            <button
              type="submit"
              className="submit-button"
              disabled={!userInput}
            >
              Submit
            </button>
          </form>
          {feedback && <p className="feedback">{feedback}</p>}
          {feedback && (
            <button onClick={handleNext} className="next-button">
              Next
            </button>
          )}
        </div>
      )}
      <div className="scoreboard">
        <p>
          Score: {score} / {attempts}
        </p>
      </div>
    </div>
  );
}

export default TypingChallenge;
