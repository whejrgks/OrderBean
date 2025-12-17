import React, { useEffect } from 'react'
import { useMenuStore } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import Header from '../components/Header'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'

const OrderPage: React.FC = () => {
  const { menus, loading, error, fetchMenus } = useMenuStore()
  const { addToCart } = useOrderStore()
  
  useEffect(() => {
    fetchMenus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
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
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
              백엔드 서버가 실행 중인지 확인하세요. (http://localhost:5000)
            </p>
            <button 
              onClick={() => fetchMenus()} 
              style={{ 
                marginTop: '1rem', 
                padding: '0.5rem 1rem', 
                background: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
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
            menus.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                addToCart={addToCart}
              />
            ))
          )}
        </div>
        <Cart />
      </div>
    </div>
  )
}

export default OrderPage

