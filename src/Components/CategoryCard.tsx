import { useTheme } from '@/Hooks'
import { Category } from '@/Interfaces'
import { navigate } from '@/Navigators/utils'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'

const CategoryCard = ({
  category: { imageURL, name },
}: {
  category: Category
}) => {
  const { Gutters, Colors } = useTheme()

  return (
    <TouchableOpacity onPress={() => navigate('SearchPage')}>
      <Card style={[Gutters.smallRMargin, styles.Card]} mode="elevated">
        <Card.Cover
          source={{ uri: imageURL }}
          resizeMode="cover"
          style={[styles.Image, { backgroundColor: Colors.white }]}
        />
        <View style={[Gutters.tinyVPadding]}>
          <Text numberOfLines={1} style={styles.Title}>
            {name}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  Card: {
    width: 100,
    elevation: 7,
  },
  Image: {
    height: 100,
  },
  Title: {
    fontSize: 10,
    fontWeight: '700',
    color: '#444',
    alignSelf: 'center',
  },
})
