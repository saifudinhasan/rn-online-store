import { Header, Products } from '@/Components'
import { Carousel, Categories } from '@/Components'
import useAuth from '@/Hooks/useAuth'
import React, { useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { useDispatch } from 'react-redux'

const HomeContainer = () => {
  const { authLoading, authenticated, currentUser } = useAuth()

  const dispatch = useDispatch()

  useEffect(() => {
    console.log({ authLoading, currentUser, authenticated })
  }, [authLoading, authenticated, currentUser, dispatch])

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
