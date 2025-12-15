/**
 * 추천 서비스
 * 취향 일치도 계산 및 추천 비즈니스 로직
 */

const recommendationService = {
  /**
   * 사용자 취향과 카페의 일치도 계산
   */
  async calculateMatchScore(userTaste, cafeData) {
    // TODO: 취향 일치도 계산 알고리즘 구현
    let totalScore = 0;
    let maxScore = 0;
    const reasons = [];

    // 산미 일치도 (가중치: 0.3)
    if (userTaste.acidity && cafeData.avgAcidity) {
      const diff = Math.abs(userTaste.acidity - cafeData.avgAcidity);
      const score = Math.max(0, 100 - (diff * 20));
      totalScore += score * 0.3;
      maxScore += 100 * 0.3;
      if (score > 70) reasons.push('산미가 취향과 잘 맞습니다');
    }

    // 로스팅 일치도 (가중치: 0.3)
    if (userTaste.roasting && cafeData.avgRoasting) {
      const diff = Math.abs(userTaste.roasting - cafeData.avgRoasting);
      const score = Math.max(0, 100 - (diff * 25));
      totalScore += score * 0.3;
      maxScore += 100 * 0.3;
      if (score > 70) reasons.push('로스팅 정도가 취향과 일치합니다');
    }

    // 바디감 일치도 (가중치: 0.2)
    if (userTaste.body && cafeData.avgBody) {
      const diff = Math.abs(userTaste.body - cafeData.avgBody);
      const score = Math.max(0, 100 - (diff * 20));
      totalScore += score * 0.2;
      maxScore += 100 * 0.2;
      if (score > 70) reasons.push('바디감이 취향과 잘 맞습니다');
    }

    // 단맛 일치도 (가중치: 0.2)
    if (userTaste.sweetness && cafeData.avgSweetness) {
      const diff = Math.abs(userTaste.sweetness - cafeData.avgSweetness);
      const score = Math.max(0, 100 - (diff * 20));
      totalScore += score * 0.2;
      maxScore += 100 * 0.2;
      if (score > 70) reasons.push('단맛이 취향과 일치합니다');
    }

    const finalScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return {
      score: finalScore,
      reasons: reasons.length > 0 ? reasons : ['기본 추천 카페입니다'],
    };
  },

  /**
   * 개인화 추천 카페 목록 생성
   */
  async getPersonalizedRecommendations(userId, location, limit = 20) {
    // TODO: 사용자 취향 기반 추천 카페 목록 생성
    // 1. 사용자 취향 프로필 조회
    // 2. 위치 기반 카페 검색
    // 3. 각 카페별 일치도 계산
    // 4. 일치도 순으로 정렬하여 반환
    return [];
  },
};

module.exports = recommendationService;

