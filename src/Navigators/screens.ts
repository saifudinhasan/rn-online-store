import { HomeContainer } from '@/Containers'
import {
  CartsScreen,
  InvoiceScreen,
  LoginScreen,
  ProductDetailsScreen,
  SearchScreen,
  SignupScreen,
  StartupScreen,
} from '@/Screens'
import { StackNavigationOptions } from '@react-navigation/stack'
import { ComponentType } from 'react'

export interface IScreen {
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
    component: StartupScreen,
  },
  {
    name: 'HomePage',
    component: HomeContainer,
    options: {
      animationEnabled: false,
    },
  },
  {
    name: 'ProductDetailPage',
    component: ProductDetailsScreen,
    options: { headerShown: false },
  },
  {
    name: 'SearchPage',
    component: SearchScreen,
    options: { headerShown: true },
  },
]

/**
 * List of screens / containers that need authentication is true
 */
export const authenticatedScreens: IScreen[] = [
  {
    name: 'CartPage',
    component: CartsScreen,
    options: { headerShown: true },
  },
  {
    name: 'InvoicePage',
    component: InvoiceScreen,
    options: { headerShown: false },
  },
]

/**
 * List of screens / containers that need authentication is false
 */
export const unAuthenticatedScreens = [
  {
    name: 'LoginPage',
    component: LoginScreen,
    options: { headerShown: true },
  },
  {
    name: 'SignupPage',
    component: SignupScreen,
    options: { headerShown: true },
  },
]
