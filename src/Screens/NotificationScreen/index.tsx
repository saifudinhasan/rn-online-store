import { useTheme } from '@/Hooks'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'

const NotificationScreen = () => {
  const { Images, Colors } = useTheme()

  return (
    <View style={styles.Container}>
      <Image
        style={styles.Image}
        resizeMode="contain"
        source={Images.construction}
      />
      <Title style={{ color: Colors.primary }}>
        This page is under construction!
      </Title>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  Image: {
    width: '80%',
  },
})
