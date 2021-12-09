export interface Product {
  id: string
  name: string
  category: string
  description: string
  discount: number
  isReady: boolean
  price: number
  sold: number
  stock: number | null
  variant: string | null
  weight: number | null
  images: {
    imageFullPath: string
    imageURL: string
  }[]
  timestamp?: string | any
}
