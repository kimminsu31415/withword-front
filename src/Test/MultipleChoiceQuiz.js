// src/Test/MultipleChoiceQuiz.js
import React, { useState } from 'react';
import './MultipleChoiceQuiz.css';

const sampleQuestions = [
  {
    id: 1,
    word: 'apple',
    choices: ['사과', '바나나', '체리', '포도'],
    correct: '사과',
  },
  {
    id: 2,
    word: 'banana',
    choices: ['딸기', '바나나', '복숭아', '키위'],
    correct: '바나나',
  },
  {
    id: 3,
    word: 'cherry',
    choices: ['체리', '멜론', '포도', '라임'],
    correct: '체리',
  },
];

function MultipleChoiceQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = sampleQuestions[currentIndex];

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    if (selectedChoice === currentQuestion.correct) {
      setFeedback('Correct!');
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`Incorrect! Correct answer: ${currentQuestion.correct}`);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedChoice('');
    setFeedback('');
    setShowFeedback(false);
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(
        `Quiz completed! Your score: ${
          score + (selectedChoice === currentQuestion.correct ? 1 : 0)
        }/${sampleQuestions.length}`
      );
      // Reset quiz
      setCurrentIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="quiz-container">
      <h2>Multiple Choice Quiz</h2>
      <div className="question">
        <p>
          What is the meaning of <strong>{currentQuestion.word}</strong>?
        </p>
      </div>
      <div className="choices">
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            className={`choice-button ${
              selectedChoice === choice ? 'selected' : ''
            }`}
            onClick={() => handleChoiceSelect(choice)}
            disabled={showFeedback}
          >
            {choice}
          </button>
        ))}
      </div>
      {!showFeedback && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedChoice}
        >
          Submit Answer
        </button>
      )}
      {showFeedback && (
        <div className="result">
          <p>{feedback}</p>
          <button className="next-button" onClick={handleNext}>
            Next Question
          </button>
        </div>
      )}
      <div className="score">
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

export default MultipleChoiceQuiz;
