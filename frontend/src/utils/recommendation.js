/**
 * 추천 알고리즘 유틸리티
 * 클라이언트 사이드 추천 계산 헬퍼 함수
 */

/**
 * 사용자 취향과 카페 데이터의 일치도 계산
 * @param {Object} userTaste - 사용자 취향 프로필
 * @param {Object} cafeData - 카페 데이터
 * @returns {Object} 일치도 점수 및 추천 사유
 */
export function calculateMatchScore(userTaste, cafeData) {
  let totalScore = 0;
  let maxScore = 0;
  const reasons = [];

  // 산미 일치도
  if (userTaste.acidity && cafeData.avgAcidity) {
    const acidityDiff = Math.abs(userTaste.acidity - cafeData.avgAcidity);
    const acidityScore = Math.max(0, 100 - (acidityDiff * 20));
    totalScore += acidityScore * 0.3;
    maxScore += 100 * 0.3;
    if (acidityScore > 70) {
      reasons.push('산미가 취향과 잘 맞습니다');
    }
  }

  // 로스팅 일치도
  if (userTaste.roasting && cafeData.avgRoasting) {
    const roastingDiff = Math.abs(userTaste.roasting - cafeData.avgRoasting);
    const roastingScore = Math.max(0, 100 - (roastingDiff * 25));
    totalScore += roastingScore * 0.3;
    maxScore += 100 * 0.3;
    if (roastingScore > 70) {
      reasons.push('로스팅 정도가 취향과 일치합니다');
    }
  }

  // 바디감 일치도
  if (userTaste.body && cafeData.avgBody) {
    const bodyDiff = Math.abs(userTaste.body - cafeData.avgBody);
    const bodyScore = Math.max(0, 100 - (bodyDiff * 20));
    totalScore += bodyScore * 0.2;
    maxScore += 100 * 0.2;
    if (bodyScore > 70) {
      reasons.push('바디감이 취향과 잘 맞습니다');
    }
  }

  // 단맛 일치도
  if (userTaste.sweetness && cafeData.avgSweetness) {
    const sweetnessDiff = Math.abs(userTaste.sweetness - cafeData.avgSweetness);
    const sweetnessScore = Math.max(0, 100 - (sweetnessDiff * 20));
    totalScore += sweetnessScore * 0.2;
    maxScore += 100 * 0.2;
    if (sweetnessScore > 70) {
      reasons.push('단맛이 취향과 일치합니다');
    }
  }

  const finalScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return {
    score: finalScore,
    reasons: reasons.length > 0 ? reasons : ['기본 추천 카페입니다'],
    details: {
      acidity: userTaste.acidity && cafeData.avgAcidity 
        ? Math.max(0, 100 - Math.abs(userTaste.acidity - cafeData.avgAcidity) * 20)
        : null,
      roasting: userTaste.roasting && cafeData.avgRoasting
        ? Math.max(0, 100 - Math.abs(userTaste.roasting - cafeData.avgRoasting) * 25)
        : null,
      body: userTaste.body && cafeData.avgBody
        ? Math.max(0, 100 - Math.abs(userTaste.body - cafeData.avgBody) * 20)
        : null,
      sweetness: userTaste.sweetness && cafeData.avgSweetness
        ? Math.max(0, 100 - Math.abs(userTaste.sweetness - cafeData.avgSweetness) * 20)
        : null,
    },
  };
}

/**
 * 카페 목록을 일치도 점수 기준으로 정렬
 * @param {Array} cafes - 카페 목록
 * @param {Object} userTaste - 사용자 취향 프로필
 * @returns {Array} 정렬된 카페 목록
 */
export function sortCafesByMatch(cafes, userTaste) {
  return cafes
    .map(cafe => ({
      ...cafe,
      matchScore: calculateMatchScore(userTaste, cafe),
    }))
    .sort((a, b) => b.matchScore.score - a.matchScore.score);
}

