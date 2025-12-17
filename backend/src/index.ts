import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFoundHandler, errorHandler } from './utils/errorHandler'

// 환경 변수 로드
dotenv.config()

// Express 앱 생성
const app = express()
const PORT = process.env.PORT || 5000

// 미들웨어 설정
app.use(cors())
app.use(express.json())

// 기본 라우트 (Health check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// API 라우트는 나중에 추가
// app.use('/api/menus', menuRoutes)
// app.use('/api/orders', orderRoutes)
// app.use('/api/admin', adminRoutes)

// 에러 핸들링 (순서 중요: 404 핸들러 먼저, 에러 핸들러는 마지막)
app.use(notFoundHandler)
app.use(errorHandler)

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

