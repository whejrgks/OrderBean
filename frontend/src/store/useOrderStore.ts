import { create } from 'zustand'
import { createOrder, getOrders, Order } from '../services/orderService'
import { Menu } from '../services/menuService'

interface CartItem {
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
  removeFromCart: (menuId: string) => void
  updateQuantity: (menuId: string, quantity: number) => void
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
    const existingItem = cart.find(item => item.menu.id === menu.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      set({ cart: [...cart] })
    } else {
      set({ cart: [...cart, { menu, quantity, customizations }] })
    }
  },
  
  removeFromCart: (menuId) => {
    set({ cart: get().cart.filter(item => item.menu.id !== menuId) })
  },
  
  updateQuantity: (menuId, quantity) => {
    const cart = get().cart
    const item = cart.find(item => item.menu.id === menuId)
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

