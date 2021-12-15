import { SlideBannersState } from '@/Store/SlideBanners'
import { useSelector } from 'react-redux'

export default function () {
  const { slideBanners } = useSelector(
    (state: { slideBanners: SlideBannersState }) => state,
  )
  // { categories, error, loading } = categories
  return slideBanners
}
