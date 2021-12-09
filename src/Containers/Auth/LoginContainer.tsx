import { useTheme } from '@/Hooks'
import useAuth from '@/Hooks/useAuth'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { login } from '@/Store/Auth'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Headline, Paragraph, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const LoginContainer = () => {
  const { Colors, Gutters } = useTheme()
  const { authLoading, error, authenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    authenticated && navigateAndSimpleReset('HomePage')
  }, [authenticated])

  const handleLogin = () => {
    // validation

    dispatch(login({ email, password }))
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
            .split('Error ')[1]
            .replace(/[-()/.]/gi, ' ')
            .replace('auth', 'Auth error :')
            .trim()}
          , please try again
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

      <Button
        icon="google"
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={[styles.Input, Gutters.regularTMargin, Gutters.smallVPadding]}
        color={Colors.primary}
      >
        Login with Google
      </Button>

      <Paragraph
        style={[Gutters.regularTMargin]}
        onPress={() => navigate('SignupPage')}
      >
        Don't have an account? Signup
      </Paragraph>
    </View>
  )
}

export default LoginContainer

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
})
