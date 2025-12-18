import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import OrderPage from '../../pages/OrderPage'
import { useMenuStore } from '../../store/useMenuStore'
import { useOrderStore } from '../../store/useOrderStore'

vi.mock('../../store/useMenuStore')
vi.mock('../../store/useOrderStore')

describe('OrderPage', () => {
  const mockFetchMenus = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useMenuStore).mockReturnValue({
      menus: [],
      loading: false,
      error: null,
      fetchMenus: mockFetchMenus,
      getMenuById: vi.fn(),
    } as any)
    
    vi.mocked(useOrderStore).mockReturnValue({
      addToCart: vi.fn(),
    } as any)
  })

  it('should render page title', () => {
    render(
      <BrowserRouter>
        <OrderPage />
      </BrowserRouter>
    )
    expect(screen.getByText('주문하기')).toBeInTheDocument()
  })

  it('should display menu list', () => {
    const mockMenus = [
      { 
        id: '1', 
        name: '아메리카노', 
        price: 4000, 
        category: '커피', 
        isAvailable: true, 
        createdAt: '', 
        updatedAt: '' 
      }
    ]
    vi.mocked(useMenuStore).mockReturnValue({
      menus: mockMenus,
      loading: false,
      error: null,
      fetchMenus: mockFetchMenus,
      getMenuById: vi.fn(),
    } as any)
    
    render(
      <BrowserRouter>
        <OrderPage />
      </BrowserRouter>
    )
    expect(screen.getByText('아메리카노')).toBeInTheDocument()
  })

  it('should show loading state while fetching menus', () => {
    vi.mocked(useMenuStore).mockReturnValue({
      menus: [],
      loading: true,
      error: null,
      fetchMenus: mockFetchMenus,
      getMenuById: vi.fn(),
    } as any)
    
    render(
      <BrowserRouter>
        <OrderPage />
      </BrowserRouter>
    )
    expect(screen.getByText('로딩 중...')).toBeInTheDocument()
  })

  it('should display cart component', () => {
    render(
      <BrowserRouter>
        <OrderPage />
      </BrowserRouter>
    )
    // Cart 컴포넌트가 렌더링되는지 확인 (빈 장바구니 메시지)
    expect(screen.getByText('장바구니가 비어있습니다.')).toBeInTheDocument()
  })
})
