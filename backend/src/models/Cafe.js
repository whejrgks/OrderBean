/**
 * 카페 모델
 * 카페 데이터 스키마 정의
 */

// TODO: 실제 데이터베이스 ORM (예: Sequelize, Mongoose) 모델로 구현

const Cafe = {
  schema: {
    id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
    name: { type: 'STRING', allowNull: false },
    address: { type: 'STRING', allowNull: false },
    latitude: { type: 'DECIMAL', allowNull: false },
    longitude: { type: 'DECIMAL', allowNull: false },
    phone: { type: 'STRING' },
    openingHours: { type: 'JSON' },
    avgAcidity: { type: 'DECIMAL', defaultValue: 0 }, // 리뷰 기반 평균값
    avgRoasting: { type: 'DECIMAL', defaultValue: 0 },
    avgBody: { type: 'DECIMAL', defaultValue: 0 },
    avgSweetness: { type: 'DECIMAL', defaultValue: 0 },
    createdAt: { type: 'DATE', defaultValue: 'NOW' },
    updatedAt: { type: 'DATE', defaultValue: 'NOW' },
  },

  associations: {
    hasMany: ['Review'],
  },

  indexes: [
    { fields: ['latitude', 'longitude'] }, // 위치 기반 검색을 위한 인덱스
  ],
};

module.exports = Cafe;

