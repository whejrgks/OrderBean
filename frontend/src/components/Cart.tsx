import React from 'react'
import { useOrderStore } from '../store/useOrderStore'

const Cart: React.FC = () => {
  const { cart, createOrder, loading, removeFromCart, updateQuantity } = useOrderStore()
  
  const calculateItemPrice = (item: any) => {
    const basePrice = item.menu.price
    const optionPrice = item.customizations?.options?.reduce(
      (sum: number, opt: any) => sum + (opt.price || 0), 
      0
    ) || 0
    return (basePrice + optionPrice) * item.quantity
  }

  const totalPrice = cart.reduce((sum, item) => {
    return sum + calculateItemPrice(item)
  }, 0)

  const formatItemName = (item: any) => {
    let name = item.menu.name
    if (item.customizations?.options?.length > 0) {
      const optionNames = item.customizations.options.map((opt: any) => opt.name).join(', ')
      name += ` (${optionNames})`
    }
    return name
  }
  
  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2 className="cart-title">장바구니</h2>
        <div className="cart-empty">장바구니가 비어있습니다.</div>
      </div>
    )
  }
  
  return (
    <div className="cart">
      <h2 className="cart-title">장바구니</h2>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={`${item.menu.id}-${index}`} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-name">
                {formatItemName(item)} X {item.quantity}
              </span>
              <span className="cart-item-price">
                {calculateItemPrice(item).toLocaleString()}원
              </span>
            </div>
            <div className="cart-item-actions">
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(item.menu.id, Math.max(1, item.quantity - 1))}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(item.menu.id, item.quantity + 1)}
              >
                +
              </button>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.menu.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <strong>총 금액 {totalPrice.toLocaleString()}원</strong>
        </div>
        <button 
          className="order-btn"
          onClick={() => createOrder()} 
          disabled={loading}
        >
          {loading ? '주문 중...' : '주문하기'}
        </button>
      </div>
    </div>
  )
}

export default Cart

