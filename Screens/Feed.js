import { View, Text,StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from "react-redux";
import Card from '../components/UI/Card';
import { useNavigation } from '@react-navigation/native';
import { ButtonGroup } from '@rneui/themed';
import { useState } from 'react';
export default function Feed() {
  const navigation = useNavigation();
  const [selectedInx,setIndex] = useState(0)
  const PRODUCTSONLINE = useSelector((state) => state.products)
  

  let selectedItems;
  if(selectedInx == 0){
    selectedItems = PRODUCTSONLINE.filter((item) => {
    return item.categoryIds.includes("c0") || item.discount != null})
  }else if(selectedInx == 1){
    selectedItems = PRODUCTSONLINE.filter((item) => {
      return item.categoryIds.includes("c0")})
  } else{
    selectedItems = PRODUCTSONLINE.filter((item) => {
      return item.discount != null})
  }

  

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
    <FlatList 
    ListHeaderComponent={
    <View style={{margin:14}}>
      <ButtonGroup
            buttons={["All","New","Discounts"]}
            selectedIndex={selectedInx}
            onPress={(value) => setIndex(value)}
            containerStyle={[{borderRadius:9}]}
            selectedButtonStyle={{backgroundColor:"black"}}
            />
    </View>
    }
    keyExtractor={(item) => item.id} 
    data={selectedItems} 
    renderItem={renderFunction}/>
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