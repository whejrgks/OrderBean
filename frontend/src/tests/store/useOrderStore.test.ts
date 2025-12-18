import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useOrderStore } from '../../store/useOrderStore'
import * as orderService from '../../services/orderService'

vi.mock('../../services/orderService')

describe('useOrderStore', () => {
  beforeEach(() => {
    useOrderStore.setState({ cart: [], orders: [], loading: false, error: null })
  })

  it('should initialize with empty cart', () => {
    const state = useOrderStore.getState()
    expect(state.cart).toEqual([])
    expect(state.orders).toEqual([])
  })

  it('should add item to cart', () => {
    const mockMenu = {
      id: 'menu-1',
      name: '아메리카노',
      price: 4000,
      category: '커피',
      isAvailable: true,
      createdAt: '',
      updatedAt: '',
    }
    
    useOrderStore.getState().addToCart(mockMenu)
    
    const state = useOrderStore.getState()
    expect(state.cart).toHaveLength(1)
    expect(state.cart[0].menu).toEqual(mockMenu)
    expect(state.cart[0].quantity).toBe(1)
  })

  it('should update item quantity in cart', () => {
    const mockMenu = {
      id: 'menu-1',
      name: '아메리카노',
      price: 4000,
      category: '커피',
      isAvailable: true,
      createdAt: '',
      updatedAt: '',
    }
    
    useOrderStore.getState().addToCart(mockMenu)
    useOrderStore.getState().updateQuantity('menu-1', 3)
    
    const state = useOrderStore.getState()
    expect(state.cart[0].quantity).toBe(3)
  })

  it('should remove item from cart', () => {
    const mockMenu = {
      id: 'menu-1',
      name: '아메리카노',
      price: 4000,
      category: '커피',
      isAvailable: true,
      createdAt: '',
      updatedAt: '',
    }
    
    useOrderStore.getState().addToCart(mockMenu)
    useOrderStore.getState().removeFromCart('menu-1')
    
    const state = useOrderStore.getState()
    expect(state.cart).toHaveLength(0)
  })

  it('should clear cart', () => {
    const mockMenu = {
      id: 'menu-1',
      name: '아메리카노',
      price: 4000,
      category: '커피',
      isAvailable: true,
      createdAt: '',
      updatedAt: '',
    }
    
    useOrderStore.getState().addToCart(mockMenu)
    useOrderStore.getState().clearCart()
    
    const state = useOrderStore.getState()
    expect(state.cart).toEqual([])
  })

  it('should create order', async () => {
    const mockMenu = {
      id: 'menu-1',
      name: '아메리카노',
      price: 4000,
      category: '커피',
      isAvailable: true,
      createdAt: '',
      updatedAt: '',
    }
    
    const mockOrder = {
      id: 'order-1',
      customerId: 'customer-1',
      status: 'PENDING',
      totalPrice: 4000,
      items: [],
      createdAt: '',
      updatedAt: '',
    }
    
    useOrderStore.getState().addToCart(mockMenu)
    vi.mocked(orderService.createOrder).mockResolvedValue(mockOrder)
    
    await useOrderStore.getState().createOrder('customer-1')
    
    const state = useOrderStore.getState()
    expect(state.orders).toHaveLength(1)
    expect(state.cart).toEqual([])
  })

  it('should fetch orders', async () => {
    const mockOrders = [
      {
        id: 'order-1',
        customerId: 'customer-1',
        status: 'PENDING',
        totalPrice: 4000,
        items: [],
        createdAt: '',
        updatedAt: '',
      }
    ]
    
    vi.mocked(orderService.getOrders).mockResolvedValue(mockOrders)
    
    await useOrderStore.getState().fetchOrders()
    
    const state = useOrderStore.getState()
    expect(state.orders).toEqual(mockOrders)
    expect(state.loading).toBe(false)
  })
})
