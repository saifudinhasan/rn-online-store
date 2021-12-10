import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { Product } from '@/Interfaces/Product'

export interface ProductState {
  loading: boolean
  error: string | null
  products: Product[] | []
}

const productState: ProductState = {
  loading: false,
  error: null,
  products: [],
}

export const getProducts = createAsyncThunk<Product[]>(
  'getProducts',
  async (_, { rejectWithValue }) => {
    try {
      let payload: Product[] | any = []
      const query = await firestore().collection('products').get()
      query.forEach(
        doc => (payload = [...payload, { id: doc.id, ...doc.data() }]),
      )
      return payload
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState: productState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.products = payload
      state.loading = false
    })
    builder.addCase(getProducts.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getProducts.rejected, (state, { error }) => {
      state.products = []
      state.loading = false
      state.error = String(error.message)
    })
  },
})

export default productsSlice.reducer
