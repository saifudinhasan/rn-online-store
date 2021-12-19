import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme, useAuth } from '@/Hooks'
import { navigationRef } from './utils'
import {
  authenticatedScreens,
  IScreen,
  mainScreens,
  unAuthenticatedScreens,
} from './screens'

const Stack = createStackNavigator()

const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const { authenticated } = useAuth()

  const renderScreen = (
    { name, component, options }: IScreen,
    index: number,
  ) => (
    <Stack.Screen
      name={name}
      component={component}
      options={options}
      key={index}
    />
  )

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {mainScreens.map(renderScreen)}
          {authenticated
            ? authenticatedScreens.map(renderScreen)
            : unAuthenticatedScreens.map(renderScreen)}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
