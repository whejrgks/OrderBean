/**
 * 취향 프로필 모델
 * 사용자 커피 취향 프로필 데이터 스키마 정의
 */

// TODO: 실제 데이터베이스 ORM (예: Sequelize, Mongoose) 모델로 구현

const TasteProfile = {
  schema: {
    id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
    userId: { type: 'INTEGER', foreignKey: true, references: 'User.id', unique: true },
    acidity: { type: 'INTEGER', min: 1, max: 10 }, // 선호하는 산미 정도
    roasting: { type: 'INTEGER', min: 1, max: 10 }, // 선호하는 로스팅 정도 (1: 라이트, 10: 다크)
    body: { type: 'INTEGER', min: 1, max: 10 }, // 선호하는 바디감 정도
    sweetness: { type: 'INTEGER', min: 1, max: 10 }, // 선호하는 단맛 정도
    bitterness: { type: 'INTEGER', min: 1, max: 10 }, // 선호하는 쓴맛 정도
    preferredOrigin: { type: 'JSON' }, // 선호하는 원산지 배열
    preferredProcessing: { type: 'JSON' }, // 선호하는 가공 방식 배열
    createdAt: { type: 'DATE', defaultValue: 'NOW' },
    updatedAt: { type: 'DATE', defaultValue: 'NOW' },
  },

  associations: {
    belongsTo: ['User'],
  },
};

module.exports = TasteProfile;

