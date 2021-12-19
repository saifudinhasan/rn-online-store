import { useTheme } from '@/Hooks'
import { IProduct } from '@/Interfaces'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Title } from 'react-native-paper'
import { ProductCard } from '@/Components'

const ProductsSection = ({ products }: { products: IProduct[] | any }) => {
  const { Gutters, Colors } = useTheme()

  const renderItem = ({ item, index }: { item: IProduct; index: number }) => (
    <ProductCard item={item} index={index} />
  )

  const ItemSeparatorComponent = () => <View style={styles.Separator} />

  return (
    <View style={[Gutters.smallHPadding]}>
      <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
        Top Products
      </Title>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.name.toString()}
        numColumns={2}
        ItemSeparatorComponent={ItemSeparatorComponent}
        scrollEnabled={true}
      />
    </View>
  )
}

export default ProductsSection

const styles = StyleSheet.create({
  Separator: { height: 10 },
})
