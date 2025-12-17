import React, { useState } from 'react'
import { Menu } from '../services/menuService'

interface MenuCardProps {
  menu: Menu
  addToCart?: (menu: Menu, quantity?: number, customizations?: Record<string, any>) => void
}

interface MenuOption {
  name: string
  price: number
  checked: boolean
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, addToCart }) => {
  // 옵션 초기화 (메뉴의 options 필드에서 가져오거나 기본값 사용)
  const getOptionsFromMenu = (): MenuOption[] => {
    if (menu.options) {
      // options가 객체이고 items 배열을 가지고 있는 경우
      if (menu.options.items && Array.isArray(menu.options.items)) {
        return menu.options.items.map((opt: any) => ({
          name: opt.name || '',
          price: opt.price || 0,
          checked: false,
        }))
      }
      // options가 직접 배열인 경우
      if (Array.isArray(menu.options)) {
        return menu.options.map((opt: any) => ({
          name: opt.name || '',
          price: opt.price || 0,
          checked: false,
        }))
      }
    }
    // 기본 옵션
    return [
      { name: '샷 추가', price: 500, checked: false },
      { name: '시럽 추가', price: 0, checked: false },
    ]
  }
  
  const defaultOptions: MenuOption[] = getOptionsFromMenu()

  const [options, setOptions] = useState<MenuOption[]>(defaultOptions)

  const handleOptionChange = (index: number) => {
    const newOptions = [...options]
    newOptions[index].checked = !newOptions[index].checked
    setOptions(newOptions)
  }

  const handleAddToCart = () => {
    if (!addToCart) return

    // 선택된 옵션을 customizations로 변환
    const selectedOptions = options
      .filter(opt => opt.checked)
      .map(opt => ({ name: opt.name, price: opt.price }))

    const customizations = selectedOptions.length > 0 
      ? { options: selectedOptions }
      : undefined

    addToCart(menu, 1, customizations)
  }

  // 옵션 포함 총 가격 계산
  const totalPrice = menu.price + options
    .filter(opt => opt.checked)
    .reduce((sum, opt) => sum + opt.price, 0)

  return (
    <div className="menu-card">
      <div className="menu-image">
        {menu.imageUrl ? (
          <img src={menu.imageUrl} alt={menu.name} />
        ) : (
          <div className="image-placeholder">이미지</div>
        )}
      </div>
      <div className="menu-info">
        <h3 className="menu-name">{menu.name}</h3>
        <p className="menu-price">{menu.price.toLocaleString()}원</p>
        {menu.description && (
          <p className="menu-description">{menu.description}</p>
        )}
        <div className="menu-options">
          {options.map((option, index) => (
            <label key={index} className="option-checkbox">
              <input
                type="checkbox"
                checked={option.checked}
                onChange={() => handleOptionChange(index)}
              />
              <span>
                {option.name} {option.price > 0 && `(+${option.price.toLocaleString()}원)`}
              </span>
            </label>
          ))}
        </div>
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!menu.isAvailable}
        >
          담기
        </button>
      </div>
    </div>
  )
}

export default MenuCard

