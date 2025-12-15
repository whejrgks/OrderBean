/**
 * 백엔드 서버 진입점
 * Express 서버 설정 및 라우트 연결
 */

const express = require('express');
const cors = require('cors');
const config = require('./config/env');

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트
const userRoutes = require('./routes/user.routes');
const cafeRoutes = require('./routes/cafe.routes');
const reviewRoutes = require('./routes/review.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/api/users', userRoutes);
app.use('/api/cafes', cafeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'BeanTaste Map API' });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '서버 오류가 발생했습니다' });
});

// 서버 시작
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
});

module.exports = app;

