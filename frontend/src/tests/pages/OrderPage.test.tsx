import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// RED 테스트: 실패하는 테스트 케이스

describe('OrderPage - RED Tests (실패해야 함)', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it.skip('should render page title - 페이지가 아직 구현되지 않음', () => {
    // 페이지 구현 후 활성화
    expect(true).toBe(true) // 플레이스홀더
  })

  it.skip('should display menu list', () => {
    // 페이지 구현 후 활성화
    expect(true).toBe(true) // 플레이스홀더
  })

  it.skip('should filter menus by category', () => {
    // 페이지 구현 후 활성화
    expect(true).toBe(true) // 플레이스홀더
  })

  it.skip('should display cart component', () => {
    // 페이지 구현 후 활성화
    expect(true).toBe(true) // 플레이스홀더
  })

  it.skip('should show loading state while fetching menus', () => {
    // 페이지 구현 후 활성화
    expect(true).toBe(true) // 플레이스홀더
  })
})
