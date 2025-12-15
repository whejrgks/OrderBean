/**
 * 홈 페이지
 * 메인 홈 페이지 컴포넌트
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>BeanTaste Map</h1>
      <p>당신의 취향에 맞는 완벽한 카페를 찾아드립니다</p>
      <Link to="/map">지도에서 카페 찾기</Link>
      <Link to="/taste-survey">취향 설문하기</Link>
    </div>
  );
};

export default Home;

