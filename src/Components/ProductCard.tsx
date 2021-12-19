import React from 'react'
import { useTheme } from '@/Hooks'
import { IProduct } from '@/Interfaces'
import { navigate } from '@/Navigators/utils'
import { getDiscountPrice, getIndonesianPrice } from '@/Utils'
import { WINDOW_WIDTH } from '@/Utils/getDimensions'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-paper'

const ProductCard = ({ item, index }: { item: IProduct; index: number }) => {
  const { Gutters, MetricsSizes, Colors } = useTheme()

  const { name, price, images, discount } = item

  const imageHeight = () => (WINDOW_WIDTH - 3 * Number(MetricsSizes.small)) / 2

  return (
    <TouchableOpacity
      onPress={() => navigate('ProductDetailPage', item)}
      style={[styles.Card, index % 2 === 0 && Gutters.smallRMargin]}
    >
      <Card>
        <Card.Cover
          source={{ uri: images[0].imageURL }}
          resizeMode="cover"
          // Keep aspect ratio to 1 : 1
          style={[styles.Image, { height: imageHeight() }]}
        />

        <View
          style={[
            Gutters.tinyVPadding,
            Gutters.tinyHPadding,
            styles.DetailContainer,
          ]}
        >
          <Text numberOfLines={1} style={styles.Name}>
            {name}
          </Text>
          {discount === 0 ? (
            <Text
              numberOfLines={1}
              style={[styles.Price, { color: Colors.primary }]}
            >
              {getIndonesianPrice(price)}
            </Text>
          ) : (
            <>
              <Text numberOfLines={1} style={[styles.Price, styles.Undiscount]}>
                {getIndonesianPrice(price)}
              </Text>
              <Text
                numberOfLines={1}
                style={[styles.Price, { color: Colors.primary }]}
              >
                {getIndonesianPrice(getDiscountPrice(price, discount))}
              </Text>
              <View style={[styles.DiscountLabel]}>
                <Text
                  style={[styles.DiscountLabelText, { color: Colors.primary }]}
                >
                  {discount}% Off
                </Text>
              </View>
            </>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  Card: {
    elevation: 7,
    flex: 1 / 2,
  },
  Image: {},
  DetailContainer: {
    height: 60,
    justifyContent: 'space-evenly',
    position: 'relative',
  },
  Name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#333',
  },
  Price: {
    fontWeight: '700',
  },
  Undiscount: {
    color: '#555',
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  DiscountLabel: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 84, 17, .25)',
  },
  DiscountLabelText: {
    fontSize: 11,
    fontWeight: '900',
  },
})
