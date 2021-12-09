import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
  // onAuthStateChanged,
  // updateProfile,
} from 'firebase/auth'

export interface AuthState {
  authenticated?: boolean
  error?: string | null
  currentUser?: Partial<User> | null
  authLoading?: boolean
}

const initialState: AuthState = {
  authenticated: false,
  error: null,
  currentUser: null,
  authLoading: false,
}

interface LoginParams {
  email: string
  password: string
}

interface SignupParams {
  email: string
  password: string
}

const auth = getAuth()

export const login = createAsyncThunk<Partial<User>, LoginParams>(
  'login',
  async ({ email: loginEmail, password }, { rejectWithValue }) => {
    try {
      const {
        user: { displayName, email, emailVerified, phoneNumber, photoURL, uid },
      } = await signInWithEmailAndPassword(auth, loginEmail, password)

      await AsyncStorageLib.setItem(
        'currentUser',
        JSON.stringify({
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
        }),
      )

      return {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
      }
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

      await AsyncStorageLib.setItem(
        'currentUser',
        JSON.stringify({
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
        }),
      )

      return {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
      }
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
      // Expire session checking later
      return JSON.parse(userCache)
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
        // console.log(payload)
        state.authenticated = false
        state.error = String(payload) // Error from backend
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
        // console.log(payload)
        state.authenticated = false
        state.error = String(payload) // Error from backend
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
