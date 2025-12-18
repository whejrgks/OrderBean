import React, { useEffect, useMemo } from 'react'
import { useMenuStore } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import Header from '../components/Header'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'
import { API_CONFIG } from '../constants/config'

const OrderPage: React.FC = () => {
  const { menus, loading, error, fetchMenus } = useMenuStore()
  const { addToCart } = useOrderStore()
  
  useEffect(() => {
    fetchMenus()
  }, [fetchMenus])
  
  const menuCards = useMemo(() => {
    return menus.map((menu) => (
      <MenuCard
        key={menu.id}
        menu={menu}
        addToCart={addToCart}
      />
    ))
  }, [menus, addToCart])
  
  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="order-page">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="app">
        <Header />
        <div className="order-page">
          <div className="error">
            <p>{error}</p>
            <p className="error-detail">
              백엔드 서버가 실행 중인지 확인하세요. ({API_CONFIG.BACKEND_URL})
            </p>
            <button 
              className="retry-button"
              onClick={() => fetchMenus()}
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="app">
      <Header />
      <div className="order-page">
        <div className="menu-list">
          {menus.length === 0 ? (
            <div className="no-menus">메뉴가 없습니다.</div>
          ) : (
            menuCards
          )}
        </div>
        <Cart />
      </div>
    </div>
  )
}

export default OrderPage

