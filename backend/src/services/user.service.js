/**
 * 사용자 서비스
 * 사용자 관련 비즈니스 로직
 */

const userService = {
  /**
   * 사용자 정보 조회
   */
  async getUserById(userId) {
    // TODO: 데이터베이스에서 사용자 정보 조회
    return { id: userId, name: '사용자' };
  },

  /**
   * 사용자 정보 수정
   */
  async updateUser(userId, userData) {
    // TODO: 사용자 정보 업데이트 로직
    return { id: userId, ...userData };
  },

  /**
   * 취향 프로필 조회
   */
  async getTasteProfile(userId) {
    // TODO: 취향 프로필 조회 로직
    return { userId, acidity: 5, roasting: 3, body: 4, sweetness: 3 };
  },

  /**
   * 취향 프로필 저장
   */
  async saveTasteProfile(userId, tasteProfile) {
    // TODO: 취향 프로필 저장 로직
    return { userId, ...tasteProfile };
  },
};

module.exports = userService;

