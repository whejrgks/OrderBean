export const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR') + '원'
}

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleString('ko-KR')
}

export const formatOrderId = (id: string): string => {
  return id.slice(0, 8).toUpperCase()
}

