import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { SlideBanner } from '@/Interfaces/SlideBanner'

export interface SlideBannersState {
  loading: boolean
  error: string | null
  slideBanners: SlideBanner[] | []
}

const slideBanners: SlideBannersState = {
  loading: false,
  error: null,
  slideBanners: [],
}

export const getSlideBanners = createAsyncThunk<SlideBanner[]>(
  'getSlideBanners',
  async (_, { rejectWithValue }) => {
    try {
      let payload: SlideBanner[] | any = []
      const query = await firestore().collection('slide-banners').get()
      query.forEach(
        doc => (payload = [...payload, { id: doc.id, ...doc.data() }]),
      )
      return payload
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const slideBannersSlice = createSlice({
  name: 'slideBanners',
  initialState: slideBanners,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSlideBanners.fulfilled, (state, { payload }) => {
      state.slideBanners = payload
      state.loading = false
    })
    builder.addCase(getSlideBanners.pending, state => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getSlideBanners.rejected, (state, { error }) => {
      state.slideBanners = []
      state.loading = false
      state.error = String(error.message)
    })
  },
})

export default slideBannersSlice.reducer
