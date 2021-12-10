import { Category } from '@/Interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'

export interface CategoryState {
  loading: boolean
  error: string | null
  categories: Category[] | [] | null
}

const categoryState: CategoryState = {
  loading: false,
  error: null,
  categories: null,
}

export const getCategories = createAsyncThunk<Category[]>(
  'getCategories',
  async (_, { rejectWithValue }) => {
    try {
      let payload: Category[] | any = []
      const query = await firestore().collection('categories').get()
      query.forEach(
        doc => (payload = [...payload, { id: doc.id, ...doc.data() }]),
      )
      return payload
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoryState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload
      state.loading = false
    })
    builder.addCase(getCategories.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getCategories.rejected, (state, { error }) => {
      state.categories = []
      state.loading = false
      state.error = String(error.message)
    })
  },
})

export default categoriesSlice.reducer
