import { Auth } from '@/Store/Auth'
import { useSelector } from 'react-redux'

export default function () {
  const { auth } = useSelector((state: { auth: Auth }) => state)
  return auth
}
