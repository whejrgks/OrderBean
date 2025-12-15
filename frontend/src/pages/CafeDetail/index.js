/**
 * 카페 상세 페이지
 * 카페 상세 정보 및 리뷰 페이지
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/ReviewForm';

const CafeDetail = () => {
  const { cafeId } = useParams();
  const [cafe, setCafe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [matchScore, setMatchScore] = useState(null);

  useEffect(() => {
    // TODO: 카페 상세 정보 및 리뷰 조회 API 호출
    // TODO: 취향 일치도 계산
  }, [cafeId]);

  const handleReviewSubmit = (reviewData) => {
    // TODO: 리뷰 작성 API 호출
    console.log('리뷰 작성:', reviewData);
  };

  return (
    <div className="cafe-detail-page">
      {cafe && (
        <>
          <h1>{cafe.name}</h1>
          <p>{cafe.address}</p>
          {matchScore && (
            <div className="match-score">
              <h2>취향 일치도: {matchScore.score}%</h2>
              <ul>
                {matchScore.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="reviews-section">
            <h2>리뷰</h2>
            <ReviewForm cafeId={cafeId} onSubmit={handleReviewSubmit} />
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <p>{review.content}</p>
                  <div className="review-tags">{review.tags.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CafeDetail;

