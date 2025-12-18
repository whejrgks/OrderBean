import axios from 'axios'
import { API_CONFIG, ENV } from '../constants/config'

// Vite 프록시를 사용하므로 상대 경로 사용
// 개발 환경: Vite 프록시 사용 (/api -> http://localhost:5000)
// 프로덕션: 환경 변수에서 가져오거나 절대 경로 사용
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_CONFIG.TIMEOUT,
})

// 요청 인터셉터 (개발 환경에서만 디버깅)
api.interceptors.request.use(
  (config) => {
    if (ENV.IS_DEV) {
      const fullUrl = `${config.baseURL}${config.url}`
      console.log('🚀 API Request:', config.method?.toUpperCase(), fullUrl)
      console.log('Request config:', config)
    }
    return config
  },
  (error) => {
    if (ENV.IS_DEV) {
      console.error('❌ API Request Error:', error)
    }
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => {
    if (ENV.IS_DEV) {
      console.log('✅ API Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    if (ENV.IS_DEV) {
      console.error('❌ API Response Error:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        response: error.response,
        config: error.config,
      })
    }
    if (error.code === 'ECONNREFUSED') {
      error.message = '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.'
    } else if (error.code === 'ERR_NETWORK') {
      error.message = '네트워크 오류가 발생했습니다.'
    } else if (error.response) {
      error.message = `서버 오류: ${error.response.status} ${error.response.statusText}`
    }
    return Promise.reject(error)
  }
)

export default api

