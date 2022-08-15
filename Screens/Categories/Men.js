import { View,StyleSheet, Text, FlatList } from 'react-native'
import React from 'react'
import Card from '../../components/UI/Card';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Men() {
  const navigation = useNavigation()
  const PRODUCTS = useSelector((state) => state.products)
  
  const menCat = PRODUCTS.filter((product) => {
    return product.categoryIds.indexOf("c1") >= 0;
  }
  
  )
  function renderFunction(itemData) {
    const item = itemData.item;
    function pressHandler(){
      navigation.navigate("ProductDetails",{productId:item.id})
    }
    return(
      <Card
        itemTitle={item.title}
        itemDescription={item.description} 
        itemPrice={item.price}
        itemImage={item.imageUrl}
        onPress={pressHandler}

      />
    )


  }

  return (
    <FlatList keyExtractor={(item) => item.id} data={menCat} renderItem={renderFunction} numColumns={2}/>
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