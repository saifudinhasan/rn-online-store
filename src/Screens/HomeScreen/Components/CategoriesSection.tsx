import React from 'react'
import { useTheme } from '@/Hooks'
import { ICategory } from '@/Interfaces'
import { FlatList, View } from 'react-native'
import { Title } from 'react-native-paper'
import { CategoryCard } from '@/Components'

const CategoriesSection = ({
  categories,
}: {
  categories: ICategory[] | any
}) => {
  const { Gutters, Colors } = useTheme()

  const renderItem = ({ item }: { item: ICategory }): JSX.Element => (
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
        contentContainerStyle={[Gutters.smallHPadding]}
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default CategoriesSection
