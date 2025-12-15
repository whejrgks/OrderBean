/**
 * 유효성 검증 미들웨어
 * 요청 데이터 유효성 검증
 */

/**
 * 취향 프로필 유효성 검증
 */
const validateTasteProfile = (req, res, next) => {
  const { acidity, roasting, body, sweetness } = req.body;

  const errors = [];

  if (acidity !== undefined && (acidity < 1 || acidity > 10)) {
    errors.push('산미는 1-10 사이의 값이어야 합니다');
  }

  if (roasting !== undefined && (roasting < 1 || roasting > 10)) {
    errors.push('로스팅은 1-10 사이의 값이어야 합니다');
  }

  if (body !== undefined && (body < 1 || body > 10)) {
    errors.push('바디감은 1-10 사이의 값이어야 합니다');
  }

  if (sweetness !== undefined && (sweetness < 1 || sweetness > 10)) {
    errors.push('단맛은 1-10 사이의 값이어야 합니다');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

/**
 * 리뷰 유효성 검증
 */
const validateReview = (req, res, next) => {
  const { content, tags, acidity, roasting, body, sweetness, rating } = req.body;

  const errors = [];

  if (!content || content.trim().length === 0) {
    errors.push('리뷰 내용은 필수입니다');
  }

  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    errors.push('태그는 최소 1개 이상 필요합니다');
  }

  if (acidity !== undefined && (acidity < 1 || acidity > 10)) {
    errors.push('산미는 1-10 사이의 값이어야 합니다');
  }

  if (rating !== undefined && (rating < 1 || rating > 5)) {
    errors.push('평점은 1-5 사이의 값이어야 합니다');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateTasteProfile,
  validateReview,
};

