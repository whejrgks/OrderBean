import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Cart from '../../components/Cart'
import { useOrderStore } from '../../store/useOrderStore'

// Mock the store
vi.mock('../../store/useOrderStore')

describe('Cart Component', () => {
  const mockCreateOrder = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render empty cart message when cart is empty', () => {
    vi.mocked(useOrderStore).mockReturnValue({
      cart: [],
      createOrder: mockCreateOrder,
      loading: false,
    } as any)
    
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )
    expect(screen.getByText('장바구니가 비어있습니다.')).toBeInTheDocument()
  })

  it('should display cart items when cart has items', () => {
    const mockCart = [{
      menu: {
        id: 'menu-1',
        name: '아메리카노',
        price: 4000,
        category: '커피',
        isAvailable: true,
        createdAt: '',
        updatedAt: '',
      },
      quantity: 2,
    }]
    
    vi.mocked(useOrderStore).mockReturnValue({
      cart: mockCart,
      createOrder: mockCreateOrder,
      loading: false,
    } as any)
    
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )
    expect(screen.getByText(/아메리카노/)).toBeInTheDocument()
    expect(screen.getByText(/8,000원/)).toBeInTheDocument()
  })

  it('should calculate total price correctly', () => {
    const mockCart = [
      { 
        menu: { 
          id: 'menu-1', 
          name: '아메리카노', 
          price: 4000,
          category: '커피',
          isAvailable: true,
          createdAt: '',
          updatedAt: '',
        }, 
        quantity: 2 
      },
      { 
        menu: { 
          id: 'menu-2', 
          name: '카페라떼', 
          price: 5000,
          category: '커피',
          isAvailable: true,
          createdAt: '',
          updatedAt: '',
        }, 
        quantity: 1 
      },
    ]
    
    vi.mocked(useOrderStore).mockReturnValue({
      cart: mockCart,
      createOrder: mockCreateOrder,
      loading: false,
    } as any)
    
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )
    expect(screen.getByText(/13,000원/)).toBeInTheDocument()
  })

  it('should call createOrder when checkout button is clicked', async () => {
    const mockCart = [{
      menu: {
        id: 'menu-1',
        name: '아메리카노',
        price: 4000,
        category: '커피',
        isAvailable: true,
        createdAt: '',
        updatedAt: '',
      },
      quantity: 1,
    }]
    
    vi.mocked(useOrderStore).mockReturnValue({
      cart: mockCart,
      createOrder: mockCreateOrder,
      loading: false,
    } as any)
    
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    )
    
    const button = screen.getByText('주문하기')
    await user.click(button)
    
    expect(mockCreateOrder).toHaveBeenCalled()
  })
})
