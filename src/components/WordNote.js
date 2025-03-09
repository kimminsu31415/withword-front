import React, { useState } from 'react';
import './WordNote.css';

function WordNote({ onSave }) {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave({ leftText, rightText });
    }
    // 입력 필드 초기화
    setLeftText('');
    setRightText('');
  };

  return (
    <div className="word-note">
      <div className="note-row">
        <input
          type="text"
          className="left-input"
          placeholder="단어 (혹은 표현)"
          value={leftText}
          onChange={(e) => setLeftText(e.target.value)}
        />
        <div className="vertical-divider" />
        <input
          type="text"
          className="right-input"
          placeholder="해설 (뜻 등)"
          value={rightText}
          onChange={(e) => setRightText(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default WordNote;

//-
