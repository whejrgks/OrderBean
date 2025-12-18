// 관리자 서비스 - 최소 구현
// 나중에 Prisma를 사용한 실제 DB 연동으로 확장

export const getDashboardStats = async () => {
  // 최소 구현: 기본 통계 객체 반환
  // 이미지의 대시보드 통계 구조 반영
  return {
    totalOrders: 0,
    pendingOrders: 0,      // 주문 접수
    preparingOrders: 0,    // 제조 중
    readyOrders: 0,        // 제조 완료
    completedOrders: 0,    // 픽업 완료
    cancelledOrders: 0,    // 취소됨
  }
}

export const getRecentOrders = async (limit?: number) => {
  // 최소 구현: 빈 배열 반환
  // limit 파라미터는 나중에 사용
  return []
}

