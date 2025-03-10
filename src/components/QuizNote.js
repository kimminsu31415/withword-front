import React, { useState } from 'react';
import './QuizNote.css';

function QuizNote({ words }) {
  // 각 단어의 오른쪽 텍스트가 보이는지 여부를 저장하는 상태 배열
  const [revealed, setRevealed] = useState(words.map(() => false));

  // 특정 인덱스의 단어의 오른쪽 텍스트 표시 여부를 토글하는 핸들러
  const handleToggle = (index) => {
    setRevealed((prev) => {
      const newRevealed = [...prev];
      newRevealed[index] = !newRevealed[index];
      return newRevealed;
    });
  };

  return (
    <div className="quiz-note">
      <h2>Quiz Mode</h2>
      <ul>
        {words.map((word, index) => (
          <li
            key={word.id}
            className="quiz-word"
            onClick={() => handleToggle(index)}
          >
            <span className="left-text">{word.left_text}</span>
            <span
              className="right-text"
              style={{ visibility: revealed[index] ? 'visible' : 'hidden' }}
            >
              {word.right_text}
            </span>
          </li>
        ))}
      </ul>
      <p className="hint">클릭하면 해당 단어의 해설이 나타납니다.</p>
    </div>
  );
}

export default QuizNote;

//------
