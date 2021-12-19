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
import googleWebClient from '@/Config/googleWebClient'

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
        webClientId: googleWebClient,
        offlineAccess: true,
      })

      await GoogleSignin.hasPlayServices()

      const { idToken } = await GoogleSignin.signIn()
      const credential = GoogleAuthProvider.credential(idToken)
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

      return {
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

      return {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        providerId: 'email',
        refreshToken,
      }
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

      return {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        refreshToken,
      }
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
    /**
     * We can use addMatcher instead use sharedReducer
     * https://redux-toolkit.js.org/api/createReducer#builderaddmatcher
     */
    const sharedFulfilled = (state: Auth, { payload }: any) => {
      state.authenticated = true
      state.currentUser = payload
      state.authLoading = false
    }

    const sharedRejected = (state: Auth, { payload }: any) => {
      state.authenticated = false
      state.error = String(payload)
      state.authLoading = false
    }

    const sharedPending = (state: Auth) => {
      state.authLoading = true
      state.error = null
    }

    builder
      .addCase(azureLogin.fulfilled, sharedFulfilled)
      .addCase(googleLogin.fulfilled, sharedFulfilled)
      .addCase(signup.fulfilled, sharedFulfilled)
      .addCase(login.fulfilled, sharedFulfilled)

      .addCase(azureLogin.rejected, sharedRejected)
      .addCase(googleLogin.rejected, sharedRejected)
      .addCase(signup.rejected, sharedRejected)
      .addCase(login.rejected, sharedRejected)

      .addCase(azureLogin.pending, sharedPending)
      .addCase(googleLogin.pending, sharedPending)
      .addCase(signup.pending, sharedPending)
      .addCase(login.pending, sharedPending)
      .addCase(logout.pending, sharedPending)

      .addCase(logout.fulfilled, state => {
        state.authenticated = false
        state.currentUser = null
        state.authLoading = false
      })
      .addCase(logout.rejected, (state, { error }) => {
        state.authLoading = false
        state.error = error.message
      })
  },
})

export default authSlice.reducer
