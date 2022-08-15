import { FlatList } from 'react-native'
import React from 'react'
import Card from '../../components/UI/Card';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function Shoes() {
  const navigation = useNavigation()
  const PRODUCTS = useSelector((state) => state.products)
  
  const shoeCat = PRODUCTS.filter((item) => {
    return item.categoryIds.indexOf("c3") >= 0;
  })

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
      data={shoeCat}
      renderItem={renderFunction}
      numColumns={2}
    />
  );
}
