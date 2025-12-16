// 시드 데이터 예시
// 실제 사용 시 Prisma Client를 사용하여 데이터를 삽입합니다

export const sampleMenus = [
  {
    name: '아메리카노',
    description: '진한 에스프레소에 뜨거운 물을 부어 만든 깔끔한 커피',
    price: 4000,
    category: '커피',
    isAvailable: true,
    options: {
      shots: { min: 1, max: 4, default: 2 },
      size: { type: ['Small', 'Medium', 'Large'], default: 'Medium' },
      temperature: { type: ['Hot', 'Ice'], default: 'Hot' },
    },
  },
  {
    name: '카페라떼',
    description: '부드러운 우유와 에스프레소의 조화',
    price: 4500,
    category: '라떼',
    isAvailable: true,
    options: {
      shots: { min: 1, max: 4, default: 2 },
      milk: { type: ['일반우유', '저지방우유', '두유', '오트밀크'], default: '일반우유' },
      size: { type: ['Small', 'Medium', 'Large'], default: 'Medium' },
      temperature: { type: ['Hot', 'Ice'], default: 'Hot' },
    },
  },
  {
    name: '카푸치노',
    description: '에스프레소에 우유 거품을 올린 이탈리안 커피',
    price: 4500,
    category: '라떼',
    isAvailable: true,
    options: {
      shots: { min: 1, max: 4, default: 2 },
      milk: { type: ['일반우유', '저지방우유', '두유'], default: '일반우유' },
      size: { type: ['Small', 'Medium', 'Large'], default: 'Medium' },
    },
  },
  {
    name: '에스프레소',
    description: '진한 이탈리안 에스프레소',
    price: 3000,
    category: '에스프레소',
    isAvailable: true,
    options: {
      shots: { min: 1, max: 2, default: 1 },
    },
  },
  {
    name: '녹차라떼',
    description: '고소한 녹차와 부드러운 우유의 만남',
    price: 5000,
    category: '차',
    isAvailable: true,
    options: {
      size: { type: ['Small', 'Medium', 'Large'], default: 'Medium' },
      temperature: { type: ['Hot', 'Ice'], default: 'Hot' },
    },
  },
]

