import { useTheme, useAuth } from '@/Hooks'
import { IOrder } from '@/Interfaces'
import { getCollectionWithQuery } from '@/Services/firebase/'
import { getIndonesianPrice } from '@/Utils'
import { useFocusEffect } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Title } from 'react-native-paper'

const OrderContainer = () => {
  const { Colors } = useTheme()

  const [orders, setOrders] = useState<IOrder[] | []>([])

  const { currentUser } = useAuth()

  const getOrders = async () => {
    if (currentUser?.email) {
      setOrders(
        await getCollectionWithQuery(
          'orders',
          'email',
          '==',
          currentUser.email,
        ),
      )
    } else {
      setOrders([])
    }
  }

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getOrders()

      return () => unsubscribe
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return (
    <ScrollView style={styles.Container}>
      {orders.length ? (
        <>
          <Text style={styles.Title}>
            Orders list of user {orders[0].email}
          </Text>
          {orders.map((order, index) => (
            <View
              style={[styles.OrderList, index === 0 && styles.First]}
              key={index}
            >
              <Image
                style={styles.Image}
                source={{ uri: order.products[0].product.images[0].imageURL }}
              />
              <View>
                <Text>{order.products.length} Products</Text>
                <Text style={[{ color: Colors.primary }, styles.Price]}>
                  {getIndonesianPrice(order.totalPrice)}
                </Text>
              </View>
            </View>
          ))}
        </>
      ) : (
        <Title style={styles.Empty}>Orders Empty</Title>
      )}
    </ScrollView>
  )
}

export default OrderContainer

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
  },
  Title: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  Empty: {
    textAlign: 'center',
    flex: 1,
  },
  OrderList: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  First: {
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  Image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  Price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
