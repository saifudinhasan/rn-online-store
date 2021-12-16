import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, Middleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '@/Services/api'
import theme from './Theme'
import auth from './Auth'
import categories from './Categories'
import products from './Products'
import carts from './Carts'
import slideBanners from './SlideBanners'
import orders from './Orders'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { createBlacklistFilter } from 'redux-persist-transform-filter'

const reducers = combineReducers({
  theme,
  auth,
  categories, //
  products,
  carts,
  slideBanners, //
  orders,
})

const saveAuthSubsetBlacklistFilter = createBlacklistFilter('auth')
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //   whitelist: ['theme', 'auth', 'products', 'categories'],
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error: any) {
        console.log('Failed to encrypt', error)
      },
    }),
    saveAuthSubsetBlacklistFilter,
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware as Middleware)

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
