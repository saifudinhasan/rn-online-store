import { useTheme } from '@/Hooks'
import useCategories from '@/Hooks/useCategories'
import { Category } from '@/Interfaces'
import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { Title } from 'react-native-paper'
import { CategoryCard } from '.'

const Categories = () => {
  const { Gutters, Colors } = useTheme()
  const { categories } = useCategories()

  useEffect(() => {
    console.log(categories)
  }, [categories])

  // const categoriesSkeletons = [
  //   {
  //     name: 'Pakaian Pria',
  //     image: 'url',
  //   },
  //   {
  //     name: 'Pakaian Wanita',
  //     image: 'url',
  //   },
  //   {
  //     name: 'Mainan Anak',
  //     image: 'url',
  //   },
  //   {
  //     name: 'Kesehatan',
  //     image: 'url',
  //   },
  // ]

  const renderItem = ({ item }: { item: Category }): JSX.Element => (
    <CategoryCard category={item} />
  )

  return (
    <View style={[Gutters.smallHPadding]}>
      <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
        Categories
      </Title>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Categories

// const styles = StyleSheet.create({
//   Title: {
//     marginTop: 10,
//   }
// })
