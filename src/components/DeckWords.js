// src/components/DeckWords.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DeckWords() {
  const { deckId } = useParams();
  const [words, setWords] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [newWord, setNewWord] = useState({
    row_index: '',
    left_text: '',
    right_text: '',
  });

  // 단어 목록 조회 (GET /api/words?deckId=xxx)
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/words', { params: { deckId } })
      .then((response) => setWords(response.data))
      .catch((error) => console.error('Error fetching words:', error));
  }, [deckId]);

  // 덱 정보 조회 (GET /api/decks/:deckId)
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/decks/${deckId}`)
      .then((response) => {
        setDeckName(response.data.title);
      })
      .catch((error) => console.error('Error fetching deck info:', error));
  }, [deckId]);

  // 새 단어 입력 핸들러
  const handleNewWordChange = (e) => {
    const { name, value } = e.target;
    setNewWord((prev) => ({ ...prev, [name]: value }));
  };

  // 새 단어 제출 핸들러
  const handleNewWordSubmit = (e) => {
    e.preventDefault();
    // 필수 필드 체크
    if (!newWord.row_index || !newWord.left_text || !newWord.right_text) {
      alert('Please fill all fields for new word');
      return;
    }
    axios
      .post('http://localhost:4000/api/words', {
        deck_id: parseInt(deckId, 10),
        row_index: parseInt(newWord.row_index, 10),
        left_text: newWord.left_text,
        right_text: newWord.right_text,
      })
      .then((response) => {
        // 새 단어를 단어 목록에 추가
        setWords((prev) => [...prev, response.data]);
        // 폼 초기화
        setNewWord({ row_index: '', left_text: '', right_text: '' });
      })
      .catch((error) => console.error('Error adding new word:', error));
  };

  return (
    <div>
      <h2>Words in Deck {deckName ? deckName : deckId}</h2>
      {words.length === 0 ? (
        <p>No words found for this deck.</p>
      ) : (
        <ul>
          {words.map((word) => (
            <li key={word.id}>
              <strong>{word.left_text}</strong> - {word.right_text} (Row{' '}
              {word.row_index})
            </li>
          ))}
        </ul>
      )}
      <h3>Add New Word</h3>
      <form onSubmit={handleNewWordSubmit}>
        <div>
          <label>Row Index: </label>
          <input
            type="number"
            name="row_index"
            value={newWord.row_index}
            onChange={handleNewWordChange}
            required
          />
        </div>
        <div>
          <label>Left Text: </label>
          <input
            type="text"
            name="left_text"
            value={newWord.left_text}
            onChange={handleNewWordChange}
            required
          />
        </div>
        <div>
          <label>Right Text: </label>
          <input
            type="text"
            name="right_text"
            value={newWord.right_text}
            onChange={handleNewWordChange}
            required
          />
        </div>
        <button type="submit">Add Word</button>
      </form>
    </div>
  );
}

export default DeckWords;
