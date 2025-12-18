// 주문 서비스 - 최소 구현
// 나중에 Prisma를 사용한 실제 DB 연동으로 확장

export const getAllOrders = async (filters?: any) => {
  // 최소 구현: 빈 배열 반환
  return []
}

export const getOrderById = async (id: string) => {
  // 최소 구현에서는 null 반환
  return null
}

export const createOrder = async (data: {
  customerId?: string
  items: Array<{
    menuId: string
    quantity: number
    customizations?: any  // 이미지의 옵션 (샷 추가, 시럽 추가 등)
  }>
}) => {
  // 최소 구현: 주문 데이터를 그대로 반환 (임시 ID 및 계산된 총액 추가)
  const totalPrice = 0 // 나중에 실제 계산 로직 추가
  
  return {
    id: 'temp-order-id',
    customerId: data.customerId || 'anonymous',
    status: 'PENDING',
    totalPrice,
    items: data.items.map((item, index) => ({
      id: `temp-item-id-${index}`,
      menuId: item.menuId,
      quantity: item.quantity,
      price: 0, // 나중에 실제 가격 계산
      customizations: item.customizations || null,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const updateOrderStatus = async (id: string, status: string) => {
  // 최소 구현: 업데이트된 주문 반환
  return {
    id,
    status,
    updatedAt: new Date(),
  }
}

