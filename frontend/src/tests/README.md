# 🧪 Frontend 테스트 문서

## RED 테스트 케이스

이 폴더에는 **RED 단계**의 테스트 케이스가 포함되어 있습니다. RED는 TDD(Test-Driven Development)의 첫 번째 단계로, **실패하는 테스트를 먼저 작성**하는 것을 의미합니다.

## 테스트 구조

```
src/tests/
├── setup.ts                    # 테스트 환경 설정
├── components/
│   ├── MenuCard.test.tsx       # 메뉴 카드 컴포넌트 테스트
│   └── Cart.test.tsx           # 장바구니 컴포넌트 테스트
├── pages/
│   └── OrderPage.test.tsx     # 주문 페이지 테스트
└── store/
    ├── useMenuStore.test.ts    # 메뉴 스토어 테스트
    └── useOrderStore.test.ts   # 주문 스토어 테스트
```

## 실행 방법

```bash
# 모든 테스트 실행
npm test

# Watch 모드
npm test -- --watch

# UI 모드
npm run test:ui

# Coverage 확인
npm run test:coverage
```

## RED-Green-Refactor 사이클

1. **RED**: 실패하는 테스트 작성 (현재 단계)
2. **Green**: 테스트를 통과시키는 최소한의 코드 작성
3. **Refactor**: 코드 개선 및 리팩토링

## 현재 상태

모든 테스트는 **의도적으로 실패**하도록 작성되었습니다. 이는 다음 단계(Green)에서 구현할 기능을 명확히 정의하기 위함입니다.

## 사용 기술

- **Vitest**: 테스트 러너
- **React Testing Library**: 컴포넌트 테스트
- **jsdom**: DOM 환경 시뮬레이션

