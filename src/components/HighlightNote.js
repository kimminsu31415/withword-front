import React, { useState, useEffect } from 'react';
import './HighlightNote.css';

function HighlightNote({ note, noteId, onToggle }) {
  // note: 표시할 노트 텍스트
  // noteId: 각 노트를 구분할 고유 ID (형광펜 상태를 저장하기 위한 key에 사용)
  // onToggle: 형광펜 상태 변경 시 부모에게 알리는 콜백 (옵션)

  const storageKey = `highlighted-note-${noteId}`;
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 해당 note의 형광펜 상태를 불러옵니다.
    const storedState = localStorage.getItem(storageKey);
    if (storedState === 'true') {
      setHighlighted(true);
    }
  }, [storageKey]);

  const toggleHighlight = () => {
    const newState = !highlighted;
    setHighlighted(newState);
    localStorage.setItem(storageKey, newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className={`highlight-note ${highlighted ? 'highlighted' : ''}`}>
      <p>{note}</p>
      <button onClick={toggleHighlight}>
        {highlighted ? 'Remove Highlight' : 'Highlight'}
      </button>
    </div>
  );
}

export default HighlightNote;
//------
