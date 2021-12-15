/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '@/Interfaces/Product'
import firestore from '@react-native-firebase/firestore'
import { Carts } from '@/Interfaces/Carts'

const cartsState: Carts = {
  products: [],
  email: null,
  cartLoading: false,
  cartError: null,
}

interface ICartParams {
  product: Partial<Product>
  type: 'add' | 'subtract' | 'value'
  value?: number
}

export const getUserCarts = createAsyncThunk<Carts | any>(
  'getUserCarts',
  async (_, { rejectWithValue, getState }) => {
    const state: any = getState() // root state
    const {
      auth: {
        currentUser: { email },
      },
    } = state
    try {
      if (email) {
        const query = await firestore().collection('carts').doc(email).get()

        const cart = { ...query.data() }
        if (cart?.products?.length) return { ...query.data() }
        else return { email, products: [] }
      } else {
        return { email: null, products: [] }
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const updateCart = createAsyncThunk<Partial<Carts> | any, ICartParams>(
  'updateCart',
  async ({ product, type, value }, { getState, rejectWithValue }) => {
    // State destructure ...
    const state: any = getState()
    const {
      auth: {
        currentUser: { email },
      },
      carts: { products: prevCartProducts },
    } = state

    try {
      let currentCartProducts: any = []

      // 1. check if product alredy exist in carts
      const isAlreadyInCart = prevCartProducts.find(
        (cart: any) => cart.product.id === product.id,
      )

      if (!isAlreadyInCart) {
        // Add new product to cart
        const newCart = { product: product, quantity: 1 }
        currentCartProducts = [...prevCartProducts, newCart]
      } else {
        // Update existing product to cart
        currentCartProducts = prevCartProducts?.map((cart: any) => {
          if (cart.product.id !== product.id) return cart
          if (type === 'add') return { product, quantity: cart.quantity + 1 }
          if (type === 'subtract') {
            if (cart.quantity === 1) return
            return { product, quantity: cart.quantity - 1 }
          }
          if (type === 'value') {
            if (value) {
              return { product, quantity: Number(value) }
            } else return 1
          }
        })
      }

      await firestore()
        .collection('carts')
        .doc(email)
        .set({ products: currentCartProducts, email })

      return { products: currentCartProducts, email }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteCart = createAsyncThunk<
  Partial<Carts> | any,
  Partial<Product>
>('deleteCart', async (product, { getState, rejectWithValue }) => {
  // State destructure ...
  const state: any = getState()
  const {
    auth: {
      currentUser: { email },
    },
    carts: { products: prevCartProducts },
  } = state

  try {
    let currentCartProducts: any = []

    if (prevCartProducts.length) {
      currentCartProducts = prevCartProducts?.filter(
        (cart: any) => cart.product.id !== product.id,
      )
    }

    await firestore()
      .collection('carts')
      .doc(email)
      .set({ products: currentCartProducts, email })

    return { products: currentCartProducts, email }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const deleteMultipleCart = createAsyncThunk<
  Partial<Carts> | any,
  { product: Product; quantity: number }[]
>('deleteMultipleCart', async (products, { getState, rejectWithValue }) => {
  // State destructure ...
  const state: any = getState()
  const {
    auth: {
      currentUser: { email },
    },
    carts: { products: prevCartProducts },
  } = state

  try {
    let currentCartProducts: any = prevCartProducts
    // Filtering array with array
    products.map(p => {
      currentCartProducts = currentCartProducts?.filter(
        (cart: any) => cart.product.id !== p.product.id,
      )
    })

    await firestore()
      .collection('carts')
      .doc(email)
      .set({ products: currentCartProducts, email })

    return { products: currentCartProducts, email }
  } catch (error) {
    return rejectWithValue(error)
  }
})

const cartsSlice = createSlice({
  name: 'carts',
  initialState: cartsState,
  reducers: {},
  extraReducers: builder => {
    builder

      .addCase(getUserCarts.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.email = payload.email
        state.cartLoading = false
        state.cartError = null
      })
      .addCase(getUserCarts.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(getUserCarts.rejected, (state, { error }) => {
        state.cartLoading = false
        state.cartError = String(error)
      })

      .addCase(updateCart.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.email = payload.email
        state.cartLoading = false
        state.cartError = null
      })
      .addCase(updateCart.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(updateCart.rejected, (state, { error }) => {
        state.cartError = String(error)
        state.cartLoading = false
      })

      .addCase(deleteCart.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.email = payload.email
        state.cartLoading = false
        state.cartError = null
      })
      .addCase(deleteCart.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(deleteCart.rejected, (state, { error }) => {
        state.cartError = String(error)
        state.cartLoading = false
      })

      .addCase(deleteMultipleCart.fulfilled, (state, { payload }) => {
        state.products = payload.products
        state.email = payload.email
        state.cartLoading = false
        state.cartError = null
      })
      .addCase(deleteMultipleCart.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(deleteMultipleCart.rejected, (state, { error }) => {
        state.cartError = String(error)
        state.cartLoading = false
      })
  },
})

export default cartsSlice.reducer
