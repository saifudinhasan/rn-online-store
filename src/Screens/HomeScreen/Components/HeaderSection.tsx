/* eslint-disable curly */
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Appbar, Searchbar } from 'react-native-paper'
import { useTheme, useCarts, useAuth } from '@/Hooks'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from '@/Navigators/utils'
import FloatingUserMenu from './FloatingUserMenu'

const HeaderSection = () => {
  const { Colors, Gutters } = useTheme()
  const { products } = useCarts()
  const { authenticated } = useAuth()
  const [search, setSearch] = useState<string>('')

  return (
    <Appbar style={styles.Appbar}>
      <MaterialCommunityIcons
        name="storefront"
        color={Colors.primary}
        size={34}
        style={[Gutters.smallHMargin]}
      />
      <Searchbar
        style={styles.Searchbar}
        placeholder="Cari sesuatu ..."
        onChangeText={query => setSearch(query)}
        value={search}
        onIconPress={() => {
          if (search.length < 3) return
          setSearch('')
          navigate('SearchPage', { query: search })
        }}
      />
      <TouchableOpacity
        style={[Gutters.smallHMargin, styles.CartsContainer]}
        onPress={() => navigate(authenticated ? 'CartPage' : 'LoginPage')}
      >
        <MaterialCommunityIcons name="cart" color={Colors.primary} size={34} />
        {authenticated && (
          <Text style={[styles.TotalCarts, { color: Colors.primary }]}>
            {products?.length || 0}
          </Text>
        )}
      </TouchableOpacity>
      <FloatingUserMenu />
    </Appbar>
  )
}

export default HeaderSection

const styles = StyleSheet.create({
  Appbar: {
    backgroundColor: '#fff',
    height: 70,
    elevation: 12,
  },
  Searchbar: {
    borderColor: '#eee',
    borderWidth: 1,
    height: 50,
    flex: 1,
    elevation: 0,
  },
  CartsContainer: {
    position: 'relative',
  },
  TotalCarts: {
    backgroundColor: '#fff',
    borderColor: 'salmon',
    position: 'absolute',
    top: -7,
    right: -2,
    borderWidth: 1,
    height: 18,
    width: 18,
    borderRadius: 9,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    fontSize: 10,
    lineHeight: 10,
    fontWeight: 'bold',
  },
})
