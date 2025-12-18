import { Request, Response, NextFunction } from 'express'

// 404 핸들러 - 존재하지 않는 라우트 처리
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' })
}

// 기본 에러 핸들러 - 서버 내부 오류 처리
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}

