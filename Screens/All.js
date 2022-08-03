import {FlatList } from "react-native";
import React from "react";
import { PRODUCTS } from "../data/dummy-data";
import ProductSummary from "../components/Products/ProductSummary";
import { useNavigation } from "@react-navigation/native";
export default function All() {

  const navigation = useNavigation()
  const selectedItems = PRODUCTS.filter((item) => {
    return !item.categoryIds.includes("c00");
  })
  function renderList(itemData) {
    const item = itemData.item;
    function pressHandler(){
      navigation.navigate("ProductDetails",{productId:item.id})
    }
    return(
    <ProductSummary
      itemTitle={item.title}
      itemDescription={item.description}
      itemPrice={item.price}
      itemImage={item.imageUrl}
      itemSizes={item.size}
      itemDiscount={item.discount}
      onPress={pressHandler}
    />
    )
  }

  return (
    <FlatList 
      keyExtractor={(item) => item.id}
      data={selectedItems}
      renderItem={renderList}
      numColumns={2}
    />
  
  );
}
