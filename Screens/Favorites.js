import { FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import FallBackScreen from '../components/UI/FallBackScreen'
import Card from '../components/UI/Card'


export default function Favorites({navigation}) {
    const FavoriteItems = useSelector((state) => state.favorites)
    const PRODUCTS = useSelector((state) => state.products)
    Card
    if(FavoriteItems.length == 0) {
        return(
            <FallBackScreen iconName={"heart-dislike-outline"} title={"You have no favorites"} />
        )
    }
    function renderFunction (itemData) {
        const item = itemData.item;
        function pressHandler(){
            navigation.navigate("ProductDetails",{productId:item.productId})
          }
        const product = PRODUCTS.find((p) => p.id == item.productId)
        return(
         <Card
            itemTitle={product.title}
            itemDescription={product.description}
            itemPrice={product.price}
            itemImage={product.imageUrl}
            itemSizes={product.size}
            itemDiscount={product.discount}
            summary
            onPress={pressHandler}
          />
        )
    }

  return (
    <FlatList key={(item) => item.productId} data={FavoriteItems} renderItem={renderFunction} numColumns={2}/>
  )
}