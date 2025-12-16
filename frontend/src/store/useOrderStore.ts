import { create } from 'zustand'
import api from '../services/api'

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED'

export interface OrderItem {
  id: string
  menuId: string
  quantity: number
  customizations?: Record<string, any>
  price: number
  menu: {
    id: string
    name: string
    price: number
  }
}

export interface Order {
  id: string
  customerId?: string
  status: OrderStatus
  totalPrice: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

interface CartItem {
  menuId: string
  quantity: number
  customizations?: Record<string, any>
}

interface OrderStore {
  orders: Order[]
  currentOrder: Order | null
  cart: CartItem[]
  loading: boolean
  error: string | null
  fetchOrders: (customerId?: string) => Promise<void>
  fetchOrderById: (id: string) => Promise<void>
  addToCart: (menuId: string, quantity?: number, customizations?: Record<string, any>) => void
  removeFromCart: (menuId: string) => void
  updateCartItem: (menuId: string, quantity: number) => void
  clearCart: () => void
  createOrder: (customerId?: string) => Promise<Order>
  pollOrderStatus: (orderId: string) => void
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: null,
  cart: [],
  loading: false,
  error: null,

  fetchOrders: async (customerId?: string) => {
    set({ loading: true, error: null })
    try {
      const params = customerId ? { customerId } : {}
      const response = await api.get('/orders', { params })
      set({ orders: response.data.orders, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  fetchOrderById: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const response = await api.get(`/orders/${id}`)
      set({ currentOrder: response.data.order, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  addToCart: (menuId: string, quantity = 1, customizations?: Record<string, any>) => {
    const cart = [...get().cart]
    const existingItem = cart.find(item => 
      item.menuId === menuId && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ menuId, quantity, customizations })
    }

    set({ cart })
  },

  removeFromCart: (menuId: string) => {
    const cart = get().cart.filter(item => item.menuId !== menuId)
    set({ cart })
  },

  updateCartItem: (menuId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(menuId)
      return
    }

    const cart = get().cart.map(item =>
      item.menuId === menuId ? { ...item, quantity } : item
    )
    set({ cart })
  },

  clearCart: () => {
    set({ cart: [] })
  },

  createOrder: async (customerId?: string) => {
    set({ loading: true, error: null })
    try {
      const cart = get().cart
      if (cart.length === 0) {
        throw new Error('Cart is empty')
      }

      const response = await api.post('/orders', {
        customerId,
        items: cart,
      })

      const order = response.data.order
      set({ 
        currentOrder: order,
        orders: [order, ...get().orders],
        cart: [],
        loading: false 
      })

      // 주문 상태 폴링 시작
      get().pollOrderStatus(order.id)

      return order
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  pollOrderStatus: (orderId: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await api.get(`/orders/${orderId}`)
        const order = response.data.order

        // 현재 주문 업데이트
        if (get().currentOrder?.id === orderId) {
          set({ currentOrder: order })
        }

        // 주문 목록 업데이트
        const orders = get().orders.map(o => 
          o.id === orderId ? order : o
        )
        set({ orders })

        // 완료되면 폴링 중지
        if (order.status === 'COMPLETED' || order.status === 'CANCELLED') {
          clearInterval(interval)
        }
      } catch (error) {
        console.error('Failed to poll order status:', error)
      }
    }, 3000) // 3초마다 폴링

    // 5분 후 자동 중지
    setTimeout(() => clearInterval(interval), 5 * 60 * 1000)
  },
}))

