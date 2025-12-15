/**
 * 인증 미들웨어
 * JWT 토큰 기반 인증 처리
 */

const jwt = require('jsonwebtoken');

/**
 * 인증 토큰 검증 미들웨어
 */
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰

    if (!token) {
      return res.status(401).json({ error: '인증 토큰이 필요합니다' });
    }

    // TODO: 실제 JWT 검증 로직 구현
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: '유효하지 않은 토큰입니다' });
  }
};

/**
 * 관리자 권한 확인 미들웨어
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: '인증이 필요합니다' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: '관리자 권한이 필요합니다' });
  }

  next();
};

module.exports = {
  authenticate,
  isAdmin,
};

