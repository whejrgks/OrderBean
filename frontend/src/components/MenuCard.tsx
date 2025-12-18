import React, { useState, useMemo } from 'react'
import { Menu } from '../services/menuService'
import { parseMenuOptions } from '../utils/optionParser'
import { calculateUnitPrice } from '../utils/priceCalculator'
import { Customizations } from '../types'

interface MenuCardProps {
  menu: Menu
  addToCart?: (menu: Menu, quantity?: number, customizations?: Customizations) => void
}

interface MenuOption {
  name: string
  price: number
  checked: boolean
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, addToCart }) => {
  // 옵션 초기화 (메뉴의 options 필드에서 가져오거나 기본값 사용)
  const defaultOptions: MenuOption[] = useMemo(() => {
    const parsedOptions = parseMenuOptions(menu.options)
    
    // 파싱된 옵션이 있으면 사용, 없으면 기본 옵션
    if (parsedOptions.length > 0) {
      return parsedOptions.map(opt => ({ ...opt, checked: false }))
    }
    
    // 기본 옵션
    return [
      { name: '샷 추가', price: 500, checked: false },
      { name: '시럽 추가', price: 0, checked: false },
    ]
  }, [menu.options])

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

    const customizations: Customizations | undefined = selectedOptions.length > 0 
      ? { options: selectedOptions }
      : undefined

    addToCart(menu, 1, customizations)
  }

  // 옵션 포함 단가 계산
  const totalPrice = useMemo(() => {
    const selectedCustomizations: Customizations | undefined = options
      .filter(opt => opt.checked)
      .length > 0
      ? {
          options: options
            .filter(opt => opt.checked)
            .map(opt => ({ name: opt.name, price: opt.price }))
        }
      : undefined
    
    return calculateUnitPrice(menu.price, selectedCustomizations)
  }, [menu.price, options])

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

MenuCard.displayName = 'MenuCard'

export default React.memo(MenuCard)

