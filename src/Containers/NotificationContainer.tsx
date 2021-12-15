import { useTheme } from '@/Hooks'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Title } from 'react-native-paper'

const NotificationContainer = () => {
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

export default NotificationContainer

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  Image: {
    width: '80%',
  },
})
