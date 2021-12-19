import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import { useAuth } from '@/Hooks'
import {
  HomeScreen,
  LoginScreen,
  NotificationScreen,
  OrderScreen,
  ProfileScreen,
} from '@/Screens'

const Tab = createMaterialBottomTabNavigator()

// @refresh reset
const HomeContainer = () => {
  const { authenticated } = useAuth()

  return (
    <Tab.Navigator
    // barStyle={{ height: 120 }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={!authenticated ? LoginScreen : OrderScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'basket' : 'basket-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={authenticated ? ProfileScreen : LoginScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeContainer
