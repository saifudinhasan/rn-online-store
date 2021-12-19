/* eslint-disable curly */
import { useTheme, useCarts } from '@/Hooks'
import { deleteCart, updateCart } from '@/Store/Carts'
import { getDiscountPrice, getIndonesianPrice } from '@/Utils'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Caption, Checkbox } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Store'
import { IProduct } from '@/Interfaces'

const CartList = ({
  product,
  quantity,
  setSelectedCarts,
  checkedAll,
  selectedCarts,
}: {
  product: IProduct
  quantity: number
  selectedCarts: any
  checkedAll: any
  setSelectedCarts: any
}) => {
  const [checked, setChecked] = useState(false)
  const { Colors } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const { cartLoading } = useCarts()
  const inputRef: any = useRef(null)

  const isAlreadyInTheCart = () =>
    selectedCarts.find((cart: any) => cart.product.id === product.id)

  useEffect(() => {
    if (isAlreadyInTheCart()) {
      setChecked(true)
    } else {
      setChecked(checkedAll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedAll])

  const handleSelectCart = () => {
    setChecked(prev => !prev)
    if (!checked) {
      setSelectedCarts((prevCarts: any) => [
        ...prevCarts,
        { product, quantity },
      ])
    } else {
      setSelectedCarts((prevCarts: any) =>
        prevCarts.filter((cart: any) => cart.product.id !== product.id),
      )
    }
  }

  const handleUpdateCartList = async (
    type: 'add' | 'subtract' | 'value',
    value?: number,
  ) => {
    setSelectedCarts((prevCarts: any) =>
      prevCarts.map((cart: any) => {
        if (cart.product.id !== product.id) return cart
        switch (type) {
          case 'add':
            return {
              product,
              quantity: quantity + 1,
            }
          case 'subtract':
            if (quantity === 1) return cart
            return {
              product,
              quantity: quantity - 1,
            }
          case 'value':
            if (Number(value) > 0)
              return {
                product,
                quantity: value,
              }
            return cart
        }
      }),
    )

    await dispatch(updateCart({ product, type, value }))
  }

  const handleDeleteCartList = async () => {
    await dispatch(deleteCart(product))
    setSelectedCarts((prevCarts: any) =>
      prevCarts.filter((cart: any) => cart.product.id !== product.id),
    )
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedValue = useCallback(
    debounce(value => handleUpdateCartList('value', value), 300),
    [],
  )

  return (
    <View style={styles.CartListContainer}>
      <View style={styles.DetailsContainer}>
        <TouchableOpacity onPress={handleSelectCart}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            key={product.id}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: product.images && product?.images[0]?.imageURL,
          }}
          style={styles.Image}
        />
        <View>
          <Text>{product.name}</Text>
          {product?.discount > 0 && (
            <Caption style={styles.Discount}>
              {getIndonesianPrice(Number(product.price))}
            </Caption>
          )}
          <Text style={{ color: Colors.primary }}>
            {getIndonesianPrice(
              getDiscountPrice(Number(product.price), Number(product.discount)),
            )}
          </Text>
        </View>
        {product.discount > 0 && (
          <View style={styles.DiscountLabel}>
            <Text style={[{ color: Colors.primary }]}>
              {product?.discount}%
            </Text>
            <Text style={[{ color: Colors.primary }]}>Off</Text>
          </View>
        )}
      </View>

      <View style={styles.ActionButtons}>
        <TouchableOpacity
          onPress={() => handleUpdateCartList('add')}
          disabled={cartLoading}
        >
          <MaterialCommunityIcons
            name="plus"
            size={30}
            style={[styles.PlusButton, { color: Colors.primary }]}
          />
        </TouchableOpacity>

        <TextInput
          placeholder={String(quantity)}
          placeholderTextColor={Colors.primary}
          style={[styles.Input, { color: Colors.primary }]}
          onChangeText={text => {
            if (text.length === 0 || !text) return
            if (!Number(text)) return inputRef?.current.clear()
            if (Number(text) < 1 || Number(text) > 999)
              return inputRef?.current.clear()
            debouncedValue(Number(text))
          }}
          keyboardType="numeric"
          multiline={false}
          ref={inputRef}
          // editable={!cartLoading}
        />

        <TouchableOpacity
          onPress={() => handleUpdateCartList('subtract')}
          disabled={cartLoading}
        >
          <MaterialCommunityIcons
            name="minus"
            size={30}
            style={[styles.MinusButton, { color: Colors.primary }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeleteCartList} disabled={cartLoading}>
          <MaterialCommunityIcons
            name="delete"
            size={24}
            style={[styles.MinusButton, { color: Colors.primary }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CartList

const styles = StyleSheet.create({
  CartListContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  DetailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  Image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  Discount: {
    textDecorationLine: 'line-through',
  },
  ActionButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
  },
  DiscountLabel: {
    position: 'absolute',
    right: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 84, 17, .25)',
    alignItems: 'center',
  },

  PlusButton: {
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    width: 40,
    textAlign: 'center',
  },
  Input: {
    width: 40,
    textAlign: 'center',
  },
  MinusButton: {
    textAlign: 'center',
    width: 40,
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
  },
})
