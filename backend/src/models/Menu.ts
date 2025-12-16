export interface MenuOptions {
  shots?: { min: number; max: number; default: number }
  milk?: { type: string[]; default: string }
  size?: { type: string[]; default: string }
  temperature?: { type: string[]; default: string }
  syrup?: { type: string[]; default?: string }
  [key: string]: any
}

export interface CreateMenuDto {
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  isAvailable?: boolean
  options?: MenuOptions
}

export interface UpdateMenuDto extends Partial<CreateMenuDto> {}

