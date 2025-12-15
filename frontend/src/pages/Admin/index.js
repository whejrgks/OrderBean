/**
 * 관리자 대시보드 페이지
 * 관리자용 통계 및 관리 페이지
 */

import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCafes: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    // TODO: 관리자 대시보드 통계 API 호출
  }, []);

  return (
    <div className="admin-page">
      <h1>관리자 대시보드</h1>
      <div className="stats">
        <div className="stat-item">
          <h2>전체 사용자</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-item">
          <h2>전체 카페</h2>
          <p>{stats.totalCafes}</p>
        </div>
        <div className="stat-item">
          <h2>전체 리뷰</h2>
          <p>{stats.totalReviews}</p>
        </div>
      </div>
      {/* TODO: 사용자 관리, 카페 관리, 리뷰 관리 기능 추가 */}
    </div>
  );
};

export default Admin;

