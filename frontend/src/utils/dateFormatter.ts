/**
 * 주문 날짜를 포맷팅합니다.
 * @param dateString - ISO 날짜 문자열
 * @returns 포맷된 날짜 문자열 (예: "12월 25일 14:30")
 */
export const formatOrderDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month}월 ${day}일 ${hours}:${minutes}`
}

