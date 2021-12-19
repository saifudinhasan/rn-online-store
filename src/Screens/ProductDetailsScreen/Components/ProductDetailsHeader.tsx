import { useTheme, useCarts, useAuth } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { TouchableOpacity, Animated, StyleSheet } from 'react-native'
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
  const { Colors } = useTheme()
  const { products } = useCarts()
  const { authenticated } = useAuth()
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

  const CartCountBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255, 255, 255, 0)', '#fff'],
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
        <TouchableOpacity
          style={styles.HeaderButtonWrapper}
          onPress={navigation.goBack}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            style={[styles.HeaderButton]}
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
        <TouchableOpacity
          style={styles.HeaderButtonWrapper}
          onPress={() => navigate(authenticated ? 'CartPage' : 'LoginPage')}
        >
          <MaterialCommunityIcons
            name="cart"
            size={22}
            style={[styles.HeaderButton]}
          />
          {authenticated && (
            <Animated.Text
              style={[
                styles.TotalCarts,
                {
                  color: Colors.primary,
                  opacity: TitleOpacity,
                  backgroundColor: CartCountBackgroundColor,
                },
              ]}
            >
              {products?.length || 0}
            </Animated.Text>
          )}
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
    position: 'relative',
  },
  HeaderButton: {
    color: '#fff',
    textAlign: 'center',
  },
  TotalCarts: {
    borderColor: 'salmon',
    position: 'absolute',
    top: -5,
    right: -2,
    borderWidth: 1,
    height: 18,
    width: 18,
    borderRadius: 9,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    fontSize: 10,
    lineHeight: 10,
    fontWeight: 'bold',
  },
})
