import { Header, Products } from '@/Components'
import { SlideCarousel, Categories } from '@/Components'
import { getUserCarts } from '@/Store/Carts'
import { getCategories } from '@/Store/Categories'
import { getUserOrder } from '@/Store/Orders'
import { getProducts } from '@/Store/Products'
import { getSlideBanners } from '@/Store/SlideBanners'
import React from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

const HomeContainer = () => {
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useDispatch()

  const onRefresh = async () => {
    setRefreshing(true)
    await dispatch(getCategories())
    await dispatch(getProducts())
    await dispatch(getSlideBanners())
    await dispatch(getUserCarts())
    await dispatch(getUserOrder())
    setRefreshing(false)
  }

  return (
    <>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.Container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SlideCarousel />
        <Categories />
        <Products />
      </ScrollView>
    </>
  )
}

export default HomeContainer

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
  },
})
