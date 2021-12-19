import { IProduct } from './'

export interface IOrder {
  email: string
  products: {
    product: IProduct
    quantity: number
  }[]
  totalPrice: number
}
