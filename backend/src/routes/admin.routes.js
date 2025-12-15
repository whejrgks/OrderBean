/**
 * 관리자 라우트
 * 관리자 관련 API 라우트 정의
 */

const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');

// 관리자 대시보드 통계
router.get('/dashboard', authenticate, isAdmin, async (req, res) => {
  try {
    // TODO: 대시보드 통계 데이터 조회
    res.json({
      totalUsers: 0,
      totalCafes: 0,
      totalReviews: 0,
      recentActivity: [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 사용자 관리
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    // TODO: 사용자 목록 조회
    res.json({ users: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 리뷰 관리 (신고된 리뷰 등)
router.get('/reviews', authenticate, isAdmin, async (req, res) => {
  try {
    // TODO: 관리자용 리뷰 목록 조회
    res.json({ reviews: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 리뷰 삭제 (관리자)
router.delete('/reviews/:reviewId', authenticate, isAdmin, async (req, res) => {
  try {
    const { reviewId } = req.params;
    // TODO: 관리자 리뷰 삭제 로직
    res.json({ message: '리뷰 삭제 완료', reviewId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

