import { create } from 'zustand'
import { createOrder, getOrders, Order } from '../services/orderService'
import { Menu } from '../services/menuService'

interface CartItem {
  id: string // 고유 ID (메뉴 ID + 옵션 조합)
  menu: Menu
  quantity: number
  customizations?: Record<string, any>
}

interface OrderStore {
  cart: CartItem[]
  orders: Order[]
  loading: boolean
  error: string | null
  addToCart: (menu: Menu, quantity?: number, customizations?: Record<string, any>) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  createOrder: (customerId?: string) => Promise<void>
  fetchOrders: (filters?: { customerId?: string; status?: string }) => Promise<void>
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  cart: [],
  orders: [],
  loading: false,
  error: null,
  
  addToCart: (menu, quantity = 1, customizations) => {
    const cart = get().cart
    
    // 옵션을 포함한 고유 ID 생성
    const optionsKey = customizations?.options 
      ? JSON.stringify(customizations.options.map((opt: any) => opt.name).sort())
      : ''
    const itemId = `${menu.id}-${optionsKey}`
    
    // 같은 메뉴 + 같은 옵션 조합이 있는지 확인
    const existingItem = cart.find(item => item.id === itemId)
    
    if (existingItem) {
      existingItem.quantity += quantity
      set({ cart: [...cart] })
    } else {
      set({ cart: [...cart, { id: itemId, menu, quantity, customizations }] })
    }
  },
  
  removeFromCart: (itemId) => {
    set({ cart: get().cart.filter(item => item.id !== itemId) })
  },
  
  updateQuantity: (itemId, quantity) => {
    const cart = get().cart
    const item = cart.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
      set({ cart: [...cart] })
    }
  },
  
  clearCart: () => {
    set({ cart: [] })
  },
  
  createOrder: async (customerId) => {
    set({ loading: true, error: null })
    try {
      const cart = get().cart
      const items = cart.map(item => ({
        menuId: item.menu.id,
        menuName: item.menu.name, // 메뉴 이름도 함께 전달
        menuPrice: item.menu.price, // 메뉴 가격도 함께 전달
        quantity: item.quantity,
        customizations: item.customizations,
      }))
      
      const order = await createOrder({ customerId, items })
      set({ orders: [...get().orders, order], cart: [], loading: false })
    } catch (error) {
      set({ error: 'Failed to create order', loading: false })
    }
  },
  
  fetchOrders: async (filters) => {
    set({ loading: true, error: null })
    try {
      const orders = await getOrders(filters)
      set({ orders, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch orders', loading: false })
    }
  },
}))

