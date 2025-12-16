export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface OrderItemDto {
  menuId: string
  quantity: number
  customizations?: Record<string, any>
}

export interface CreateOrderDto {
  customerId?: string
  items: OrderItemDto[]
}

export interface UpdateOrderStatusDto {
  status: OrderStatus
}

