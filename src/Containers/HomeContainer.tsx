import { Header, Products } from '@/Components'
import { Carousel, Categories } from '@/Components'
import useAuth from '@/Hooks/useAuth'
import React from 'react'
import { ScrollView, Text } from 'react-native'

const HomeContainer = () => {
  const { authenticated, currentUser } = useAuth()

  return (
    <>
      <Header />
      <ScrollView>
        <Carousel />
        {authenticated && <Text>Authenticated to : {currentUser?.email}</Text>}
        <Categories />
        <Products />
      </ScrollView>
    </>
  )
}

export default HomeContainer
