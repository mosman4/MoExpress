import {FlatList,View,Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect,useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  fetchProducts } from "../Config/Http";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/store-redux";
import BouncingPreloader from 'react-native-bouncing-preloaders';
import Card from "../components/UI/Card";
import { useFonts } from "@expo-google-fonts/alex-brush";
import { useContext } from "react";
import { AuthContext } from "../store/context-store";
import SearchInput, { createFilter } from 'react-native-search-filter';
import FallBackScreen from "../components/UI/FallBackScreen";

export default function All() {
  const dispatch = useDispatch() 
  const products = useSelector((state) => state.products)
  const [isLoading,setLoading] = useState(true)
  const navigation = useNavigation()
  const AuthCxt = useContext(AuthContext)
  const [searchedItem,setSearch] = useState()
  
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
  
  let formatted = searchedItem?.replace(/\b\w/g, l => l.toUpperCase())
  const selectedItems = products.filter((item) => {
    return !item.categoryIds.includes("c00") &&item.title.includes(formatted?formatted:"");
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
  let empty;
  if (formatted && selectedItems.length == 0){
      empty=  <FallBackScreen margin  iconName={"search-outline"} title={"No results matching your search"} />
  }
  return (  
   
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
     <>
    <FlatList 
      ListHeaderComponent={    
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{fontSize:20,fontFamily:"AirbnbFont",margin:10}}>Welcome,{"\n"}{AuthCxt.username} !</Text>
        <SearchInput 
          caseSensitive={false}
          onChangeText={(term) => { setSearch(term) }} 
          style={{ minWidth:200,padding: 15,borderRadius:9,margin:18,backgroundColor:"white"}}
          placeholder="search products"
          autoCorrect={false}
          />
        </View>
      }
      keyExtractor={(item) => item.id}
      data={selectedItems}
      renderItem={renderList}
      numColumns={2}
    /> 
     {empty}  
     </> 
    </TouchableWithoutFeedback>
   
   
    
  );
}
