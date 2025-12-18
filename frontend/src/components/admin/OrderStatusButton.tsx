import React from 'react'

interface OrderStatusButtonProps {
  status: string
  orderId: string
  onUpdateStatus: (orderId: string, status: string) => void
}

const OrderStatusButton: React.FC<OrderStatusButtonProps> = ({
  status,
  orderId,
  onUpdateStatus,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'PENDING':
        return {
          nextStatus: 'PREPARING',
          label: '주문 접수',
        }
      case 'PREPARING':
        return {
          nextStatus: 'READY',
          label: '제조 완료',
        }
      case 'READY':
        return {
          nextStatus: 'COMPLETED',
          label: '픽업 완료',
        }
      case 'COMPLETED':
        return null
      default:
        return null
    }
  }

  const config = getStatusConfig()

  if (!config) {
    return <span className="order-status-completed">완료</span>
  }

  return (
    <button
      className="order-status-btn"
      onClick={() => onUpdateStatus(orderId, config.nextStatus)}
      aria-label={`${config.label} 버튼`}
    >
      {config.label}
    </button>
  )
}

export default OrderStatusButton

