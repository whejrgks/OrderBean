/**
 * 인증 서비스
 * 사용자 인증 관련 기능
 */

import api from './api';

export const authService = {
  /**
   * 사용자 로그인
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  /**
   * 사용자 로그아웃
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * 사용자 회원가입
   */
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  /**
   * 현재 로그인한 사용자 정보 가져오기
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * 인증 토큰 가져오기
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * 로그인 상태 확인
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
};

export default authService;

