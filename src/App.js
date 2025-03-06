// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeckList from './components/DeckList';
import CreateDeck from './components/CreateDeck';
import DeckWords from './components/DeckWords';
import Design from './components/Design';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>WithWord MVP</h1>
        <nav>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li>
              <Link to="/decks">Deck List</Link>
            </li>
            <li>
              <Link to="/create-deck">Create Deck</Link>
            </li>
            <li>
              <Link to="/design">Test Design</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Routes>
          <Route path="/decks" element={<DeckList />} />
          <Route path="/create-deck" element={<CreateDeck />} />
          <Route path="/decks/:deckId/words" element={<DeckWords />} />
          <Route path="/design" element={<Design />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
