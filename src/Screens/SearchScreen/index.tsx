import { ProductCard } from '@/Components'
import { useTheme } from '@/Hooks'
import { IProduct } from '@/Interfaces'
import { RootStackParamList } from '@/Navigators/utils'
import { getCollection } from '@/Services/firebase'
import { useFocusEffect } from '@react-navigation/core'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useState } from 'react'
import { Alert, StyleSheet, View, FlatList } from 'react-native'
import { ActivityIndicator, Title } from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'SearchPage'>

const SearchScreen = ({
  route: {
    params: { query, category: categoryParam },
  },
}: Props) => {
  const { Gutters, Colors } = useTheme()
  const [searchProducts, setSearchProducts] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>()

  const getSearchProducts = async () => {
    setLoading(true)
    try {
      const _products = await getCollection('products')

      let results = []
      if (categoryParam) {
        results = _products.filter(product => {
          const regex = new RegExp(`${categoryParam}`, 'gi')
          return product.category?.match(regex)
        })
      } else {
        results = _products.filter(product => {
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
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      getSearchProducts()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  if (loading) {
    return <ActivityIndicator style={styles.Loading} />
  }

  const ItemSeparatorComponent = () => <View style={styles.Separator} />

  return (
    <>
      {searchProducts.length ? (
        <FlatList
          data={searchProducts}
          ListHeaderComponent={
            <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
              Search for {categoryParam || query} :
            </Title>
          }
          renderItem={({ item, index }: { item: IProduct; index: number }) => (
            <ProductCard item={item} index={index} />
          )}
          keyExtractor={item => item.name.toString()}
          numColumns={2}
          ItemSeparatorComponent={ItemSeparatorComponent}
          scrollEnabled={true}
          contentContainerStyle={styles.ProductContainer}
        />
      ) : (
        <View style={styles.ProductContainer}>
          <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
            Search for {categoryParam || query} :
          </Title>
          <Title>Product Not found</Title>
        </View>
      )}

      {error &&
        Alert.alert('Something Error', 'Please refresh the page', [
          {
            text: 'Reload',
            onPress: async () => getSearchProducts(),
            style: 'destructive',
          },
        ])}
    </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  Loading: { flex: 1 },
  ProductContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  Separator: { height: 10 },
})
