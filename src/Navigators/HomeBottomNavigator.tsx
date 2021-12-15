import React from 'react'
import {
  HomeContainer,
  LoginContainer,
  NotificationContainer,
  OrderContainer,
  ProfileContainer,
} from '@/Containers'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import useAuth from '@/Hooks/useAuth'

const Tab = createMaterialBottomTabNavigator()

// @refresh reset
const HomeNavigator = () => {
  const { authenticated } = useAuth()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
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
        component={!authenticated ? LoginContainer : OrderContainer}
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
        component={NotificationContainer}
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
        component={authenticated ? ProfileContainer : LoginContainer}
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

export default HomeNavigator
