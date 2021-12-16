import {
  CartContainer,
  LoginContainer,
  ProductDetailsContainer,
  SearchContainer,
  SignupContainer,
  StartupContainer,
} from '@/Containers'
import InvoiceContainer from '@/Containers/InvoiceContainer'
import { StackNavigationOptions } from '@react-navigation/stack'
import { ComponentType } from 'react'
import HomeNavigator from './HomeBottomNavigator'

interface IScreen {
  name: string
  component: ComponentType<any>
  options?: StackNavigationOptions
}

/**
 * List of screens / containers that doesn't need authentication checking
 */
export const mainScreens: IScreen[] = [
  {
    name: 'Startup',
    component: StartupContainer,
  },
  {
    name: 'HomePage',
    component: HomeNavigator,
    options: {
      animationEnabled: false,
    },
  },
  {
    name: 'ProductDetailPage',
    component: ProductDetailsContainer,
    options: { headerShown: false },
  },
  {
    name: 'SearchPage',
    component: SearchContainer,
    options: { headerShown: true },
  },
]

/**
 * List of screens / containers that need authentication is true
 */
export const authenticatedScreens: IScreen[] = [
  {
    name: 'CartPage',
    component: CartContainer,
    options: { headerShown: true },
  },
  {
    name: 'InvoicePage',
    component: InvoiceContainer,
    options: { headerShown: false },
  },
]

/**
 * List of screens / containers that need authentication is false
 */
export const unAuthenticatedScreens = [
  {
    name: 'LoginPage',
    component: LoginContainer,
    options: { headerShown: true },
  },
  {
    name: 'SignupPage',
    component: SignupContainer,
    options: { headerShown: true },
  },
]
