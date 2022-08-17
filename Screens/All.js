import {FlatList,View,Text } from "react-native";
import React, { useEffect,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../Config/Http";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/store-redux";
import BouncingPreloader from 'react-native-bouncing-preloaders';
import Card from "../components/UI/Card";
import { useFonts } from "@expo-google-fonts/alex-brush";
import { useContext } from "react";
import { AuthContext } from "../store/context-store";

export default function All() {
  const dispatch = useDispatch() 
  const products = useSelector((state) => state.products)
  const [isLoading,setLoading] = useState(true)
  const navigation = useNavigation()
  const AuthCxt = useContext(AuthContext)

  
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
  
  const [loaded] = useFonts({
    "AirbnbFont": require('../assets/Fonts/airbnb-cereal-font/AirbnbCereal_W_Md.otf'),
  });

  if (!loaded) {
    return null;
  }
  
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
   
     <Card
      itemTitle={item.title}
      itemDescription={item.description}
      itemPrice={item.price}
      itemImage={item.imageUrl}
      itemSizes={item.size}
      itemDiscount={item.discount}
      summary
      onPress={pressHandler}
    />
    )
  }

  return (  
    <FlatList 
      ListHeaderComponent={    <Text style={{fontSize:20,fontFamily:"AirbnbFont",margin:10}}>Welcome,{"\n"}{AuthCxt.username} !</Text>}
      keyExtractor={(item) => item.id}
      data={selectedItems}
      renderItem={renderList}
      numColumns={2}
    />    
  );
}
