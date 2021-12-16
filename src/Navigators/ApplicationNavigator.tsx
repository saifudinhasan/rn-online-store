import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import useAuth from '@/Hooks/useAuth'
import {
  authenticatedScreens,
  mainScreens,
  unAuthenticatedScreens,
} from './screens'

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
          {mainScreens.map(({ name, component, options }, index) => (
            <Stack.Screen
              name={name}
              component={component}
              options={options}
              key={index}
            />
          ))}

          {authenticated
            ? authenticatedScreens.map(
                ({ name, component, options }, index) => (
                  <Stack.Screen
                    name={name}
                    component={component}
                    options={options}
                    key={index}
                  />
                ),
              )
            : unAuthenticatedScreens.map(
                ({ name, component, options }, index) => (
                  <Stack.Screen
                    name={name}
                    component={component}
                    options={options}
                    key={index}
                  />
                ),
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
