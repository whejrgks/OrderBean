/**
 * 리뷰 모델
 * 리뷰 데이터 스키마 정의
 */

// TODO: 실제 데이터베이스 ORM (예: Sequelize, Mongoose) 모델로 구현

const Review = {
  schema: {
    id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
    userId: { type: 'INTEGER', foreignKey: true, references: 'User.id' },
    cafeId: { type: 'INTEGER', foreignKey: true, references: 'Cafe.id' },
    content: { type: 'TEXT', allowNull: false },
    tags: { type: 'JSON', allowNull: false }, // 표준화된 태그 배열
    acidity: { type: 'INTEGER', min: 1, max: 10 }, // 산미 점수
    roasting: { type: 'INTEGER', min: 1, max: 10 }, // 로스팅 점수
    body: { type: 'INTEGER', min: 1, max: 10 }, // 바디감 점수
    sweetness: { type: 'INTEGER', min: 1, max: 10 }, // 단맛 점수
    rating: { type: 'INTEGER', min: 1, max: 5 },
    isDeleted: { type: 'BOOLEAN', defaultValue: false },
    createdAt: { type: 'DATE', defaultValue: 'NOW' },
    updatedAt: { type: 'DATE', defaultValue: 'NOW' },
  },

  associations: {
    belongsTo: ['User', 'Cafe'],
  },

  indexes: [
    { fields: ['cafeId'] }, // 카페별 리뷰 조회를 위한 인덱스
    { fields: ['userId'] }, // 사용자별 리뷰 조회를 위한 인덱스
  ],
};

module.exports = Review;

