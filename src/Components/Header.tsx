import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Searchbar } from 'react-native-paper'
import { useTheme } from '@/Hooks'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from '@/Navigators/utils'
import FloatingUserMenu from './FloatingUserMenu'

const Header = () => {
  const { Colors, Gutters } = useTheme()

  const [search, setSearch] = useState('')

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
        onIconPress={() => navigate('SearchPage')}
      />
      <MaterialCommunityIcons
        name="cart"
        color={Colors.primary}
        size={34}
        style={[Gutters.smallHMargin]}
        onPress={() => navigate('CartPage')}
      />
      <FloatingUserMenu />
    </Appbar>
  )
}

export default Header

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
})
