// src/Test/StreakTracker.js
import React, { useState, useEffect } from 'react';
import './StreakTracker.css';

function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const [lastReviewDate, setLastReviewDate] = useState(null);

  // 컴포넌트 마운트 시 localStorage에서 값 로드
  useEffect(() => {
    const storedStreak = parseInt(
      localStorage.getItem('reviewStreak') || '0',
      10
    );
    const storedDate = localStorage.getItem('lastReviewDate');
    setStreak(storedStreak);
    setLastReviewDate(storedDate ? new Date(storedDate) : null);
  }, []);

  const handleMarkReview = () => {
    const today = new Date();
    const todayString = today.toDateString();

    if (!lastReviewDate) {
      // 처음 복습을 기록하는 경우
      setStreak(1);
      setLastReviewDate(today);
      localStorage.setItem('reviewStreak', '1');
      localStorage.setItem('lastReviewDate', today.toISOString());
      alert('복습 시작! 오늘부터 연속 복습 스트릭이 시작됩니다.');
      return;
    }

    // 이미 오늘 복습 기록이 있는지 확인
    if (lastReviewDate.toDateString() === todayString) {
      alert('오늘은 이미 복습하셨습니다!');
      return;
    }

    // 어제와 연속인지 확인 (하루 차이)
    const diffTime = today - lastReviewDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 2) {
      // 연속 복습
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLastReviewDate(today);
      localStorage.setItem('reviewStreak', newStreak.toString());
      localStorage.setItem('lastReviewDate', today.toISOString());
      alert(`좋아요! 연속 복습 ${newStreak}일째입니다.`);
    } else {
      // 연속이 끊긴 경우, 스트릭 재설정
      setStreak(1);
      setLastReviewDate(today);
      localStorage.setItem('reviewStreak', '1');
      localStorage.setItem('lastReviewDate', today.toISOString());
      alert('연속 복습이 끊어졌습니다. 오늘부터 새로 시작합니다.');
    }
  };

  return (
    <div className="streak-tracker">
      <h2>Review Streak Tracker</h2>
      <p>
        현재 연속 복습: <strong>{streak}</strong>일
      </p>
      <button onClick={handleMarkReview}>오늘의 복습 완료</button>
    </div>
  );
}

export default StreakTracker;
