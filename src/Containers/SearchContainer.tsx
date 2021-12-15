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
    params: { query },
  },
}: Props) => {
  const { Gutters, Colors } = useTheme()
  const { products } = useProducts()
  const [searchProducts, setSearchProducts] = useState<any>(null)

  useEffect(() => {
    setTimeout(() => {
      const q = products.filter(product => {
        const regex = new RegExp(`${query}`, 'gi')
        return (
          product.name?.match(regex) ||
          product.category?.match(regex) ||
          product.description?.match(regex) ||
          product.variant?.match(regex)
        )
      })
      setSearchProducts(q)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!searchProducts) {
    return <ActivityIndicator style={styles.Loading} />
  }

  return (
    <ScrollView style={[Gutters.smallHPadding]}>
      <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
        Search for {query} :
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
