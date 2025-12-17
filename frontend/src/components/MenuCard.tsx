import React from 'react'
import { Menu } from '../services/menuService'

interface MenuCardProps {
  menu: Menu
  addToCart?: (menu: Menu) => void
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, addToCart }) => {
  return (
    <div className="menu-card">
      <h3>{menu.name}</h3>
      {menu.description && <p>{menu.description}</p>}
      <p>{menu.price.toLocaleString()}원</p>
      <button
        onClick={() => addToCart?.(menu)}
        disabled={!menu.isAvailable}
      >
        담기
      </button>
    </div>
  )
}

export default MenuCard

