/**
 * 취향 프로필 컴포넌트
 * 사용자 취향 프로필을 표시하고 수정하는 컴포넌트
 */

import React, { useState } from 'react';

const TasteProfile = ({ profile, onUpdate }) => {
  const [acidity, setAcidity] = useState(profile?.acidity || 5);
  const [roasting, setRoasting] = useState(profile?.roasting || 5);
  const [body, setBody] = useState(profile?.body || 5);
  const [sweetness, setSweetness] = useState(profile?.sweetness || 5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      acidity,
      roasting,
      body,
      sweetness,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="taste-profile">
      <h2>커피 취향 프로필</h2>
      <div className="taste-inputs">
        <label>
          산미: {acidity}
          <input
            type="range"
            min="1"
            max="10"
            value={acidity}
            onChange={(e) => setAcidity(Number(e.target.value))}
          />
        </label>
        <label>
          로스팅: {roasting}
          <input
            type="range"
            min="1"
            max="10"
            value={roasting}
            onChange={(e) => setRoasting(Number(e.target.value))}
          />
        </label>
        <label>
          바디감: {body}
          <input
            type="range"
            min="1"
            max="10"
            value={body}
            onChange={(e) => setBody(Number(e.target.value))}
          />
        </label>
        <label>
          단맛: {sweetness}
          <input
            type="range"
            min="1"
            max="10"
            value={sweetness}
            onChange={(e) => setSweetness(Number(e.target.value))}
          />
        </label>
      </div>
      <button type="submit">취향 저장</button>
    </form>
  );
};

export default TasteProfile;

