// src/components/DeckWords.js
import React from 'react';

function DeckWords() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* 카드 컨테이너 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
        {/* 헤더 영역 */}
        <div className="bg-red-500 p-6">
          <h2 className="text-white text-2xl font-semibold">Deck Words</h2>
        </div>
        {/* 내용 영역 */}
        <div className="p-6">
          <p className="text-gray-700">여기에 단어 카드 내용이 들어갑니다.</p>
        </div>
      </div>
    </div>
  );
}

export default DeckWords;
