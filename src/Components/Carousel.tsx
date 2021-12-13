import { WINDOW_WIDTH } from '@/Utils/getDimensions'
import React from 'react'
import { Image } from 'react-native'

const Carousel = () => {
  // Keep aspect ration to 1 x 3 for carousel images
  const ratio = 1 / 3
  const style = {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * ratio,
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
