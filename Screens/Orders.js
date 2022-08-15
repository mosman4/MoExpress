import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Orders({navigation}) {
    let x = 0;
    const orders = useSelector((state) => state.orders)
    function renderFunction(itemData){
        const item = itemData.item;
        // console.log(item.orderItems)
        x++;
        return(
            <Pressable style={{margin:10}} onPress={()=> navigation.navigate("OrdersCart",{itemList:item.orderItems})}>
                <Text style={{textAlign:"center"}}>Order {x}</Text>
            </Pressable>
        )
    }
  return (
    <View style={{flex:1,justifyContent:"center",alignContent:"center"}}>
    <FlatList keyExtractor={(item) => item.id} data={orders} renderItem={renderFunction}/>
    </View>
  )
}