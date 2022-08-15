import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

export default function OrdersCart({route}) {
    const itemsList = route.params?.itemList
    const PRODUCTS = useSelector((state) => state.products)
    // console.log(itemsList)

    function renderFunction(itemData){
        const item = itemData.item;
        const product = PRODUCTS.find((p) => p.id == item.productId)
        return (
            <View>
                <Text>{product.title}</Text>
            </View>
        )
    }
  return (
    <FlatList keyExtractor={(item)=> item.productId} data={itemsList} renderItem={renderFunction}/>
  )
}