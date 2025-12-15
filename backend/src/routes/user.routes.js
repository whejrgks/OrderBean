/**
 * 사용자 라우트
 * 사용자 관련 API 라우트 정의
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth');

// 사용자 정보 조회
router.get('/:userId', authenticate, userController.getUser);

// 사용자 정보 수정
router.put('/:userId', authenticate, userController.updateUser);

// 취향 프로필 조회
router.get('/:userId/taste-profile', authenticate, userController.getTasteProfile);

// 취향 프로필 생성/수정
router.put('/:userId/taste-profile', authenticate, userController.updateTasteProfile);

module.exports = router;

