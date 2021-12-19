import { ISlideBanner } from '@/Interfaces'
import { WINDOW_WIDTH } from '@/Utils/getDimensions'
import React, { useRef, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

interface RenderImage {
  item: {
    imageURL: string
    imageFullPath: string
  }
  index: number
}

const SlideCarouselSection = ({
  slideBanners,
}: {
  slideBanners: ISlideBanner[] | any
}) => {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const carouselRef: any = useRef(null)

  const ImageView = ({ item, index }: RenderImage) => (
    <View style={styles.ImageContainer} key={index}>
      <Image
        source={{ uri: item.imageURL }}
        resizeMode="cover"
        style={styles.Image}
      />
    </View>
  )

  return (
    <View style={styles.CarouselContainer}>
      <Carousel
        ref={carouselRef}
        data={slideBanners}
        renderItem={ImageView}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        onSnapToItem={index => setCarouselIndex(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
      />
      <Pagination
        dotsLength={slideBanners.length}
        activeDotIndex={carouselIndex}
        carouselRef={carouselRef}
        dotStyle={styles.DotStyle}
        tappableDots={true}
        containerStyle={styles.Pagination}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
        dotContainerStyle={styles.DotContainerStyle}
      />
    </View>
  )
}

export default SlideCarouselSection

const styles = StyleSheet.create({
  CarouselContainer: { position: 'relative' },
  ImageContainer: { width: WINDOW_WIDTH },
  // Keep aspect ration to 1 x 3 for carousel images
  Image: { width: WINDOW_WIDTH, height: WINDOW_WIDTH / 3 },
  Pagination: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 15,
  },
  DotContainerStyle: {
    width: 5,
  },
  DotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
})
