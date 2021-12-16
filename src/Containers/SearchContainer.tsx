import { ProductCard } from '@/Components'
import { useTheme } from '@/Hooks'
import useProducts from '@/Hooks/useProducts'
import { Product } from '@/Interfaces/Product'
import { RootStackParamList } from '@/Navigators/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Title } from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'SearchPage'>

const SearchContainer = ({
  route: {
    params: { query, category },
  },
}: Props) => {
  const { Gutters, Colors } = useTheme()
  const { products } = useProducts()
  const [searchProducts, setSearchProducts] = useState<any>(null)

  useEffect(() => {
    setTimeout(() => {
      let results = []
      if (category) {
        results = products.filter(product => {
          const regex = new RegExp(`${category}`, 'gi')
          return product.category?.match(regex)
        })
      } else {
        results = products.filter(product => {
          const regex = new RegExp(`${query}`, 'gi')
          return (
            product.name?.match(regex) ||
            product.category?.match(regex) ||
            product.description?.match(regex) ||
            product.variant?.match(regex)
          )
        })
      }
      setSearchProducts(results)
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!searchProducts) {
    return <ActivityIndicator style={styles.Loading} />
  }

  return (
    <ScrollView style={[Gutters.smallHPadding]}>
      <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
        Search for {category || query} :
      </Title>
      <View style={styles.ProductContainer}>
        {searchProducts?.length ? (
          searchProducts?.map((product: Product, index: number) => (
            <ProductCard key={index} item={product} index={index} />
          ))
        ) : (
          <Title>Product Not found</Title>
        )}
      </View>
    </ScrollView>
  )
}

export default SearchContainer

const styles = StyleSheet.create({
  Loading: { flex: 1 },
  ProductContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
