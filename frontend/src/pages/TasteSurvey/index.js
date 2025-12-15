/**
 * 취향 설문 페이지
 * 사용자 커피 취향 설문 페이지
 */

import React from 'react';
import TasteProfile from '../../components/TasteProfile';
import { useNavigate } from 'react-router-dom';

const TasteSurvey = () => {
  const navigate = useNavigate();

  const handleUpdate = async (tasteProfile) => {
    // TODO: 취향 프로필 저장 API 호출
    console.log('취향 프로필 저장:', tasteProfile);
    navigate('/map');
  };

  return (
    <div className="taste-survey-page">
      <h1>커피 취향 설문</h1>
      <p>당신의 커피 취향을 알려주세요</p>
      <TasteProfile profile={null} onUpdate={handleUpdate} />
    </div>
  );
};

export default TasteSurvey;

