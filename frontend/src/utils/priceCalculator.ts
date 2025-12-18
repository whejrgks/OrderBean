import { Customizations } from '../types'

/**
 * 옵션 가격을 계산합니다.
 * @param customizations - 커스터마이징 옵션
 * @returns 옵션 가격의 합계
 */
export const calculateOptionPrice = (customizations?: Customizations): number => {
  if (!customizations?.options || !Array.isArray(customizations.options)) {
    return 0
  }
  
  return customizations.options.reduce((sum, opt) => sum + (opt.price || 0), 0)
}

/**
 * 아이템의 총 가격을 계산합니다.
 * @param basePrice - 기본 가격
 * @param quantity - 수량
 * @param customizations - 커스터마이징 옵션
 * @returns 총 가격 (기본 가격 + 옵션 가격) × 수량
 */
export const calculateItemPrice = (
  basePrice: number,
  quantity: number,
  customizations?: Customizations
): number => {
  const optionPrice = calculateOptionPrice(customizations)
  return (basePrice + optionPrice) * quantity
}

/**
 * 옵션 포함 단가를 계산합니다.
 * @param basePrice - 기본 가격
 * @param customizations - 커스터마이징 옵션
 * @returns 단가 (기본 가격 + 옵션 가격)
 */
export const calculateUnitPrice = (
  basePrice: number,
  customizations?: Customizations
): number => {
  const optionPrice = calculateOptionPrice(customizations)
  return basePrice + optionPrice
}

