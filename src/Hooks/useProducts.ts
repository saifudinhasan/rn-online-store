import { ProductState } from '@/Store/Products'
import { useSelector } from 'react-redux'

export default function () {
  const { products } = useSelector((state: { products: ProductState }) => state)
  // { products, error, loading } = categories
  return products
}
