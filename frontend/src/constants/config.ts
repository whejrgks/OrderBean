// 애플리케이션 설정 상수

// API 설정
export const API_CONFIG = {
  TIMEOUT: 5000, // 5초 타임아웃
  BASE_URL: import.meta.env.VITE_API_URL || '/api',
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
} as const

// 재고 관리 설정
export const INVENTORY_CONFIG = {
  DEFAULT_STOCK: 10, // 기본 재고 수량
} as const

// 환경 설정
export const ENV = {
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const

