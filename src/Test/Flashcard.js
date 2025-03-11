// src/Test/Flashcard.js
import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ frontText, backText }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">{frontText}</div>
        <div className="flashcard-back">{backText}</div>
      </div>
    </div>
  );
}

export default Flashcard;
