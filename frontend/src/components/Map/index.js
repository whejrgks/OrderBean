/**
 * 지도 컴포넌트
 * 카페 위치를 지도에 표시하는 컴포넌트
 */

import React from 'react';

const Map = ({ cafes, onCafeClick, center, zoom = 15 }) => {
  // TODO: 지도 라이브러리 (예: Google Maps, Naver Maps, Kakao Maps) 통합
  return (
    <div className="map-container" style={{ width: '100%', height: '100%' }}>
      {/* 지도 구현 */}
      <p>지도 컴포넌트 (구현 예정)</p>
    </div>
  );
};

export default Map;

