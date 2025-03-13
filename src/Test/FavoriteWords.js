// src/Test/FavoriteWords.js
import React, { useState, useEffect } from 'react';
import './FavoriteWords.css';

function FavoriteWords({ words }) {
  // 즐겨찾기로 지정된 단어 ID 목록을 localStorage에서 불러옴 (없으면 빈 배열)
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem('favoriteWords');
    return stored ? JSON.parse(stored) : [];
  });

  // 즐겨찾기 토글 함수
  const toggleFavorite = (wordId) => {
    setFavoriteIds((prevIds) => {
      let newIds;
      if (prevIds.includes(wordId)) {
        newIds = prevIds.filter((id) => id !== wordId);
      } else {
        newIds = [...prevIds, wordId];
      }
      localStorage.setItem('favoriteWords', JSON.stringify(newIds));
      return newIds;
    });
  };

  // 즐겨찾기 상태를 반영하여 단어 항목 렌더링
  return (
    <div className="favorite-words">
      <h2>Favorite Words</h2>
      {words.length === 0 ? (
        <p>No words available.</p>
      ) : (
        <ul>
          {words.map((word) => (
            <li key={word.id} className="word-item">
              <span className="word-text">
                <strong>{word.left_text}</strong> - {word.right_text} (Row{' '}
                {word.row_index})
              </span>
              <span
                className="favorite-icon"
                onClick={() => toggleFavorite(word.id)}
                title={
                  favoriteIds.includes(word.id)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
              >
                {favoriteIds.includes(word.id) ? '⭐' : '☆'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteWords;
