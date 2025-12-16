import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>☕ OrderBean</h1>
        <p className="subtitle">빠르고 간편한 커피 주문 서비스</p>
        <p className="description">
          바쁜 일상 속에서도 빠르게 주문하고, 즐겨찾는 메뉴를 한 번에 재주문하세요.
        </p>
        <div className="actions">
          <Link to="/order" className="btn btn-primary">
            주문하기
          </Link>
          <Link to="/history" className="btn btn-secondary">
            주문 내역 보기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage

