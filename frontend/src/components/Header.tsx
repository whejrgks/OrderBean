import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdminPage = location.pathname === '/admin'

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="brand">COZY</h1>
        <div className="header-buttons">
          <button 
            className={`header-btn ${!isAdminPage ? 'active' : ''}`}
            onClick={() => navigate('/order')}
          >
            주문하기
          </button>
          <button 
            className={`header-btn ${isAdminPage ? 'active' : ''}`}
            onClick={() => navigate('/admin')}
          >
            관리자
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

