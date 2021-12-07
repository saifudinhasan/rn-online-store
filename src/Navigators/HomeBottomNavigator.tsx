import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  // ExampleContainer,
  HomeContainer,
  NotificationContainer,
  OrderContainer,
  ProfileContainer,
} from '@/Containers'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
// import { Avatar } from 'react-native-paper'

// const Tab = createBottomTabNavigator()
const Tab = createMaterialBottomTabNavigator()

// @refresh reset
const HomeNavigator = () => {
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
        component={OrderContainer}
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
        component={ProfileContainer}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={24}
            />
            // <Avatar.Image
            //   size={24}
            //   // style={[Gutters.smallRMargin]}
            //   source={require('../Assets/Images/TOM.png')}
            // />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeNavigator
