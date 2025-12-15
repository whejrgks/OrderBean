/**
 * 카페 라우트
 * 카페 관련 API 라우트 정의
 */

const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafe.controller');
const { authenticate, isAdmin } = require('../middleware/auth');

// 카페 목록 조회 (지도 검색)
router.get('/', cafeController.getCafes);

// 카페 상세 정보 조회
router.get('/:cafeId', cafeController.getCafeDetail);

// 취향 일치도 기반 추천 카페 목록
router.get('/recommendations/:userId', authenticate, cafeController.getRecommendedCafes);

// 카페 생성 (관리자만)
router.post('/', authenticate, isAdmin, cafeController.createCafe);

// 카페 정보 수정 (관리자만)
router.put('/:cafeId', authenticate, isAdmin, cafeController.updateCafe);

module.exports = router;

