import { ICarts } from '@/Interfaces'
import { useSelector } from 'react-redux'

export default function () {
  const { carts } = useSelector((state: { carts: ICarts }) => state)
  return carts
}
