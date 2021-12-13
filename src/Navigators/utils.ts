/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import { Product } from '@/Interfaces/Product'
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'

// List semua navigasi disini beserta paramsnya, jika tidak perlu params: undefined
export type RootStackParamList = {
  Startup: undefined
  HomePage: undefined
  CartPage: undefined
  ProductDetailPage: Product
  SearchPage: undefined

  Profile: undefined

  LoginPage: undefined
  SignupPage: undefined
}

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    )
  }
}

export function navigateAndSimpleReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}
