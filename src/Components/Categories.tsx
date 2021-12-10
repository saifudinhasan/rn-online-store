import { useTheme } from '@/Hooks'
import useCategories from '@/Hooks/useCategories'
import { Category } from '@/Interfaces'
import React from 'react'
import { FlatList, View } from 'react-native'
import { Title } from 'react-native-paper'
import { CategoryCard } from '.'

const Categories = () => {
  const { Gutters, Colors } = useTheme()
  const { categories } = useCategories()

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
