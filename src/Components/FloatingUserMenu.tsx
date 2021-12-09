import { useTheme } from '@/Hooks'
import useAuth from '@/Hooks/useAuth'
import { navigate } from '@/Navigators/utils'
import { logout } from '@/Store/Auth'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Menu, Divider, Avatar } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import Icon from 'react-native-vector-icons/Ionicons'

const FloatingUserMenu = () => {
  const [visible, setVisible] = useState(false)

  const { Gutters, Colors } = useTheme()
  const { authenticated, currentUser } = useAuth()
  const dispatch = useDispatch()

  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const handleLogout = async () => {
    try {
      console.log(1)
      dispatch(logout())
      closeMenu()
      console.log(2)
    } catch (error) {}
  }

  const userLabel = (): string => {
    if (currentUser?.email) {
      const emailUser: string[] = currentUser.email.split('@')
      const username = emailUser[0]
      const splitUsername: string[] = username.split('.')
      // somename@email.com -> SO
      if (splitUsername.length === 1) {
        return `${username[0]}${username[1]}`.toUpperCase()
      }
      // some.name@email.com -> SN
      if (splitUsername.length > 1) {
        return `${splitUsername[0][0]}${splitUsername[1][0]}`.toUpperCase()
      }
    }
    // Typescript hack
    return (currentUser?.email && currentUser?.email[0]?.toUpperCase()) || ''
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
                label={userLabel()}
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
