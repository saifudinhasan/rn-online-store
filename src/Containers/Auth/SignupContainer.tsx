import { useTheme } from '@/Hooks'
import useAuth from '@/Hooks/useAuth'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { signup } from '@/Store/Auth'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Headline, Paragraph, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const SignupContainer = () => {
  const { Colors, Gutters } = useTheme()
  const { authLoading, error, authenticated } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<String | null>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    authenticated && navigateAndSimpleReset('HomePage')
  }, [authenticated])

  const handleLogin = () => {
    // validation
    if (!email || !password || !confirmPassword) {
      return setValidationError('The fields must be filled')
    }
    if (password !== confirmPassword) {
      return setValidationError('Password did not match')
    }

    // dispatch
    dispatch(signup({ email, password }))
  }

  return (
    <View style={styles.SignupContainer}>
      <Headline style={styles.Title}>Signup</Headline>
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

      <TextInput
        mode="outlined"
        label="Confirm Password"
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
        style={[styles.Input, Gutters.regularTMargin]}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        error={error ? true : false}
      />

      {validationError && (
        <Text style={[Gutters.smallTMargin, styles.Error]}>
          {validationError}, please try again
        </Text>
      )}

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
        Signup
      </Button>

      <Button
        icon="google"
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={[styles.Input, Gutters.regularTMargin, Gutters.smallVPadding]}
        color={Colors.primary}
      >
        Signup with Google
      </Button>

      <Paragraph
        style={[Gutters.regularTMargin]}
        onPress={() => navigate('LoginPage')}
      >
        Already have an account? Login
      </Paragraph>
    </View>
  )
}

export default SignupContainer

const styles = StyleSheet.create({
  SignupContainer: {
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
