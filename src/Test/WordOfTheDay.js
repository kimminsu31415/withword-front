// src/Test/WordOfTheDay.js
import React, { useState, useEffect } from 'react';
import './WordOfTheDay.css';

// 샘플 단어 데이터 (실제 프로젝트에서는 API 호출 등으로 대체 가능)
const sampleWords = [
  { id: 1, left_text: 'apple', right_text: '사과' },
  { id: 2, left_text: 'banana', right_text: '바나나' },
  { id: 3, left_text: 'cherry', right_text: '체리' },
  { id: 4, left_text: 'dragonfruit', right_text: '용과' },
  { id: 5, left_text: 'elephant', right_text: '코끼리' },
];

function WordOfTheDay() {
  const [word, setWord] = useState(null);

  // 무작위 단어를 선택하는 함수
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * sampleWords.length);
    return sampleWords[randomIndex];
  };

  // 컴포넌트가 마운트되면 단어를 설정
  useEffect(() => {
    setWord(getRandomWord());
  }, []);

  // 새 단어 선택
  const handleRefresh = () => {
    setWord(getRandomWord());
  };

  return (
    <div className="word-of-the-day">
      <h2>Word of the Day</h2>
      {word ? (
        <div className="word-card">
          <p className="word-front">{word.left_text}</p>
          <p className="word-back">{word.right_text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRefresh}>Refresh Word</button>
    </div>
  );
}

export default WordOfTheDay;
