/**
 * 사용자 모델
 * 사용자 데이터 스키마 정의
 */

// TODO: 실제 데이터베이스 ORM (예: Sequelize, Mongoose) 모델로 구현

const User = {
  schema: {
    id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
    email: { type: 'STRING', unique: true, allowNull: false },
    password: { type: 'STRING', allowNull: false }, // 암호화된 비밀번호
    name: { type: 'STRING', allowNull: false },
    role: { type: 'ENUM', values: ['user', 'admin'], defaultValue: 'user' },
    createdAt: { type: 'DATE', defaultValue: 'NOW' },
    updatedAt: { type: 'DATE', defaultValue: 'NOW' },
  },

  associations: {
    hasOne: ['TasteProfile'],
    hasMany: ['Review'],
  },
};

module.exports = User;

