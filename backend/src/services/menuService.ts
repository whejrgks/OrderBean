// 메뉴 서비스 - 최소 구현
// 나중에 Prisma를 사용한 실제 DB 연동으로 확장

export const getAllMenus = async () => {
  // 최소 구현: 빈 배열 반환으로 테스트 통과
  return []
}

export const getMenuById = async (id: string) => {
  // 최소 구현에서는 null 반환
  return null
}

export const createMenu = async (data: any) => {
  // 최소 구현: 요청 데이터를 그대로 반환 (임시 ID 추가)
  return {
    id: 'temp-id',
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const updateMenu = async (id: string, data: any) => {
  // 최소 구현: 업데이트된 데이터 반환
  return {
    id,
    ...data,
    updatedAt: new Date(),
  }
}

export const deleteMenu = async (id: string) => {
  // 최소 구현: 성공 응답만
  return { success: true }
}

export const toggleAvailability = async (id: string) => {
  // 최소 구현: 토글된 상태 반환
  return {
    id,
    isAvailable: true,
  }
}

