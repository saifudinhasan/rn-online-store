import { useTheme } from '@/Hooks'
import useAuth from '@/Hooks/useAuth'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { azureLogin, googleLogin } from '@/Store/Auth'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const OAuthButtons = () => {
  const { Colors, Gutters } = useTheme()
  const { authLoading } = useAuth()

  const dispatch = useDispatch()

  return (
    <>
      <Button
        icon="microsoft"
        mode="contained"
        onPress={async () => {
          try {
            await dispatch(azureLogin())
            navigateAndSimpleReset('Startup')
          } catch (error) {}
        }}
        style={[styles.Button, Gutters.regularTMargin, Gutters.smallVPadding]}
        color={authLoading ? '#555' : Colors.primary}
        loading={authLoading}
      >
        Login with Azure
      </Button>

      <Button
        icon="google"
        mode="contained"
        onPress={async () => {
          try {
            await dispatch(googleLogin())
            navigateAndSimpleReset('Startup')
          } catch (error) {}
        }}
        style={[styles.Button, Gutters.regularTMargin, Gutters.smallVPadding]}
        color={authLoading ? '#555' : Colors.primary}
        loading={authLoading}
      >
        Login with Google
      </Button>
    </>
  )
}

export default OAuthButtons

const styles = StyleSheet.create({
  Button: {
    width: '80%',
  },
})
