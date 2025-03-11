// src/Test/ReviewTimer.js
import React, { useState, useEffect } from 'react';
import './ReviewTimer.css';

function formatTime(seconds) {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function ReviewTimer({ initialSeconds = 86400 }) {
  // 기본 24시간 (86400초)
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    // 타이머가 0 이하가 되면 멈춤
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          // 복습 시간이 되었을 때 알림 (옵션)
          alert('복습할 시간이 되었습니다!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleReset = () => {
    setTimeLeft(initialSeconds);
  };

  return (
    <div className="review-timer">
      <h2>Review Timer</h2>
      <p>다음 복습까지 남은 시간: {formatTime(timeLeft)}</p>
      <button onClick={handleReset}>Reset Timer</button>
    </div>
  );
}

export default ReviewTimer;
