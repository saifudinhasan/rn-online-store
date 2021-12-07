import { useTheme } from '@/Hooks'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import { ProductCard } from '.'

const Products = () => {
  const { Gutters, Colors } = useTheme()

  const products = [
    {
      name: 'Product test',
      price: 100000,
    },
    {
      name: 'Product test 2',
      price: 200000,
    },
    {
      name: 'Product test 3',
      price: 5000,
    },
    {
      name: 'Product test 4',
      price: 5000,
    },
    {
      name: 'Product test 5',
      price: 5000,
    },
    {
      name: 'Product test 6',
      price: 5000,
    },
    {
      name: 'Product test 7',
      price: 5000,
    },
    {
      name: 'Product test 8',
      price: 5000,
    },
    {
      name: 'Product test 9',
      price: 5000,
    },
    {
      name: 'Product test 10',
      price: 5000,
    },
    {
      name: 'Product test 11',
      price: 5000,
    },
    {
      name: 'Product test 12',
      price: 5000,
    },
  ]

  // const renderItem = ({ item, index }: productCard) => (
  //   <ProductCard item={item} index={index} />
  // )

  return (
    <View style={[Gutters.smallHPadding]}>
      <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
        Top Products
      </Title>
      {/* We can't use FlatList inside ScrollView */}
      {/* <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.name.toString()}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      /> */}
      <View style={styles.ProductContainer}>
        {products.map((product, index) => (
          <ProductCard key={index} item={product} index={index} />
        ))}
      </View>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  ProductContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
