import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const ProductDetailsHeader = ({
  name,
  event,
}: {
  name: string
  event: Animated.Value
}) => {
  const scrollY = event

  const navigation = useNavigation()

  const TitleOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255, 255, 255, 0)', '#ff7640'],
    extrapolate: 'clamp',
  })

  const headerButtonColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(0, 0, 0, .1)', 'rgba(255, 255, 255, 0)'],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View
      style={[
        styles.HeaderContainer,
        {
          backgroundColor: headerBackgroundColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.HeaderButtonWrapper,
          { backgroundColor: headerButtonColor },
        ]}
      >
        <TouchableOpacity style={styles.HeaderButtonWrapper}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            style={[styles.HeaderButton]}
            onPress={navigation.goBack}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[styles.HeaderTitleWrapper, { opacity: TitleOpacity }]}
      >
        <Title numberOfLines={1} style={[styles.HeaderTitle]}>
          {name}
        </Title>
      </Animated.View>

      <Animated.View
        style={[
          styles.HeaderButtonWrapper,
          { backgroundColor: headerButtonColor },
        ]}
      >
        <TouchableOpacity style={styles.HeaderButtonWrapper}>
          <MaterialCommunityIcons
            name="cart"
            size={22}
            style={[styles.HeaderButton]}
            onPress={() => {}}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

export default ProductDetailsHeader

const styles = StyleSheet.create({
  HeaderContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,
    // elevation: 12,
  },
  HeaderTitleWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  HeaderTitle: {
    color: '#fff',
  },
  HeaderButtonWrapper: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  HeaderButton: {
    color: '#fff',
    textAlign: 'center',
  },
})
