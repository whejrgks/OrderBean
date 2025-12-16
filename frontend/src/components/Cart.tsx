import { useOrderStore } from '../store/useOrderStore'
import { useMenuStore } from '../store/useMenuStore'
import './Cart.css'

function Cart() {
  const cart = useOrderStore(state => state.cart)
  const removeFromCart = useOrderStore(state => state.removeFromCart)
  const updateCartItem = useOrderStore(state => state.updateCartItem)
  const clearCart = useOrderStore(state => state.clearCart)
  const createOrder = useOrderStore(state => state.createOrder)
  const loading = useOrderStore(state => state.loading)
  const getMenuById = useMenuStore(state => state.getMenuById)

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const menu = getMenuById(item.menuId)
      return total + (menu ? menu.price * item.quantity : 0)
    }, 0)
  }

  const handleCheckout = async () => {
    try {
      await createOrder()
      alert('주문이 완료되었습니다!')
    } catch (error: any) {
      alert(`주문 실패: ${error.message}`)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="cart empty">
        <p>장바구니가 비어있습니다</p>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>장바구니</h3>
        <button className="btn-clear" onClick={clearCart}>
          비우기
        </button>
      </div>
      <div className="cart-items">
        {cart.map((item) => {
          const menu = getMenuById(item.menuId)
          if (!menu) return null

          return (
            <div key={`${item.menuId}-${JSON.stringify(item.customizations)}`} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">{menu.name}</span>
                <span className="cart-item-price">
                  {(menu.price * item.quantity).toLocaleString()}원
                </span>
              </div>
              <div className="cart-item-controls">
                <button
                  className="btn-quantity"
                  onClick={() => updateCartItem(item.menuId, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="btn-quantity"
                  onClick={() => updateCartItem(item.menuId, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.menuId)}
                >
                  삭제
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>총 금액</span>
          <span className="total-price">{getTotalPrice().toLocaleString()}원</span>
        </div>
        <button
          className="btn-checkout"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? '주문 중...' : '주문하기'}
        </button>
      </div>
    </div>
  )
}

export default Cart

