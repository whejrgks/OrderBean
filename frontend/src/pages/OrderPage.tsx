import React, { useEffect } from 'react'
import { useMenuStore } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'

const OrderPage: React.FC = () => {
  const { menus, loading, fetchMenus } = useMenuStore()
  const { addToCart } = useOrderStore()
  
  useEffect(() => {
    fetchMenus()
  }, [fetchMenus])
  
  if (loading) {
    return <div>로딩 중...</div>
  }
  
  return (
    <div className="order-page">
      <h1>주문하기</h1>
      <div className="menu-list">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            addToCart={addToCart}
          />
        ))}
      </div>
      <Cart />
    </div>
  )
}

export default OrderPage

