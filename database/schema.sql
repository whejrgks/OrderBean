-- BeanTaste Map 데이터베이스 스키마
-- PostgreSQL 기반

-- 사용자 테이블
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- bcrypt 암호화된 비밀번호
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 취향 프로필 테이블
CREATE TABLE taste_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    acidity INTEGER CHECK (acidity >= 1 AND acidity <= 10),
    roasting INTEGER CHECK (roasting >= 1 AND roasting <= 10),
    body INTEGER CHECK (body >= 1 AND body <= 10),
    sweetness INTEGER CHECK (sweetness >= 1 AND sweetness <= 10),
    bitterness INTEGER CHECK (bitterness >= 1 AND bitterness <= 10),
    preferred_origin JSONB,
    preferred_processing JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 카페 테이블
CREATE TABLE cafes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone VARCHAR(20),
    opening_hours JSONB,
    avg_acidity DECIMAL(3, 2) DEFAULT 0,
    avg_roasting DECIMAL(3, 2) DEFAULT 0,
    avg_body DECIMAL(3, 2) DEFAULT 0,
    avg_sweetness DECIMAL(3, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 리뷰 테이블
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cafe_id INTEGER NOT NULL REFERENCES cafes(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    tags JSONB NOT NULL, -- 표준화된 태그 배열
    acidity INTEGER CHECK (acidity >= 1 AND acidity <= 10),
    roasting INTEGER CHECK (roasting >= 1 AND roasting <= 10),
    body INTEGER CHECK (body >= 1 AND body <= 10),
    sweetness INTEGER CHECK (sweetness >= 1 AND sweetness <= 10),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_taste_profiles_user_id ON taste_profiles(user_id);
CREATE INDEX idx_cafes_location ON cafes(latitude, longitude);
CREATE INDEX idx_reviews_cafe_id ON reviews(cafe_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- 카페 평균값 업데이트 트리거 함수 (리뷰 추가/수정 시 자동 계산)
CREATE OR REPLACE FUNCTION update_cafe_averages()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE cafes
    SET
        avg_acidity = (
            SELECT COALESCE(AVG(acidity), 0)
            FROM reviews
            WHERE cafe_id = NEW.cafe_id AND is_deleted = FALSE AND acidity IS NOT NULL
        ),
        avg_roasting = (
            SELECT COALESCE(AVG(roasting), 0)
            FROM reviews
            WHERE cafe_id = NEW.cafe_id AND is_deleted = FALSE AND roasting IS NOT NULL
        ),
        avg_body = (
            SELECT COALESCE(AVG(body), 0)
            FROM reviews
            WHERE cafe_id = NEW.cafe_id AND is_deleted = FALSE AND body IS NOT NULL
        ),
        avg_sweetness = (
            SELECT COALESCE(AVG(sweetness), 0)
            FROM reviews
            WHERE cafe_id = NEW.cafe_id AND is_deleted = FALSE AND sweetness IS NOT NULL
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.cafe_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER trigger_update_cafe_averages
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
WHEN (NEW.is_deleted = FALSE)
EXECUTE FUNCTION update_cafe_averages();

