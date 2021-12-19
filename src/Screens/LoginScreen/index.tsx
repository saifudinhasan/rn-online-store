import OAuthButtons from '@/Components/OAuthButtons'
import { useTheme, useAuth } from '@/Hooks'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { login } from '@/Store/Auth'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  ActivityIndicator,
  Button,
  Headline,
  Paragraph,
  TextInput,
} from 'react-native-paper'
import { useDispatch } from 'react-redux'

const LoginScreen = () => {
  const { Colors, Gutters } = useTheme()
  const { authLoading, error } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login({ email, password }))
    navigateAndSimpleReset('Startup')
  }

  if (authLoading) {
    return <ActivityIndicator style={styles.Loading} />
  }

  return (
    <View style={styles.LoginContainer}>
      <Headline style={styles.Title}>Login</Headline>
      <TextInput
        mode="outlined"
        label="Email"
        placeholder="Email ..."
        right={<TextInput.Affix text="/100" />}
        style={[styles.Input, Gutters.regularTMargin]}
        value={email}
        onChangeText={text => setEmail(text)}
        error={error ? true : false}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
        style={[styles.Input, Gutters.regularTMargin]}
        value={password}
        onChangeText={text => setPassword(text)}
        error={error ? true : false}
      />

      {error && (
        <Text style={[Gutters.smallTMargin, styles.Error]}>
          {error
            ?.split('Error ')[1]
            ?.replace(/[-()/.]/gi, ' ')
            ?.replace('auth', 'Auth error :')
            ?.trim()}
          Please try again
        </Text>
      )}

      <Button
        icon="login"
        mode="contained"
        onPress={handleLogin}
        style={[styles.Input, Gutters.regularTMargin, Gutters.smallVPadding]}
        color={authLoading ? '#555' : Colors.primary}
        loading={authLoading}
      >
        Login
      </Button>

      <OAuthButtons />

      <Paragraph
        style={[Gutters.regularTMargin]}
        onPress={() => navigate('SignupPage')}
      >
        Don't have an account? Signup
      </Paragraph>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    textAlign: 'center',
  },
  Input: {
    width: '80%',
  },
  Error: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    color: 'red',
  },
  Loading: {
    flex: 1,
  },
})
