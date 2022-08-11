import {FlatList,View,Text } from "react-native";
import React, { useEffect,useState } from "react";
import ProductSummary from "../components/Products/ProductSummary";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../Config/Http";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/store-redux";
import BouncingPreloader from 'react-native-bouncing-preloaders';
export default function All() {
  const dispatch = useDispatch() 
  const products = useSelector((state) => state.products)
  const [isLoading,setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(()=> {
   
      async function getProducts(){
        try{
          const fetchedProducts = await fetchProducts();
          setLoading(false)
          dispatch(cartActions.addProduct(fetchedProducts))
        }catch(error){
          alert(error)
          setLoading(false)
          console.log(error)
        }
      }
      getProducts()
    
    return()=>{
      dispatch(cartActions.removeProducts())
    }
  },[])
  
  
  if(isLoading){
    return(
     <View style={{flex:1,justifyContent:"center",alignContent:"center",alignSelf:"center",marginTop:70}}>
    <BouncingPreloader
      icons={[
        require('../assets/purse.png'),
        require('../assets/T-shirt.png'),
        require('../assets/Airpods.png'),
        require('../assets/appleWatch.png'),
      ]}
        size={50}
      />
      </View>
    )
  }
  

  // console.log(products)
  // console.log(PRODUCTS)
  
  const selectedItems = products.filter((item) => {
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
