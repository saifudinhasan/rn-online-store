import { Product } from '@/Interfaces/Product'
import React, { useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, Animated } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/Navigators/utils'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { WINDOW_WIDTH } from '@/Utils/getDimensions'
import { Caption, Divider, Headline, Title } from 'react-native-paper'
import { getIndonesianPrice, getDiscountPrice } from '@/Utils'
import { useTheme } from '@/Hooks'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProductDetailsHeader from '@/Components/ProductDetailsHeader'

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetailPage'>

interface RenderImage {
  item: {
    imageURL: string
    imageFullPath: string
  }
  index: number
}

const ProductDetailsContainer = ({ route: { params } }: Props) => {
  const { name, images, price, category, discount, description }: Product =
    params
  const carouselRef: any = useRef(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const { Gutters, Colors } = useTheme()

  const scrollY = useRef(new Animated.Value(0)).current

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
    <>
      <Animated.ScrollView
        style={styles.Container}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <View style={styles.CarouselContainer}>
          <Carousel
            ref={carouselRef}
            data={images}
            renderItem={ImageView}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={WINDOW_WIDTH}
            onSnapToItem={index => setCarouselIndex(index)}
          />
          <Pagination
            dotsLength={images.length}
            activeDotIndex={carouselIndex}
            carouselRef={carouselRef}
            dotStyle={styles.DotStyle}
            tappableDots={true}
            containerStyle={styles.Pagination}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View>

        <Divider />

        <View
          style={[
            Gutters.smallTPadding,
            Gutters.smallHPadding,
            styles.DetailsContainer,
          ]}
        >
          <Title style={styles.ProductName}>{name}</Title>
          <Caption style={styles.ProductCategory}>{category}</Caption>
          {discount === 0 ? (
            <Headline style={[{ color: Colors.primary }]}>
              {getIndonesianPrice(price)}
            </Headline>
          ) : (
            <>
              <Text style={styles.UndiscountPrice}>
                {getIndonesianPrice(price)}
              </Text>
              <Headline
                style={[{ color: Colors.primary }, styles.ProductPrice]}
              >
                {getIndonesianPrice(getDiscountPrice(price, discount))}
              </Headline>
              <View style={[styles.DiscountLabel]}>
                <Text
                  style={[styles.DiscountLabelText, { color: Colors.primary }]}
                >
                  {discount}%
                </Text>
                <Text
                  style={[styles.DiscountLabelText, { color: Colors.primary }]}
                >
                  Off
                </Text>
              </View>
            </>
          )}
        </View>
        <View
          style={[
            Gutters.largeBPadding,
            Gutters.smallHPadding,
            styles.DetailsContainer,
            styles.BottomPadding,
          ]}
        >
          <Caption>Description :</Caption>
          <Text>{description}</Text>
        </View>
        <Divider />
      </Animated.ScrollView>

      <View style={[styles.ActionButtons, { backgroundColor: Colors.primary }]}>
        <MaterialCommunityIcons
          name="chat"
          size={34}
          style={[styles.Button, styles.FirstButton]}
          onPress={() => {}}
        />
        <MaterialCommunityIcons
          name="cart"
          size={34}
          style={[styles.Button]}
          onPress={() => {}}
        />
        <View style={[styles.ButtonWide, { borderTopColor: Colors.primary }]}>
          <MaterialCommunityIcons
            name="basket"
            size={34}
            style={{ color: Colors.primary }}
            onPress={() => {}}
          />
          <Text style={[styles.ButtonWideText, { color: Colors.primary }]}>
            Buy Now
          </Text>
        </View>
      </View>

      <ProductDetailsHeader event={scrollY} name={name} />
    </>
  )
}

export default ProductDetailsContainer

const styles = StyleSheet.create({
  Container: { backgroundColor: '#fff' },
  CarouselContainer: { position: 'relative' },
  ImageContainer: { width: WINDOW_WIDTH },
  Image: { width: WINDOW_WIDTH, height: WINDOW_WIDTH },
  Pagination: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 15,
  },
  DotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  DetailsContainer: { flex: 1, position: 'relative' },
  BottomPadding: { paddingBottom: 65 },
  DiscountLabel: {
    position: 'absolute',
    alignItems: 'center',
    right: 10,
    top: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(255, 84, 17, .25)',
  },
  DiscountLabelText: { fontSize: 14, fontWeight: '900' },
  ProductName: {
    width: '90%',
    lineHeight: 26,
    marginBottom: 0,
  },
  ProductCategory: {
    lineHeight: 14,
    marginTop: 0,
  },
  UndiscountPrice: {
    textDecorationLine: 'line-through',

    color: '#333',
  },
  ProductPrice: {
    lineHeight: 26,
  },
  ActionButtons: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
  },
  Button: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
  },
  FirstButton: {
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  ButtonWide: {
    flex: 2,
    backgroundColor: '#fff',
    height: 55,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonWideText: {
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 18,
  },
})
