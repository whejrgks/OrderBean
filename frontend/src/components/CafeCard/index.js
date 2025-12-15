/**
 * 카페 카드 컴포넌트
 * 카페 정보를 카드 형태로 표시하는 컴포넌트
 */

import React from 'react';

const CafeCard = ({ cafe, matchScore, onClick }) => {
  return (
    <div className="cafe-card" onClick={onClick}>
      <h3>{cafe.name}</h3>
      <p>{cafe.address}</p>
      {matchScore && (
        <div className="match-score">
          <span>취향 일치도: {matchScore.score}%</span>
        </div>
      )}
      {cafe.rating && <div className="rating">평점: {cafe.rating}</div>}
    </div>
  );
};

export default CafeCard;

