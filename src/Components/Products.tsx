import { useTheme } from '@/Hooks'
import useProducts from '@/Hooks/useProducts'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import { ProductCard } from '.'

const Products = () => {
  const { Gutters, Colors } = useTheme()

  const { products } = useProducts()

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
