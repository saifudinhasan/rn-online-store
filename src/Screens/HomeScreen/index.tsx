import { useAuth } from '@/Hooks'
import { ICategory, IProduct, ISlideBanner } from '@/Interfaces'
import { getCollection } from '@/Services/firebase'
import { AppDispatch } from '@/Store'
import { getUserCarts } from '@/Store/Carts'
import { WINDOW_WIDTH } from '@/Utils/getDimensions'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, StyleSheet, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import CategoriesSection from './Components/CategoriesSection'
import HeaderSection from './Components/HeaderSection'
import ProductsSection from './Components/ProductsSection'
import SlideCarouselSection from './Components/SlideCarouselSection'

interface Section {
  name: string
  horizontal: boolean
  data: IProduct[] | ICategory[] | ISlideBanner[] | any[]
}

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [refreshing, setRefreshing] = React.useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [slideBanners, setSlideBanners] = useState<ISlideBanner[]>([])
  const [products, setProducts] = useState<IProduct[]>([])
  const { authenticated } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()

  async function init() {
    setLoading(true)
    setError(null)
    try {
      const _categories = await getCollection('categories')
      const _slideBanners = await getCollection('slide-banners')
      const _products = await getCollection('products')

      setCategories(_categories)
      setSlideBanners(_slideBanners)
      setProducts(_products)
      if (authenticated) {
        await dispatch(getUserCarts())
      }
    } catch (err) {
      console.log({ errorHomepage: err })
      setError(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await init()
    setRefreshing(false)
  }

  const sections: Section[] = [
    {
      name: 'SlideBanners',
      horizontal: true,
      data: slideBanners,
    },
    {
      name: 'Categories',
      horizontal: true,
      data: categories,
    },
    {
      name: 'Top Products',
      horizontal: false,
      data: products,
    },
  ]

  return (
    <>
      {error &&
        Alert.alert('Something Error', 'Please refresh the page', [
          {
            text: 'Reload',
            onPress: async () => onRefresh(),
            style: 'destructive',
          },
        ])}
      <HeaderSection />
      <FlatList
        data={sections}
        keyExtractor={item => item.name}
        renderItem={({ index, item }) => {
          switch (item.name) {
            case 'SlideBanners':
              return loading ? (
                <ActivityIndicator style={{ height: WINDOW_WIDTH / 3 }} />
              ) : (
                <SlideCarouselSection slideBanners={item.data} />
              )
            case 'Categories':
              return loading ? (
                <ActivityIndicator style={{ height: WINDOW_WIDTH / 3 }} />
              ) : (
                <CategoriesSection categories={item.data} />
              )
            case 'Top Products':
              return loading ? (
                <ActivityIndicator style={{ height: WINDOW_WIDTH }} />
              ) : (
                <ProductsSection products={item.data} />
              )
          }
          return <Text>{index}</Text>
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.Container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
  },
})
