import React, { useMemo, useCallback } from 'react'
import { useOrderStore } from '../store/useOrderStore'
import { calculateItemPrice } from '../utils/priceCalculator'
import { extractSelectedOptionNames } from '../utils/optionParser'
import { CartItem } from '../store/useOrderStore'

const Cart: React.FC = React.memo(() => {
  const { cart, createOrder, loading, removeFromCart, updateQuantity } = useOrderStore()
  
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + calculateItemPrice(
        item.menu.price,
        item.quantity,
        item.customizations
      )
    }, 0)
  }, [cart])

  const formatItemName = useCallback((item: CartItem): string => {
    let name = item.menu.name
    const optionNames = extractSelectedOptionNames(item.customizations)
    if (optionNames.length > 0) {
      name += ` (${optionNames.join(', ')})`
    }
    return name
  }, [])
  
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
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-name">
                {formatItemName(item)} X {item.quantity}
              </span>
              <span className="cart-item-price">
                {calculateItemPrice(
                  item.menu.price,
                  item.quantity,
                  item.customizations
                ).toLocaleString()}원
              </span>
            </div>
            <div className="cart-item-actions">
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
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

})

Cart.displayName = 'Cart'

export default Cart

