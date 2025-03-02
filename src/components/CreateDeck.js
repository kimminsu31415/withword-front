// src/components/CreateDeck.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateDeck() {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 엔드포인트: POST /api/decks
    axios
      .post('http://localhost:4000/api/decks', {
        user_id: parseInt(userId),
        title: title,
      })
      .then((response) => {
        console.log('Deck created:', response.data);
        navigate('/decks');
      })
      .catch((error) => console.error('Error creating deck:', error));
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID: </label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Deck Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Deck</button>
      </form>
    </div>
  );
}

export default CreateDeck;
