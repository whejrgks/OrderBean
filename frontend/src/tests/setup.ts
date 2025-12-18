import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// RED 테스트 설정
expect.extend(matchers)

afterEach(() => {
  cleanup()
})

