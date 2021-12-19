import { ICart } from '.'

export interface ICarts {
  products: ICart[]
  email: string | null
  cartLoading: boolean
  cartError: string | null
}
