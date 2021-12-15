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
import webClient from '@/Config/google'

export interface Auth {
  authenticated: boolean
  error: string | null | undefined
  currentUser: IUser | null
  authLoading: boolean
}

export type IUser = Partial<User> & Tokens

type Tokens = (AzureTokens & GoogleTokens) | null

interface AzureTokens {
  accessToken?: string
  clientId?: string
  expireOn?: number
  idTokenExpireOn?: number
  rawIdToken?: string
  scope?: {
    scope: string[]
    scopeStr: string
  }
  tenantId?: string
  userId?: string
  userName?: string
}

interface GoogleTokens {
  refreshToken?: string
  idToken?: string | null
  accessToken?: string
}

interface ILoginParams {
  email: string
  password: string
}

interface ISignupParams {
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

export const azureLogin = createAsyncThunk<IUser>(
  'azureLogin',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await azureAuth.webAuth.authorize({
        scope: azureConfig.appScopes,
      })

      // Get from https://graph.microsoft.com/v1.0/me with accessToken ...
      // Or maybe fetch with axios ?
      const user = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken || '',
        path: 'me',
      })

      const userInfo: IUser = {
        displayName: user.displayName,
        email: user.userPrincipalName,
        phoneNumber: user.mobilePhone,
        photoURL: null,
        uid: user.id,
        providerId: 'azure',
        ...tokens,
      }

      return userInfo
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const googleLogin = createAsyncThunk<IUser>(
  'googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      GoogleSignin.configure({
        webClientId: webClient,
        offlineAccess: true,
      })

      await GoogleSignin.hasPlayServices()

      const { idToken } = await GoogleSignin.signIn()
      const credential = await GoogleAuthProvider.credential(idToken)
      const {
        user: {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
          refreshToken,
        },
      } = await signInWithCredential(auth, credential)

      const userInfo = {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        providerId: 'google',
        refreshToken,
        idToken,
        accessToken: credential.accessToken,
      }

      return userInfo
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const login = createAsyncThunk<IUser, ILoginParams>(
  'login',
  async ({ email: loginEmail, password }, { rejectWithValue }) => {
    try {
      const {
        user: {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
          refreshToken,
        },
      } = await signInWithEmailAndPassword(auth, loginEmail, password)

      const userInfo = {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        providerId: 'email',
        refreshToken,
      }

      return userInfo
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const signup = createAsyncThunk<IUser, ISignupParams>(
  'signup',
  async ({ email: signupEmail, password }, { rejectWithValue }) => {
    try {
      const {
        user: {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
          refreshToken,
        },
      } = await createUserWithEmailAndPassword(auth, signupEmail, password)

      const userInfo = {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        refreshToken,
      }

      return userInfo
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const logout = createAsyncThunk<void, IUser | null>(
  'logout',
  async (user, { rejectWithValue }) => {
    try {
      if (user?.providerId === 'google') {
        await GoogleSignin.signOut()
      }
      if (user?.providerId === 'email') {
        await signOut(auth)
      }
      if (user?.providerId === 'azure') {
        // await azureAuth.webAuth.clearSession({ closeOnLoad: true })
      }
    } catch (error) {
      rejectWithValue(error)
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
  },
})

export default authSlice.reducer
