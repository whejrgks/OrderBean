import React from 'react'
import { DashboardStats as DashboardStatsType } from '../../types'

interface DashboardStatsProps {
  stats: DashboardStatsType
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="dashboard-stats">
      <p>
        총 주문 {stats.total_orders} / 주문 접수 {stats.pending_orders} / 
        제조 중 {stats.preparing_orders} / 제조 완료 {stats.ready_orders}
      </p>
    </div>
  )
}

export default DashboardStats

