import { useTheme } from '@/Hooks'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Caption, Card } from 'react-native-paper'

const CategoryCard = ({ title }) => {
  const { Gutters } = useTheme()

  return (
    <TouchableOpacity>
      <Card style={[Gutters.smallRMargin, styles.Card]} mode="elevated">
        <Card.Cover
          source={{ uri: 'https://picsum.photos/100' }}
          resizeMode="cover"
          style={styles.Image}
        />
        <View style={[Gutters.tinyVPadding]}>
          <Text numberOfLines={1} style={styles.Title}>
            {title}
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
