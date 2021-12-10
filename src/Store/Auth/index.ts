import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AzureAuth from 'react-native-azure-auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import { azureConfig } from '@/Config/azure'

GoogleSignin.configure({
  webClientId:
    '65225494318-bn6q9a9cjuk5uruhoeppge9lfjg9ela1.apps.googleusercontent.com',
  offlineAccess: true,
})

export interface Auth {
  authenticated: boolean
  error: string | null | undefined
  currentUser: Partial<User> | null
  authLoading: boolean
}

interface AzureTokens {
  authProvider: 'azure'
  accessToken: string | undefined
  expireOn: number
  idTokenExpireOn: number
  isExpired: (() => boolean) | undefined
}

interface LoginParams {
  email: string
  password: string
}

interface SignupParams {
  email: string
  password: string
}

const initialState: Auth = {
  authenticated: false,
  error: null,
  currentUser: null,
  authLoading: false,
}

const auth = getAuth()
const azureAuth = new AzureAuth({
  clientId: azureConfig.appId,
})

export const azureLogin = createAsyncThunk<Partial<User>>(
  'azureLogin',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await azureAuth.webAuth.authorize({
        scope: azureConfig.appScopes,
      })
      console.log({ tokens })

      const user = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken || '',
        path: 'me',
      })
      console.log({ user })

      const userInfo: Partial<User> = {
        displayName: tokens.userName,
        email: tokens.userId,
        phoneNumber: user.mobilePhone,
        photoURL: null,
        uid: user.id,
      }

      const azureTokens: AzureTokens = {
        authProvider: 'azure',
        accessToken: tokens.accessToken,
        expireOn: tokens.expireOn || 0,
        idTokenExpireOn: tokens.idTokenExpireOn,
        isExpired: tokens.isExpired,
      }

      await AsyncStorageLib.setItem(
        'currentUser',
        JSON.stringify({ ...userInfo, ...azureTokens }),
      )

      return userInfo
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const googleLogin = createAsyncThunk<Partial<User>>(
  'googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      await GoogleSignin.hasPlayServices()
      console.log('GOOGLE')
      const credential1 = await GoogleSignin.signIn()
      console.log({ credential1 })
      const user1 = await GoogleAuthProvider.credential(credential1.idToken)
      console.log({ user1 })
      const { user } = await signInWithCredential(auth, user1)
      console.log({ user })
      return user
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  },
)

export const login = createAsyncThunk<Partial<User>, LoginParams>(
  'login',
  async ({ email: loginEmail, password }, { rejectWithValue }) => {
    try {
      const {
        user: { displayName, email, emailVerified, phoneNumber, photoURL, uid },
      } = await signInWithEmailAndPassword(auth, loginEmail, password)

      const userInfo = {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
      }

      await AsyncStorageLib.setItem('currentUser', JSON.stringify(userInfo))

      return userInfo
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const signup = createAsyncThunk<Partial<User>, SignupParams>(
  'signup',
  async ({ email: signupEmail, password }, { rejectWithValue }) => {
    try {
      const {
        user: { displayName, email, emailVerified, phoneNumber, photoURL, uid },
      } = await createUserWithEmailAndPassword(auth, signupEmail, password)

      const userInfo = {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
      }

      await AsyncStorageLib.setItem('currentUser', JSON.stringify(userInfo))

      return userInfo
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const logout = createAsyncThunk(
  'logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth)
      await AsyncStorageLib.removeItem('currentUser')
    } catch (error) {
      rejectWithValue(error)
    }
  },
)

export const loadUser = createAsyncThunk<Partial<User>>(
  'loadUser',
  async (_, { rejectWithValue }) => {
    const userCache = await AsyncStorageLib.getItem('currentUser')

    if (userCache !== null) {
      let user: Partial<User> & AzureTokens = JSON.parse(userCache)

      /**
       * @azureAD
       * Expiration time of expiredOn props is 1 hour after login
       * Expiration time of idTokenExpireOn props is 1 day after login
       */

      // Check microsoft account ...
      if (user.authProvider === 'azure') {
        const skipTime: number = 5 * 60 * 1000

        // if skip time == 5 minutes,
        // it means get new token 5 minutes before expiration time
        if (user.expireOn - skipTime < new Date().getTime()) {
          const newToken = await azureAuth.auth.acquireTokenSilent({
            userId: user.email || '',
            scope: azureConfig.appScopes,
          })
          console.log({ newToken })
          user = { ...user, ...newToken }
          await AsyncStorageLib.setItem('currentUser', JSON.stringify(user))
        }
      }

      console.log({ user })
      return user
    } else {
      return rejectWithValue({ message: 'User not found' })
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(azureLogin.fulfilled, (state, { payload }) => {
        state.authenticated = true
        state.currentUser = payload
        state.authLoading = false
      })
      .addCase(azureLogin.pending, state => {
        state.authLoading = true
        state.error = null
      })
      .addCase(azureLogin.rejected, (state, { payload }) => {
        state.authenticated = false
        state.error = String(payload)
        state.authLoading = false
      })

      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.authenticated = true
        state.currentUser = payload
        state.authLoading = false
      })
      .addCase(googleLogin.pending, state => {
        state.authLoading = true
        state.error = null
      })
      .addCase(googleLogin.rejected, (state, { payload }) => {
        state.authenticated = false
        state.error = String(payload)
        state.authLoading = false
      })

      .addCase(signup.fulfilled, (state, { payload }) => {
        state.authenticated = true
        state.currentUser = payload
        state.authLoading = false
      })
      .addCase(signup.pending, state => {
        state.authLoading = true
        state.error = null
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.authenticated = false
        state.error = String(payload)
        state.authLoading = false
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        state.authenticated = true
        state.currentUser = payload
        state.authLoading = false
      })
      .addCase(login.pending, state => {
        state.authLoading = true
        state.error = null
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.authenticated = false
        state.error = String(payload)
        state.authLoading = false
      })

      .addCase(logout.fulfilled, state => {
        state.authenticated = false
        state.currentUser = null
        state.authLoading = false
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.authLoading = false
        state.error = error.message
      })
      .addCase(logout.pending, state => {
        state.authLoading = true
        state.error = null
      })

      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.authenticated = true
        state.currentUser = payload
        state.authLoading = false
      })
      .addCase(loadUser.pending, state => {
        state.authLoading = true
        state.error = null
      })

      .addCase(loadUser.rejected, state => {
        state.authenticated = false
        state.authLoading = false
      })
  },
})

export default authSlice.reducer
