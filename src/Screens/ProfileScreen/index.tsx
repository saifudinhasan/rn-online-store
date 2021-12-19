import { useTheme, useAuth } from '@/Hooks'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { AppDispatch } from '@/Store'
import { logout } from '@/Store/Auth'
import { getUserLabel } from '@/Utils'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  ActivityIndicator,
  Avatar,
  Button,
  Caption,
  Headline,
  Title,
} from 'react-native-paper'
import { useDispatch } from 'react-redux'

const ProfileScreen = () => {
  const { currentUser, authLoading } = useAuth()
  const { Gutters, Colors } = useTheme()
  const dispatch = useDispatch<AppDispatch>()

  if (authLoading) {
    return <ActivityIndicator style={styles.Loading} />
  }

  return (
    <View style={[styles.ProfileContainer, Gutters.largeVPadding]}>
      {currentUser?.photoURL ? (
        <Avatar.Image
          size={160}
          style={[Gutters.smallRMargin, styles.FloatingMenu]}
          source={{ uri: currentUser.photoURL }}
        />
      ) : (
        <Avatar.Text
          size={160}
          style={[Gutters.smallRMargin, { backgroundColor: Colors.primary }]}
          label={getUserLabel(currentUser?.email || '')}
          labelStyle={styles.LabelStyle}
        />
      )}
      <Headline style={[Gutters.largeTMargin]}>{currentUser?.email}</Headline>
      <Title>{currentUser?.displayName}</Title>
      <Caption>Logged in with {currentUser?.providerId} account</Caption>
      <Button
        icon="logout"
        mode="contained"
        onPress={async () => {
          await dispatch(logout(currentUser))
          navigateAndSimpleReset('Startup')
        }}
        style={[styles.Button, Gutters.regularTMargin, Gutters.smallVPadding]}
        color={authLoading ? '#555' : Colors.primary}
        loading={authLoading}
      >
        Logout
      </Button>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  ProfileContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FloatingMenu: {
    backgroundColor: 'white',
  },
  LabelStyle: {
    color: '#fff',
    fontWeight: '900',
  },
  Button: {
    width: '40%',
  },
  Loading: {
    flex: 1,
  },
})
