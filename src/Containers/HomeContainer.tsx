import { Header, Products } from '@/Components'
import { SlideCarousel, Categories } from '@/Components'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const HomeContainer = () => {
  return (
    <>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.Container}
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
