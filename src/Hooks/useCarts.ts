import { Carts } from '@/Interfaces/Carts'
import { useSelector } from 'react-redux'

export default function () {
  const { carts } = useSelector((state: { carts: Carts }) => state)
  return carts
}
