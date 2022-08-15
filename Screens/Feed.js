import { View, Text,StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { FEED, PRODUCTS } from '../data/dummy-data';
import { useSelector } from "react-redux";
import Card from '../components/UI/Card';
import { useNavigation } from '@react-navigation/native';
export default function Feed() {
  const navigation = useNavigation();
  const PRODUCTSONLINE = useSelector((state) => state.products)
  
  const selectedItems = PRODUCTSONLINE.filter((item) => {
    return item.categoryIds.includes("c0") || item.discount != null;
  })
  
  const d = PRODUCTSONLINE.map((item) => item.discount)
  console.log(d)

  const selectedItems1 = PRODUCTS.filter((item) => {
    return item.categoryIds.includes("c0") || item.discount != null;
  })


  function renderFunction(itemData) {
    const item = itemData.item
    function pressHandler(){
      navigation.navigate("ProductDetails",{productId:item.id})
    }
    return(
      <Card
        itemTitle={item.title}
        itemDescription={item.description}
        itemImage={item.imageUrl}
        itemPrice={item.price}
        itemDiscount={item.discount}
        onPress={pressHandler}
        feed
      />
    )
  }
  
  
  return (
    <FlatList keyExtractor={(item) => item.id} data={selectedItems} renderItem={renderFunction}/>
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"center",
    alignContent:"center"
  },
  text:{
    textAlign:"center",
  }
})