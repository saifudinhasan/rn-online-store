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
    <View>
      <Title
        style={[
          Gutters.smallVMargin,
          Gutters.smallHPadding,
          { color: Colors.primary },
        ]}
      >
        Categories
      </Title>
      <FlatList
        style={[Gutters.smallHPadding]}
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Categories
