/**
 * 지도 검색 페이지
 * 지도 기반 카페 검색 페이지
 */

import React, { useState, useEffect } from 'react';
import Map from '../../components/Map';
import CafeCard from '../../components/CafeCard';

const MapSearch = () => {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  useEffect(() => {
    // TODO: 위치 기반 카페 검색 API 호출
  }, []);

  return (
    <div className="map-search-page">
      <div className="map-container">
        <Map cafes={cafes} onCafeClick={setSelectedCafe} />
      </div>
      <div className="cafe-list">
        {cafes.map(cafe => (
          <CafeCard
            key={cafe.id}
            cafe={cafe}
            onClick={() => setSelectedCafe(cafe)}
          />
        ))}
      </div>
    </div>
  );
};

export default MapSearch;

