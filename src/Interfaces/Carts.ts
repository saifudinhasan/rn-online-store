import { Product } from './Product'

export interface Carts {
  products:
    | {
        product: Product
        quantity: number
      }[]
    | []
  email: string | null
  cartLoading: boolean
  cartError: string | null
}
