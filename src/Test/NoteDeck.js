import React, { useState } from 'react';
import './NoteDeck.css';

const initialRows = Array.from({ length: 10 }, () => ({ left: '', right: '' }));

function NoteDeck() {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (index, side, value) => {
    const newRows = [...rows];
    newRows[index][side] = value;
    setRows(newRows);
  };

  const handleSave = () => {
    console.log('Saved Note Deck:', rows);
    alert('Note deck saved! (Check console for details)');
  };

  return (
    <div className="note-deck">
      <h2>Note Deck</h2>
      {rows.map((row, index) => (
        <div className="note-row" key={index}>
          <input
            type="text"
            className="note-input left-input"
            placeholder="단어/표현"
            value={row.left}
            onChange={(e) => handleChange(index, 'left', e.target.value)}
          />
          <div className="vertical-divider" />
          <input
            type="text"
            className="note-input right-input"
            placeholder="해설/뜻"
            value={row.right}
            onChange={(e) => handleChange(index, 'right', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSave}>Save Note Deck</button>
    </div>
  );
}

export default NoteDeck;
