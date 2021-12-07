import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Avatar, Searchbar } from 'react-native-paper'
import { useTheme } from '@/Hooks'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Header = () => {
  const { Colors, Gutters } = useTheme()

  const navigation = useNavigation()

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
        onIconPress={() => navigation.navigate('SearchPage')}
      />
      <MaterialCommunityIcons
        name="cart"
        color={Colors.primary}
        size={34}
        style={[Gutters.smallHMargin]}
        onPress={() => navigation.navigate('CartPage')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Avatar.Image
          size={34}
          style={[Gutters.smallRMargin]}
          source={require('../Assets/Images/TOM.png')}
        />
      </TouchableOpacity>
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
