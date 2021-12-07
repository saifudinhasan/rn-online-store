import { useTheme } from '@/Hooks'
import React from 'react'
import { FlatList, View } from 'react-native'
import { Title } from 'react-native-paper'
import { CategoryCard } from '.'

const Categories = () => {
  const { Gutters, Colors } = useTheme()

  const categories = [
    {
      name: 'Pakaian Pria',
      image: 'url',
    },
    {
      name: 'Pakaian Wanita',
      image: 'url',
    },
    {
      name: 'Mainan Anak',
      image: 'url',
    },
    {
      name: 'Kesehatan',
      image: 'url',
    },
  ]

  const renderItem = ({ item }) => <CategoryCard title={item.name} />

  return (
    <View style={[Gutters.smallHPadding]}>
      <Title style={[Gutters.smallVMargin, { color: Colors.primary }]}>
        Categories
      </Title>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.name}
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
