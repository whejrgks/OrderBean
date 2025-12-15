# API 문서

## 개요

BeanTaste Map 백엔드 API 문서입니다.

## 인증

대부분의 API는 JWT 토큰 기반 인증을 사용합니다.

```
Authorization: Bearer <token>
```

## 엔드포인트

### 사용자 API
- `GET /api/users/:userId` - 사용자 정보 조회
- `PUT /api/users/:userId` - 사용자 정보 수정
- `GET /api/users/:userId/taste-profile` - 취향 프로필 조회
- `PUT /api/users/:userId/taste-profile` - 취향 프로필 생성/수정

### 카페 API
- `GET /api/cafes` - 카페 목록 조회 (지도 검색)
- `GET /api/cafes/:cafeId` - 카페 상세 정보 조회
- `GET /api/cafes/recommendations/:userId` - 취향 일치도 기반 추천 카페 목록

### 리뷰 API
- `GET /api/reviews/cafe/:cafeId` - 카페 리뷰 목록 조회
- `POST /api/reviews/cafe/:cafeId` - 리뷰 작성
- `PUT /api/reviews/:reviewId` - 리뷰 수정
- `DELETE /api/reviews/:reviewId` - 리뷰 삭제

### 관리자 API
- `GET /api/admin/dashboard` - 관리자 대시보드 통계
- `GET /api/admin/users` - 사용자 목록 조회
- `GET /api/admin/reviews` - 리뷰 관리
- `DELETE /api/admin/reviews/:reviewId` - 리뷰 삭제 (관리자)

