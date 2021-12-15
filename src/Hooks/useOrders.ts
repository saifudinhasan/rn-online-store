import { Order } from '@/Interfaces/Order'
import { useSelector } from 'react-redux'

export default function () {
  const { orders } = useSelector((state: { orders: Order[] }) => state)
  return orders
}
