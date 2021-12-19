import { useAuth } from '@/Hooks'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { logout } from '@/Store/Auth'
import React, { useState } from 'react'
import { Menu, Divider } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Store'
import { UserAvatar } from '@/Components'

const FloatingUserMenu = () => {
  const [visible, setVisible] = useState(false)

  const { authenticated, currentUser } = useAuth()
  const dispatch = useDispatch<AppDispatch>()

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(() => false)

  const handleLogout = async () => {
    try {
      await dispatch(logout(currentUser))
      closeMenu()
      navigateAndSimpleReset('Startup')
    } catch (error) {}
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<UserAvatar onPress={openMenu} />}
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
