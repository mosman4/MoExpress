import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function Orders({ navigation }) {
  
  const orders = useSelector((state) => state.orders);
  console.log(orders)
  function renderFunction(itemData) {
    const item = itemData.item;
    let pluralText = "Item";
    if (item.orderItems.length>1){
      pluralText="Items"
    }   
    return (
      <Pressable style={({pressed})=> pressed? [styles.card,styles.pressed]:styles.card} onPress={() => navigation.navigate("OrdersCart", { itemList: item.orderItems })}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <View >
        <Ionicons name="cube-sharp" size={35} style={{marginLeft:5}} color={"#253540"} />
        <Text style={{fontFamily:"AirbnbFont"}}>{item.orderItems.length} {pluralText}</Text>
        </View>
        <View style={{justifyContent:"center"}}>
        <Text style={{ textAlign: "center",fontWeight:"600",fontSize:15,color:"#384D5B"}}>{item.orderDate}</Text>
        </View>
        </View>
      </Pressable>
    );
  }
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={orders}
      renderItem={renderFunction}
    />
  );
}

const styles = StyleSheet.create({
  card:{
    marginTop:15,
    marginHorizontal:15,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    padding:15
  },
  pressed:{
    opacity:0.50
  }
})