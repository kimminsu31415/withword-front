// src/components/DeckList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // API 엔드포인트: GET /api/decks
    axios
      .get('http://localhost:4000/api/decks')
      .then((response) => setDecks(response.data))
      .catch((error) => console.error('Error fetching decks:', error));
  }, []);

  return (
    <div>
      <h2>Deck List</h2>
      {decks.length === 0 ? (
        <p>No decks found.</p>
      ) : (
        <ul>
          {decks.map((deck) => (
            <li key={deck.id}>
              {deck.title} -{' '}
              <Link to={`/decks/${deck.id}/words`}>View Words</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeckList;
