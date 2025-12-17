import React from 'react'
import { useOrderStore } from '../store/useOrderStore'

const Cart: React.FC = () => {
  const { cart, createOrder } = useOrderStore()
  
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.menu.price * item.quantity)
  }, 0)
  
  if (cart.length === 0) {
    return <div>장바구니가 비어있습니다.</div>
  }
  
  return (
    <div className="cart">
      <h2>장바구니</h2>
      {cart.map((item) => (
        <div key={item.menu.id}>
          <span>{item.menu.name} x {item.quantity}</span>
          <span>{(item.menu.price * item.quantity).toLocaleString()}원</span>
        </div>
      ))}
      <div>
        <strong>총 금액: {totalPrice.toLocaleString()}원</strong>
      </div>
      <button onClick={() => createOrder()}>주문하기</button>
    </div>
  )
}

export default Cart

