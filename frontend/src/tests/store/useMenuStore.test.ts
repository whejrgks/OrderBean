import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMenuStore } from '../../store/useMenuStore'
import * as menuService from '../../services/menuService'

vi.mock('../../services/menuService')

describe('useMenuStore', () => {
  beforeEach(() => {
    useMenuStore.setState({ menus: [], loading: false, error: null })
  })

  it('should initialize with empty menus array', () => {
    const state = useMenuStore.getState()
    expect(state.menus).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should fetch menus from API', async () => {
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
    vi.mocked(menuService.getMenus).mockResolvedValue(mockMenus)
    
    await useMenuStore.getState().fetchMenus()
    
    const state = useMenuStore.getState()
    expect(state.menus).toEqual(mockMenus)
    expect(state.loading).toBe(false)
  })

  it('should get menu by id', () => {
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
    useMenuStore.setState({ menus: mockMenus })
    
    const menu = useMenuStore.getState().getMenuById('1')
    expect(menu).toEqual(mockMenus[0])
  })

  it('should handle loading state', async () => {
    const mockMenus: any[] = []
    vi.mocked(menuService.getMenus).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockMenus), 100))
    )
    
    const fetchPromise = useMenuStore.getState().fetchMenus()
    expect(useMenuStore.getState().loading).toBe(true)
    
    await fetchPromise
    expect(useMenuStore.getState().loading).toBe(false)
  })

  it('should handle error state', async () => {
    vi.mocked(menuService.getMenus).mockRejectedValue(new Error('API Error'))
    
    await useMenuStore.getState().fetchMenus()
    
    const state = useMenuStore.getState()
    expect(state.error).toBe('Failed to fetch menus')
    expect(state.loading).toBe(false)
  })
})
