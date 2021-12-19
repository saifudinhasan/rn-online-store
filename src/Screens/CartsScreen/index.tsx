/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import CartList from './Components/CartList'
import { Button, Checkbox, Divider, Text } from 'react-native-paper'
import { getDiscountPrice, getIndonesianPrice } from '@/Utils'
import { useTheme, useCarts, useAuth } from '@/Hooks'
import { navigate } from '@/Navigators/utils'
import { ICart } from '@/Interfaces'

const CartScreen = () => {
  const { products } = useCarts()
  const [selectedCarts, setSelectedCarts] = useState<any[]>([])
  const { Colors } = useTheme()
  const [checkedAll, setCheckedAll] = useState(false)
  const { currentUser } = useAuth()

  const handleSelectAll = () => {
    setCheckedAll(prev => !prev)
    if (!checkedAll) {
      setSelectedCarts(
        products.map(({ product, quantity }) => ({ product, quantity })),
      )
    } else {
      setSelectedCarts([])
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      if (selectedCarts.length === products.length) setCheckedAll(true)
      else setCheckedAll(false)
    }
  }, [selectedCarts])

  const totalPrice = () =>
    selectedCarts.reduce(
      (prevValue: any, cart: any) =>
        prevValue +
        getDiscountPrice(cart.product.price, cart.product.discount) *
          cart.quantity,
      0,
    )

  const handleInvoice = async () => {
    if (!selectedCarts.length)
      return Alert.alert(
        'Please select the product',
        'Select minimal 1 product to make an order',
      )
    navigate('InvoicePage', {
      products: selectedCarts,
      email: currentUser?.email,
      totalPrice: totalPrice(),
    })
  }

  return (
    <>
      <FlatList
        data={products}
        keyExtractor={item => item.product.id.toString()}
        renderItem={({ item, index }: { item: ICart; index: number }) => (
          <CartList
            key={index}
            product={item.product}
            quantity={item.quantity}
            setSelectedCarts={setSelectedCarts}
            selectedCarts={selectedCarts}
            checkedAll={checkedAll}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
      <View style={styles.BottomTabsContainer}>
        <TouchableOpacity onPress={handleSelectAll}>
          <Checkbox status={checkedAll ? 'checked' : 'unchecked'} />
        </TouchableOpacity>

        <View style={styles.DetailsContainer}>
          <Text>Total Products: {selectedCarts.length || 0} products</Text>
          <Text style={[styles.TotalPrice, { color: Colors.primary }]}>
            Total Price: {getIndonesianPrice(totalPrice())}
          </Text>
        </View>

        <Button
          style={[styles.Button, { backgroundColor: Colors.primary }]}
          color={Colors.white}
          onPress={handleInvoice}
        >
          Checkout
        </Button>
      </View>
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  Container: {},
  BottomTabsContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  DetailsContainer: {
    marginHorizontal: 10,
  },
  TotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  Button: {
    flex: 1,
  },
})
