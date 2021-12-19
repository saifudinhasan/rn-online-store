/* eslint-disable curly */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { IProduct, ICarts, ICart } from '@/Interfaces'

const cartsState: ICarts = {
  products: [],
  email: null,
  cartLoading: false,
  cartError: null,
}

interface ICartParams {
  product: Partial<IProduct>
  type: 'add' | 'subtract' | 'value'
  value?: number
}

export const getUserCarts = createAsyncThunk<ICarts | any>(
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

function getUpdatedCarts(
  addedProduct: Partial<IProduct>,
  carts: ICart[],
  type: 'add' | 'subtract' | 'value',
  value?: number,
) {
  // 1. check if product alredy exist in carts
  const isAlreadyInCart = carts.find(
    (cart: any) => cart.product.id === addedProduct.id,
  )

  if (!isAlreadyInCart) {
    // Add new product to cart
    return [...carts, { product: addedProduct, quantity: 1 }]
  } else {
    // Update existing product to cart
    return carts?.map((cart: any) => {
      if (cart.product.id !== addedProduct.id) return cart
      switch (type) {
        case 'add':
          return { product: addedProduct, quantity: cart.quantity + 1 }
        case 'subtract':
          return {
            product: addedProduct,
            quantity: cart.quantity === 1 ? 1 : cart.quantity - 1,
          }
        case 'value':
          return { product: addedProduct, quantity: Number(value) || 1 }
      }
    })
  }
}

export const updateCart = createAsyncThunk<Partial<ICarts> | any, ICartParams>(
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
      const updatedCarts = getUpdatedCarts(
        product,
        prevCartProducts,
        type,
        value,
      )

      await firestore()
        .collection('carts')
        .doc(email)
        .set({ products: updatedCarts, email })

      return { products: updatedCarts, email }
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const deleteCart = createAsyncThunk<
  Partial<ICarts> | any,
  Partial<IProduct>
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
  Partial<ICarts> | any,
  { product: IProduct; quantity: number }[]
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
    products.forEach(p => {
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
    const sharedFulfilled = (state: ICarts, { payload }: any) => {
      state.products = payload.products
      state.email = payload.email
      state.cartLoading = false
      state.cartError = null
    }

    builder

      .addCase(getUserCarts.fulfilled, sharedFulfilled)
      .addCase(updateCart.fulfilled, sharedFulfilled)
      .addCase(deleteCart.fulfilled, sharedFulfilled)
      .addCase(deleteMultipleCart.fulfilled, sharedFulfilled)

      .addCase(getUserCarts.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(getUserCarts.rejected, (state, { error }) => {
        state.cartLoading = false
        state.cartError = String(error)
      })

      .addCase(updateCart.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(updateCart.rejected, (state, { error }) => {
        state.cartError = String(error)
        state.cartLoading = false
      })

      .addCase(deleteCart.pending, state => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(deleteCart.rejected, (state, { error }) => {
        state.cartError = String(error)
        state.cartLoading = false
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
