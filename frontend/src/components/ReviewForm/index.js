/**
 * 리뷰 작성 폼 컴포넌트
 * 카페 리뷰를 작성하는 폼 컴포넌트
 */

import React, { useState } from 'react';

const ReviewForm = ({ cafeId, onSubmit }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [acidity, setAcidity] = useState(5);
  const [roasting, setRoasting] = useState(5);
  const [body, setBody] = useState(5);
  const [sweetness, setSweetness] = useState(5);
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      cafeId,
      content,
      tags,
      acidity,
      roasting,
      body,
      sweetness,
      rating,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="리뷰를 작성해주세요"
        required
      />
      <div className="taste-ratings">
        <label>
          산미: <input type="number" min="1" max="10" value={acidity} onChange={(e) => setAcidity(Number(e.target.value))} />
        </label>
        <label>
          로스팅: <input type="number" min="1" max="10" value={roasting} onChange={(e) => setRoasting(Number(e.target.value))} />
        </label>
        <label>
          바디감: <input type="number" min="1" max="10" value={body} onChange={(e) => setBody(Number(e.target.value))} />
        </label>
        <label>
          단맛: <input type="number" min="1" max="10" value={sweetness} onChange={(e) => setSweetness(Number(e.target.value))} />
        </label>
      </div>
      <label>
        평점: <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      </label>
      <button type="submit">리뷰 등록</button>
    </form>
  );
};

export default ReviewForm;

