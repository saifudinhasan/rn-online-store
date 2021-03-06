import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { deleteCart, updateCart } from '@/Store/Carts'
import { useDispatch } from 'react-redux'
import { useTheme, useCarts, useAuth } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import { AppDispatch } from '@/Store'
import { IProduct } from '@/Interfaces'

const ProductDetailsBottomMenu = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { Colors } = useTheme()
  const { cartLoading } = useCarts()
  const { authenticated } = useAuth()

  return (
    <View
      style={[
        styles.ActionButtonsContainer,
        { backgroundColor: Colors.primary },
      ]}
    >
      <TouchableOpacity
        style={[styles.ButtonWrapper, styles.FirstButton]}
        onPress={async () => dispatch(deleteCart(product))}
        disabled={cartLoading}
      >
        <MaterialCommunityIcons style={[styles.Button]} name="chat" size={34} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ButtonWrapper]}
        onPress={async () => dispatch(updateCart({ product, type: 'add' }))}
        disabled={cartLoading}
      >
        <MaterialCommunityIcons name="cart" size={34} style={[styles.Button]} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ButtonWrapperRight, { borderTopColor: Colors.primary }]}
        onPress={() => {
          dispatch(updateCart({ product, type: 'add' }))
          navigate(authenticated ? 'CartPage' : 'LoginPage')
        }}
        disabled={cartLoading}
      >
        <MaterialCommunityIcons
          name="basket"
          size={34}
          style={{ color: Colors.primary }}
        />
        <Text style={[styles.ButtonWideText, { color: Colors.primary }]}>
          Buy Now
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProductDetailsBottomMenu

const styles = StyleSheet.create({
  ActionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
  },
  ButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  ButtonWrapperRight: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#fff',
    borderTopWidth: 1,
  },
  FirstButton: {
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  Button: {
    color: '#fff',
    textAlign: 'center',
  },
  ButtonWideText: {
    marginLeft: 10,
    fontWeight: '400',
    fontSize: 18,
  },
})
