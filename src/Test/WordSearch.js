import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WordSearch.css';

function WordSearch({ deckId }) {
  const [words, setWords] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredWords, setFilteredWords] = useState([]);

  // 단어 목록 불러오기 (API: GET /api/words?deckId=xxx)
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/words', { params: { deckId } })
      .then((response) => {
        setWords(response.data);
        setFilteredWords(response.data);
      })
      .catch((error) => console.error('Error fetching words:', error));
  }, [deckId]);

  // 검색어에 따라 필터링
  useEffect(() => {
    const filtered = words.filter(
      (word) =>
        word.left_text.toLowerCase().includes(search.toLowerCase()) ||
        word.right_text.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredWords(filtered);
  }, [search, words]);

  return (
    <div className="word-search">
      <h2>Search Words in Deck {deckId}</h2>
      <input
        type="text"
        placeholder="Search words..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {filteredWords.length === 0 ? (
        <p>No matching words found.</p>
      ) : (
        <ul className="word-list">
          {filteredWords.map((word) => (
            <li key={word.id}>
              <strong>{word.left_text}</strong> - {word.right_text} (Row{' '}
              {word.row_index})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WordSearch;
