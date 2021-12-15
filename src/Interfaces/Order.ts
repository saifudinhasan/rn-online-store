import { Product } from './Product'

export interface Order {
  email: string
  products: {
    product: Product
    quantity: number
  }[]
  totalPrice: number
}
