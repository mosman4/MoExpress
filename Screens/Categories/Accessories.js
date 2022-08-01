import { FlatList } from "react-native";
import React from "react";
import { PRODUCTS } from "../../data/dummy-data";
import Card from "../../components/UI/Card";
import { useNavigation } from "@react-navigation/native";

export default function Accessories() {
  const navigation = useNavigation()
  const accCat = PRODUCTS.filter((item) => {
    return item.categoryIds.indexOf("c4") >= 0;
  });
  function renderFunction(itemData) {
    const item = itemData.item;
    function pressHandler(){
      navigation.navigate("ProductDetails",{productId:item.id})
    }
    return (
      <Card
        itemTitle={item.title}
        itemDescription={item.description}
        itemPrice={item.price}
        itemImage={item.imageUrl}
        onPress={pressHandler}
      />
    );
  }
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={accCat}
      renderItem={renderFunction}
      numColumns={2}
    />
  );
}
