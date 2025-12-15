/**
 * 리뷰 라우트
 * 리뷰 관련 API 라우트 정의
 */

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middleware/auth');

// 카페 리뷰 목록 조회
router.get('/cafe/:cafeId', reviewController.getReviews);

// 리뷰 작성
router.post('/cafe/:cafeId', authenticate, reviewController.createReview);

// 리뷰 수정
router.put('/:reviewId', authenticate, reviewController.updateReview);

// 리뷰 삭제
router.delete('/:reviewId', authenticate, reviewController.deleteReview);

module.exports = router;

