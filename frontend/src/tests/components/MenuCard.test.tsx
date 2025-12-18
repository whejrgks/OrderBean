import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuCard from '../../components/MenuCard'

describe('MenuCard Component', () => {
  const mockMenu = {
    id: 'menu-1',
    name: '아메리카노',
    description: '진한 커피',
    price: 4000,
    category: '커피',
    isAvailable: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  }

  it('should render menu name', () => {
    render(<MenuCard menu={mockMenu} />)
    expect(screen.getByText('아메리카노')).toBeInTheDocument()
  })

  it('should render menu price', () => {
    render(<MenuCard menu={mockMenu} />)
    expect(screen.getByText('4,000원')).toBeInTheDocument()
  })

  it('should render description when available', () => {
    render(<MenuCard menu={mockMenu} />)
    expect(screen.getByText('진한 커피')).toBeInTheDocument()
  })

  it('should disable button when menu is unavailable', () => {
    const unavailableMenu = { ...mockMenu, isAvailable: false }
    render(<MenuCard menu={unavailableMenu} />)
    const button = screen.getByText('담기')
    expect(button).toBeDisabled()
  })

  it('should call addToCart when button is clicked', async () => {
    const addToCart = vi.fn()
    const user = userEvent.setup()
    render(<MenuCard menu={mockMenu} addToCart={addToCart} />)
    
    const button = screen.getByText('담기')
    await user.click(button)
    
    expect(addToCart).toHaveBeenCalledWith(mockMenu)
  })
})
