import { useTheme } from '@/Hooks'
import { productCard } from '@/Interfaces'
import { getIndonesianPrice } from '@/Utils'
import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Card } from 'react-native-paper'

const ProductCard = ({ item: { name, price }, index }: productCard) => {
  const { Gutters, MetricsSizes, Colors } = useTheme()

  const { width } = Dimensions.get('window')

  // Width hack : width - 10 for padding right and left, 10 for middle gap
  const cardWidth = () => (width - 3 * Number(MetricsSizes.small)) / 2

  return (
    // We can't use FlatList inside ScrollView
    <TouchableOpacity
      style={[
        styles.Card,
        index % 2 === 0 && Gutters.smallRMargin,
        { width: cardWidth() },
      ]}
    >
      <Card>
        <Card.Cover
          source={{ uri: 'https://picsum.photos/100' }}
          resizeMode="cover"
          // Keep aspect ratio to 1 : 1
          style={[styles.Image, { height: cardWidth() }]}
        />

        <View style={[Gutters.tinyVPadding, Gutters.tinyHPadding]}>
          <Text numberOfLines={1} style={styles.Name}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.Price, { color: Colors.primary }]}
          >
            {getIndonesianPrice(price)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  Card: {
    elevation: 7,
    marginBottom: 10,
  },
  Image: {},
  DetailContainer: {},
  Name: {
    fontWeight: '700',
    color: '#333',
  },
  Price: {
    fontWeight: '700',
  },
})
