import { MenuOption, MenuOptions, Customizations, CustomizationOption } from '../types'

/**
 * 메뉴 옵션을 파싱하여 표준 형식으로 변환합니다.
 * @param options - 메뉴의 options 필드 (다양한 형식 가능)
 * @returns 표준화된 MenuOption 배열
 */
export const parseMenuOptions = (options?: MenuOptions | MenuOption[] | any): MenuOption[] => {
  if (!options) {
    return []
  }

  // options가 객체이고 items 배열을 가지고 있는 경우
  if (typeof options === 'object' && 'items' in options && Array.isArray(options.items)) {
    return options.items.map((opt: any) => ({
      name: opt.name || '',
      price: opt.price || 0,
    }))
  }

  // options가 직접 배열인 경우
  if (Array.isArray(options)) {
    return options.map((opt: any) => ({
      name: opt.name || '',
      price: opt.price || 0,
    }))
  }

  return []
}

/**
 * 커스터마이징 옵션에서 선택된 옵션 이름 목록을 추출합니다.
 * @param customizations - 커스터마이징 옵션
 * @returns 선택된 옵션 이름 배열
 */
export const extractSelectedOptionNames = (customizations?: Customizations): string[] => {
  if (!customizations?.options || !Array.isArray(customizations.options)) {
    return []
  }

  return customizations.options
    .map((opt: CustomizationOption) => opt.name)
    .filter(Boolean)
}

/**
 * 주문 아이템에서 옵션 텍스트를 생성합니다.
 * @param item - 주문 아이템
 * @returns 옵션 텍스트 (예: " (샷 추가, 시럽 추가)")
 */
export const formatItemOptions = (item: {
  selected_options?: string[]
  customizations?: Customizations
}): string => {
  // selected_options가 있으면 우선 사용
  if (item.selected_options && item.selected_options.length > 0) {
    return ` (${item.selected_options.join(', ')})`
  }

  // customizations에서 옵션 추출
  const optionNames = extractSelectedOptionNames(item.customizations)
  if (optionNames.length > 0) {
    return ` (${optionNames.join(', ')})`
  }

  return ''
}

