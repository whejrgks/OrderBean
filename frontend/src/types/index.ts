// 공통 타입 정의

export interface DashboardStats {
  total_orders: number
  pending_orders: number
  preparing_orders: number
  ready_orders: number
  completed_orders: number
  cancelled_orders: number
}

export interface MenuOption {
  name: string
  price: number
}

export interface MenuOptions {
  items?: MenuOption[]
}

export interface CustomizationOption {
  name: string
  price: number
}

export interface Customizations {
  options?: CustomizationOption[]
}

export interface OrderItem {
  id: string
  menu_id: string
  menuId?: string
  menu_name?: string
  menuName?: string
  quantity: number
  price: number
  customizations?: Customizations
  selected_options?: string[]
}

export interface Order {
  id: string
  customer_id: string
  customerId?: string
  status: string
  total_price: number
  totalPrice?: number
  items: OrderItem[]
  created_at: string
  updated_at: string
  createdAt?: string
  updatedAt?: string
}

