/* eslint-disable curly */
import { useTheme } from '@/Hooks'
import {
  navigate,
  navigateAndSimpleReset,
  RootStackParamList,
} from '@/Navigators/utils'
import { postToCollection } from '@/Services/firebase'
import { AppDispatch } from '@/Store'
import { deleteMultipleCart } from '@/Store/Carts'
import { getDiscountPrice, getIndonesianPrice } from '@/Utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { ScrollView, Alert, Image, StyleSheet, Text, View } from 'react-native'
import {
  ActivityIndicator,
  Button,
  Caption,
  Divider,
  Title,
} from 'react-native-paper'
import { useDispatch } from 'react-redux'

type Props = NativeStackScreenProps<RootStackParamList, 'InvoicePage'>

const InvoiceScreen = ({ route: { params }, navigation }: Props) => {
  const { products, totalPrice } = params
  const { Colors, Gutters } = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function handleSubmitOrder() {
      try {
        await dispatch(deleteMultipleCart(products))
        await postToCollection('orders', params)
      } catch (error) {
        Alert.alert('Something error', 'Please try again')
        navigation.goBack()
      }
    }
    handleSubmitOrder()
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <ActivityIndicator style={styles.Loading} />

  return (
    <ScrollView style={styles.Container}>
      <Title style={styles.Title}>Total Order :</Title>
      <Title
        style={[styles.Title, styles.TotalOrder, { color: Colors.primary }]}
      >
        {getIndonesianPrice(totalPrice)}
      </Title>
      <Title style={styles.Title}>Products :</Title>
      {products?.map(({ product, quantity }, index) => (
        <View style={styles.DetailsContainer} key={index}>
          <Image
            source={{
              uri: product.images[0].imageURL || 'https://picsum.photos/80/80',
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
            <Text>
              {getIndonesianPrice(
                getDiscountPrice(
                  Number(product.price),
                  Number(product.discount),
                ),
              )}
            </Text>
            <Text style={{ color: Colors.primary }}>
              {quantity}x -{' '}
              {getIndonesianPrice(
                quantity *
                  getDiscountPrice(
                    Number(product.price),
                    Number(product.discount),
                  ),
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
      ))}
      <Divider />

      <Button
        icon="basket"
        mode="contained"
        onPress={() => navigate('Orders')}
        style={[styles.Button, styles.Up, Gutters.smallVPadding]}
        color={Colors.primary}
      >
        Go to Orders page
      </Button>

      <Button
        icon="home"
        mode="contained"
        onPress={() => navigateAndSimpleReset('HomePage')}
        style={[styles.Button, styles.Down, Gutters.smallVPadding]}
        color={Colors.primary}
      >
        Back to Homepage
      </Button>
      <Divider />
    </ScrollView>
  )
}

export default InvoiceScreen

const styles = StyleSheet.create({
  Loading: {
    flex: 1,
  },
  Container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  Title: {
    paddingTop: 20,
    textAlign: 'center',
  },
  TotalOrder: {
    fontSize: 33,
    lineHeight: 38,
  },
  DetailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  DiscountLabel: {
    position: 'absolute',
    right: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 84, 17, .25)',
    alignItems: 'center',
  },
  Button: {
    width: '80%',
    alignSelf: 'center',
  },
  Up: {
    marginTop: 20,
    marginBottom: 10,
  },
  Down: {
    marginBottom: 20,
  },
})
