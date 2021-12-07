import React from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'

const Carousel = () => {
  // Keep aspect ration to 1 x 3 for carousel images
  const { width } = Dimensions.get('window');
  const ratio = 1 / 3
  const style = {
    width,
    height: width * ratio,
  }

  return (
    <Image
      source={require('../Assets/Images/TOM.png')}
      style={style}
      resizeMode="cover"
    />
  )
}

export default Carousel

const styles = StyleSheet.create({
  Image: {
    width: '100%',
    height: '40%',
  },
})

// resizeMode={'cover'}
//   style={{ width: '100%', height: 200 }}