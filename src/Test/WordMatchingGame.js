// src/Test/WordMatchingGame.js
import React, { useState, useEffect } from 'react';
import './WordMatchingGame.css';

// 샘플 단어 데이터
const sampleWords = [
  { id: 1, left_text: 'apple', right_text: '사과' },
  { id: 2, left_text: 'banana', right_text: '바나나' },
  { id: 3, left_text: 'cherry', right_text: '체리' },
  { id: 4, left_text: 'dog', right_text: '개' },
  { id: 5, left_text: 'cat', right_text: '고양이' },
];

// 간단한 배열 셔플 함수
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function WordMatchingGame() {
  // 게임 시작 시, 왼쪽은 sampleWords 그대로, 오른쪽은 번역만 추출하여 셔플
  const [leftItems, setLeftItems] = useState(sampleWords);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  // 초기 로딩 시, 오른쪽 항목을 셔플해서 설정
  useEffect(() => {
    const rights = shuffleArray(sampleWords);
    setRightItems(rights);
  }, []);

  // 선택된 항목이 둘 다 있으면 검증
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft.id === selectedRight.id) {
        setFeedback('Correct match!');
        // 일치하면 해당 항목 제거
        setLeftItems((prev) =>
          prev.filter((item) => item.id !== selectedLeft.id)
        );
        setRightItems((prev) =>
          prev.filter((item) => item.id !== selectedRight.id)
        );
        setScore((prev) => prev + 1);
      } else {
        setFeedback('Incorrect match, try again!');
      }
      // 1초 후 선택 초기화 및 피드백 제거
      const timeout = setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setFeedback('');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [selectedLeft, selectedRight]);

  // 게임 리셋 함수
  const resetGame = () => {
    setLeftItems(sampleWords);
    setRightItems(shuffleArray(sampleWords));
    setSelectedLeft(null);
    setSelectedRight(null);
    setScore(0);
    setFeedback('');
  };

  return (
    <div className="matching-game">
      <h2>Word Matching Game</h2>
      <p>Score: {score}</p>
      {leftItems.length === 0 ? (
        <div className="game-complete">
          <p>Game Completed! Final Score: {score}</p>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="column left-column">
            <h3>Words</h3>
            {leftItems.map((item) => (
              <button
                key={item.id}
                className={`item-button ${
                  selectedLeft && selectedLeft.id === item.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedLeft(item)}
                disabled={selectedLeft && selectedLeft.id === item.id}
              >
                {item.left_text}
              </button>
            ))}
          </div>
          <div className="column right-column">
            <h3>Translations</h3>
            {rightItems.map((item) => (
              <button
                key={item.id}
                className={`item-button ${
                  selectedRight && selectedRight.id === item.id
                    ? 'selected'
                    : ''
                }`}
                onClick={() => setSelectedRight(item)}
                disabled={selectedRight && selectedRight.id === item.id}
              >
                {item.right_text}
              </button>
            ))}
          </div>
        </div>
      )}
      {feedback && <p className="feedback">{feedback}</p>}
      {leftItems.length > 0 && (
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      )}
    </div>
  );
}

export default WordMatchingGame;
