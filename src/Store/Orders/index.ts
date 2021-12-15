import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { Order } from '@/Interfaces/Order'

const initialState: Order[] | [] = []

export const getUserOrder = createAsyncThunk<Order[]>(
  'getUserOrders',
  async (_, { rejectWithValue, getState }) => {
    const state: any = getState() // root
    const {
      auth: {
        currentUser: { email },
      },
    } = state

    try {
      if (email) {
        const query = await firestore()
          .collection('orders')
          .where('email', '==', email)
          .get()

        let orders: any[] | [] = []
        await query.forEach(q => (orders = [...orders, q.data()]))
        return orders
      } else {
        return []
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const postOrder = createAsyncThunk<Order, Order>(
  'postOrders',
  async (order, { rejectWithValue }) => {
    try {
      await firestore().collection('orders').add(order)
      return order
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      postOrder.fulfilled,
      (state, { payload }) => (state = [...state, payload]),
    )
    builder.addCase(
      getUserOrder.fulfilled,
      (state, { payload }) => (state = payload),
    )
  },
})

export default ordersSlice.reducer
