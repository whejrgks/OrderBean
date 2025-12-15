/**
 * 데이터베이스 설정
 * 데이터베이스 연결 및 설정
 */

// TODO: 실제 데이터베이스 설정 구현 (예: Sequelize, Mongoose)

const databaseConfig = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'beantaste',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    dialect: 'postgres', // 또는 'mysql', 'sqlite' 등
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
  },
};

module.exports = databaseConfig;

