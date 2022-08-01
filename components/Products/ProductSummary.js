import { useNavigation } from "@react-navigation/native";
import React from "react";
import Card from "../UI/Card";

export default function ProductSummary({
  itemTitle,
  itemDescription,
  itemPrice,
  itemImage,
  itemSizes,
  onPress
}){

  return (
    <Card
      itemTitle={itemTitle}
      itemDescription={itemDescription}
      itemPrice={itemPrice}
      itemImage={itemImage}
      itemSizes={itemSizes}
      onPress={onPress}
    />
  );
}
