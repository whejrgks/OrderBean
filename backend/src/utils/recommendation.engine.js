/**
 * 추천 엔진
 * 취향 일치도 계산 알고리즘
 */

/**
 * 가중치 기반 일치도 계산
 * @param {Object} userTaste - 사용자 취향 프로필
 * @param {Object} cafeData - 카페 평균 맛 데이터
 * @param {Object} weights - 각 항목별 가중치 (기본값 제공)
 * @returns {Object} 일치도 점수 및 상세 정보
 */
function calculateMatchScore(userTaste, cafeData, weights = {}) {
  const defaultWeights = {
    acidity: 0.3,
    roasting: 0.3,
    body: 0.2,
    sweetness: 0.2,
  };

  const finalWeights = { ...defaultWeights, ...weights };
  let totalScore = 0;
  let maxScore = 0;
  const reasons = [];
  const details = {};

  // 각 항목별 일치도 계산
  Object.keys(finalWeights).forEach(key => {
    if (userTaste[key] && cafeData[`avg${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
      const userValue = userTaste[key];
      const cafeValue = cafeData[`avg${key.charAt(0).toUpperCase() + key.slice(1)}`];
      const diff = Math.abs(userValue - cafeValue);
      
      // 차이가 작을수록 높은 점수 (최대 100점)
      const score = Math.max(0, 100 - (diff * 20));
      const weightedScore = score * finalWeights[key];
      
      totalScore += weightedScore;
      maxScore += 100 * finalWeights[key];
      details[key] = score;

      // 추천 사유 생성
      if (score > 70) {
        const keyNames = {
          acidity: '산미',
          roasting: '로스팅',
          body: '바디감',
          sweetness: '단맛',
        };
        reasons.push(`${keyNames[key]}가 취향과 잘 맞습니다`);
      }
    }
  });

  const finalScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return {
    score: finalScore,
    reasons: reasons.length > 0 ? reasons : ['기본 추천 카페입니다'],
    details,
  };
}

/**
 * 카페 목록을 일치도 기준으로 정렬
 */
function sortByMatchScore(cafes, userTaste, weights) {
  return cafes
    .map(cafe => ({
      ...cafe,
      matchScore: calculateMatchScore(userTaste, cafe, weights),
    }))
    .sort((a, b) => b.matchScore.score - a.matchScore.score);
}

module.exports = {
  calculateMatchScore,
  sortByMatchScore,
};

