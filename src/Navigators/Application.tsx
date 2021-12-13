import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  CartContainer,
  LoginContainer,
  ProductDetailsContainer,
  SearchContainer,
  StartupContainer,
  SignupContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import HomeNavigator from './HomeBottomNavigator'
import useAuth from '@/Hooks/useAuth'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const { authenticated } = useAuth()

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />

          <Stack.Screen
            name="HomePage"
            component={HomeNavigator}
            options={{
              animationEnabled: false,
            }}
          />

          <Stack.Screen
            name="ProductDetailPage"
            component={ProductDetailsContainer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SearchPage"
            component={SearchContainer}
            options={{ headerShown: true }}
          />

          {authenticated ? (
            <>
              <Stack.Screen
                name="CartPage"
                component={CartContainer}
                options={{ headerShown: true }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LoginPage"
                component={LoginContainer}
                options={{ headerShown: true }}
              />

              <Stack.Screen
                name="SignupPage"
                component={SignupContainer}
                options={{ headerShown: true }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
