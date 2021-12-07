import { Header, Products } from '@/Components'
import { Carousel, Categories } from '@/Components'
import React from 'react'
import { ScrollView } from 'react-native'

const HomeContainer = () => {
  return (
    <>
      <Header />
      <ScrollView>
        <Carousel />
        <Categories />
        <Products />
      </ScrollView>
    </>
  )
}

export default HomeContainer
