import { useTheme } from '@/Hooks'
import useAuth from '@/Hooks/useAuth'
import { navigate } from '@/Navigators/utils'
import { logout } from '@/Store/Auth'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Menu, Divider, Avatar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getUserLabel } from '@/Utils'

const FloatingUserMenu = () => {
  const [visible, setVisible] = useState(false)

  const { Gutters, Colors } = useTheme()
  const { authenticated, currentUser } = useAuth()
  const dispatch = useDispatch()

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleLogout = async () => {
    try {
      await dispatch(logout(currentUser))
      closeMenu()
    } catch (error) {}
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          {authenticated ? (
            currentUser?.photoURL ? (
              <Avatar.Image
                size={34}
                style={[Gutters.smallRMargin, styles.FloatingMenu]}
                source={{ uri: currentUser.photoURL }}
              />
            ) : (
              <Avatar.Text
                size={34}
                style={[
                  Gutters.smallRMargin,
                  { backgroundColor: Colors.primary },
                ]}
                label={getUserLabel(currentUser?.email || '')}
                labelStyle={styles.LabelStyle}
              />
            )
          ) : (
            <MaterialCommunityIcons
              name="account"
              color={Colors.primary}
              size={34}
              style={[Gutters.smallRMargin]}
            />
          )}
        </TouchableOpacity>
      }
    >
      {authenticated ? (
        <>
          <Menu.Item icon="logout" title="Logout" onPress={handleLogout} />
          <Divider />
          <Menu.Item
            icon="account"
            title="Profile"
            onPress={() => {
              navigate('Profile')
              closeMenu()
            }}
          />
        </>
      ) : (
        <>
          <Divider />
          <Menu.Item
            icon="login"
            title="Login"
            onPress={() => {
              navigate('LoginPage')
              closeMenu()
            }}
          />
          <Divider />
          <Menu.Item
            icon="account-plus"
            title="Signup"
            onPress={() => {
              navigate('SignupPage')
              closeMenu()
            }}
          />
        </>
      )}
    </Menu>
  )
}

export default FloatingUserMenu

const styles = StyleSheet.create({
  FloatingMenu: {
    backgroundColor: 'white',
  },
  LabelStyle: {
    color: '#fff',
    fontWeight: '900',
  },
})
