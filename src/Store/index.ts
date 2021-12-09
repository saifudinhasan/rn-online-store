import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, Middleware } from 'redux'
import {
  persistReducer,
  persistStore,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '@/Services/api'
import * as modules from '@/Services/modules'
import theme from './Theme'
import auth from './Auth'
import categories from './Categories'
import products from './Products'

const reducers = combineReducers({
  theme,
  auth,
  categories,
  products,
  ...Object.values(modules).reduce(
    (acc, module) => ({
      ...acc,
      [module.reducerPath]: module.reducer,
    }),
    {},
  ),
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [
      //     FLUSH,
      //     REHYDRATE,
      //     PAUSE,
      //     PERSIST,
      //     PURGE,
      //     REGISTER,
      //     'login/rejected', // Firebase error exception only
      //     'getCategories/rejected', // Firebase error exception only
      //     'getCategories/pending', // Firebase error exception only
      //     'getCategories/fulfilled', // Firebase error exception only
      //     'getProducts/fulfilled', // Firebase error exception only
      //     'getProducts/pending', // Firebase error exception only
      //     'getProducts/rejected', // Firebase error exception only
      //     // 'categories.categories.0.timestamp', // Firebase error exception only
      //   ],
      //   ignoredActionPaths: ['categories.categories'],
      //   ignoredPaths: [
      //     'categories.categories.0.timestamp',
      //     'categories.categories.1.timestamp',
      //   ],
      // },
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
