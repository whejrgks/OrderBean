/**
 * 리뷰 서비스
 * 리뷰 관련 비즈니스 로직
 */

const reviewService = {
  /**
   * 카페 리뷰 목록 조회
   */
  async getReviewsByCafe(cafeId, page = 1, limit = 10) {
    // TODO: 카페별 리뷰 목록 조회 로직
    return {
      reviews: [],
      pagination: { page, limit, total: 0 },
    };
  },

  /**
   * 리뷰 작성
   */
  async createReview(userId, cafeId, reviewData) {
    // TODO: 리뷰 작성 로직 (태그 검증 포함)
    return {
      id: 'new-review-id',
      userId,
      cafeId,
      ...reviewData,
    };
  },

  /**
   * 리뷰 수정
   */
  async updateReview(reviewId, userId, reviewData) {
    // TODO: 리뷰 수정 로직 (작성자 확인)
    return { id: reviewId, userId, ...reviewData };
  },

  /**
   * 리뷰 삭제
   */
  async deleteReview(reviewId, userId, isAdmin = false) {
    // TODO: 리뷰 삭제 로직 (작성자 또는 관리자 확인)
    return { id: reviewId, deleted: true };
  },

  /**
   * 리뷰 태그 검증
   */
  validateReviewTags(tags) {
    // TODO: 표준화된 태그 값만 허용하는 검증 로직
    const validTags = ['산미높음', '로스팅라이트', '바디감강함', '단맛있음'];
    return tags.every(tag => validTags.includes(tag));
  },
};

module.exports = reviewService;

