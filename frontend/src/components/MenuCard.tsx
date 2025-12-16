import { Menu } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import './MenuCard.css'

interface MenuCardProps {
  menu: Menu
}

function MenuCard({ menu }: MenuCardProps) {
  const addToCart = useOrderStore(state => state.addToCart)

  const handleAddToCart = () => {
    if (menu.isAvailable) {
      addToCart(menu.id, 1)
    }
  }

  return (
    <div className={`menu-card ${!menu.isAvailable ? 'unavailable' : ''}`}>
      {menu.imageUrl && (
        <div className="menu-image">
          <img src={menu.imageUrl} alt={menu.name} />
        </div>
      )}
      <div className="menu-info">
        <h3 className="menu-name">{menu.name}</h3>
        {menu.description && (
          <p className="menu-description">{menu.description}</p>
        )}
        <div className="menu-footer">
          <span className="menu-price">{menu.price.toLocaleString()}원</span>
          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={!menu.isAvailable}
          >
            {menu.isAvailable ? '담기' : '품절'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuCard

