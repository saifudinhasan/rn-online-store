import { AuthState } from '@/Store/Auth'
import { useSelector } from 'react-redux'

export default function () {
  const { auth } = useSelector((state: { auth: AuthState }) => state)
  return auth
}
