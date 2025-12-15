/**
 * 일치도 계산 유틸리티
 * 다양한 일치도 계산 알고리즘 제공
 */

/**
 * 유클리드 거리 기반 일치도 계산
 */
function euclideanDistance(userTaste, cafeData) {
  const differences = [];
  
  if (userTaste.acidity && cafeData.avgAcidity) {
    differences.push(Math.pow(userTaste.acidity - cafeData.avgAcidity, 2));
  }
  if (userTaste.roasting && cafeData.avgRoasting) {
    differences.push(Math.pow(userTaste.roasting - cafeData.avgRoasting, 2));
  }
  if (userTaste.body && cafeData.avgBody) {
    differences.push(Math.pow(userTaste.body - cafeData.avgBody, 2));
  }
  if (userTaste.sweetness && cafeData.avgSweetness) {
    differences.push(Math.pow(userTaste.sweetness - cafeData.avgSweetness, 2));
  }

  if (differences.length === 0) return 0;

  const distance = Math.sqrt(differences.reduce((a, b) => a + b, 0));
  // 거리를 점수로 변환 (0-100)
  return Math.max(0, 100 - (distance * 10));
}

/**
 * 코사인 유사도 기반 일치도 계산
 */
function cosineSimilarity(userTaste, cafeData) {
  const userVector = [];
  const cafeVector = [];

  const keys = ['acidity', 'roasting', 'body', 'sweetness'];
  keys.forEach(key => {
    if (userTaste[key] && cafeData[`avg${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
      userVector.push(userTaste[key]);
      cafeVector.push(cafeData[`avg${key.charAt(0).toUpperCase() + key.slice(1)}`]);
    }
  });

  if (userVector.length === 0) return 0;

  const dotProduct = userVector.reduce((sum, val, i) => sum + val * cafeVector[i], 0);
  const userMagnitude = Math.sqrt(userVector.reduce((sum, val) => sum + val * val, 0));
  const cafeMagnitude = Math.sqrt(cafeVector.reduce((sum, val) => sum + val * val, 0));

  if (userMagnitude === 0 || cafeMagnitude === 0) return 0;

  const similarity = dotProduct / (userMagnitude * cafeMagnitude);
  return Math.round(similarity * 100);
}

module.exports = {
  euclideanDistance,
  cosineSimilarity,
};

