import { CategoryState } from '@/Store/Categories'
import { useSelector } from 'react-redux'

export default function () {
  const { categories } = useSelector(
    (state: { categories: CategoryState }) => state,
  )
  // { categories, error, loading } = categories
  return categories
}
