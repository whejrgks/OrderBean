import React from 'react'
import { Menu } from '../../services/menuService'
import { INVENTORY_CONFIG } from '../../constants/config'

interface InventorySectionProps {
  menus: Menu[]
  inventory: Record<string, number>
  onUpdateInventory: (menuId: string, delta: number) => void
}

const InventorySection: React.FC<InventorySectionProps> = ({
  menus,
  inventory,
  onUpdateInventory,
}) => {
  return (
    <div className="inventory-section">
      <h2 className="section-title">재고 현황</h2>
      <div className="inventory-grid">
        {menus.map((menu) => (
          <div key={menu.id} className="inventory-card">
            <div className="inventory-menu-name">{menu.name}</div>
            <div className="inventory-stock">
              {inventory[menu.id] || INVENTORY_CONFIG.DEFAULT_STOCK}개
            </div>
            <div className="inventory-controls">
              <button
                className="inventory-btn"
                onClick={() => onUpdateInventory(menu.id, -1)}
                aria-label={`${menu.name} 재고 감소`}
              >
                -
              </button>
              <button
                className="inventory-btn"
                onClick={() => onUpdateInventory(menu.id, 1)}
                aria-label={`${menu.name} 재고 증가`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InventorySection

