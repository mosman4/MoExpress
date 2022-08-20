import { View, Text,ScrollView,Image,StyleSheet, LogBox, Pressable} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import UIButton from '../UI/UIButton';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import IconButton from '../UI/IconButton';
import { ButtonGroup } from '@rneui/themed';
import InputSpinner from "react-native-input-spinner";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/store-redux';
import {Shake} from "react-native-motion";
import { handleCart, handleFavorite } from '../../Config/Http';
import { useContext } from 'react';
import { AuthContext } from '../../store/context-store';
export default function ProductDetails({route}) {
  const dispatch = useDispatch();
  const AuthCxt = useContext(AuthContext);
  const CartItems = useSelector((state) => state.cartItems)
  const products = useSelector((state) => state.products)
  const favorites = useSelector((state) => state.favorites)
  const [shakeValue,setShakeValue] = useState(0)
  const productId = route.params?.productId;
  const foundInCart = route.params?.isInCart;
  const isFav = favorites.find((item) => item.productId == productId)
  const [isPressed, setPressed] = useState({favorite:isFav?true:false,addedToCart:false});
  const product = products.find((item)=> item.id === productId)
  const navigation = useNavigation()
  const itemInCart = CartItems.find((item) => item.productId === productId)
  const foundQuantity =  itemInCart?.quantity
  const foundSize = itemInCart?.size;
  const foundSizeIndex = product.size?.indexOf(foundSize);
  const uid = AuthCxt.UID;

  const [Input, setInput] = useState({
	id:null,
	selectedSizeIndex:itemInCart ?foundSizeIndex:null,
	quantity:itemInCart? foundQuantity:1,
  });


  useEffect(() => {
	LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])
    

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:({tintColor}) => (  
      <IconButton
	style={{margin:6}}
        icon= { isPressed.favorite ? "heart":"heart-outline"}
        size={25}
        color={tintColor}
        onPress={()=> addToItemToFavorite()}/>
      )
  })
},[navigation,isPressed.favorite])

   function addToItemToFavorite () {
	setPressed((current) =>{return {...current,favorite:!current.favorite} })
	const Item = {productId:productId}
	if(!(isPressed.favorite)){
		handleFavorite("add",Item,uid)
		dispatch(cartActions.addToFavorite(Item))
	}else{
		handleFavorite("remove",Item,uid)
		dispatch(cartActions.removeFromFavorite(Item))
	}
  }
  
  function viewCartHandler() {
    navigation.navigate("Cart")	
  }
  
  function addToCartHandler() {
	const Item = {
		productId:productId,
		size :product.size? product.size[Input.selectedSizeIndex]:null,
		quantity:Input.quantity,
		price:product.price,
	}
  	if(foundInCart) {
		handleCart("update",Item,uid)
		dispatch(cartActions.replaceItemInCart(Item))
		navigation.navigate("Cart")
  	}else {
		handleCart("add",Item,uid)
  		dispatch(cartActions.addItemToCart(Item))
  		setPressed({addedToCart:true})
  		setShakeValue((current) => current + 1)
	}
  }


  function Stars() {
    let iconNum =[];
    let stars = 0
    for(stars; stars<product.stars;stars++ ){
      iconNum.push(<Ionicons  key={Math.random()} name='star' size={20} color="#FFD102AE"/>)
    }

    if (stars<5){
      for(stars; stars<5;stars++ ){
      iconNum.push(<Ionicons  key={Math.random()} name='star' size={20}/>)
    }
  }
    return iconNum
  }

 

const Sizes =  <View style={styles.sizeShadow}>
            <ButtonGroup
            buttons={product.size}
            selectedIndex={Input.selectedSizeIndex}
            onPress={(value) => setInput((current) => {return { ...current,selectedSizeIndex:value}})}
            containerStyle={[{borderRadius:9},itemInCart &&!foundInCart
       	    &&{opacity:0.6}]}
            selectedButtonStyle={{backgroundColor:"black"}}
            />
             </View>;
  
  return (
    <View style={styles.allRoot}>
    <ScrollView>
      <View style={styles.root}>
          <View style={styles.imageOuter}>
            <View style={styles.imageInner}>
              <Image style={styles.imageStyle} source={{ uri: product.imageUrl }} />
            </View>
          </View>
          <View style={styles.outer}>
          <View style={styles.cardInner}>

         {/* Quantity */}
	{ product.price &&
          <View style={styles.textView}>
           
	    <InputSpinner
	    	rounded={false}
		max={itemInCart &&!foundInCart? foundQuantity:10}
		min={itemInCart &&!foundInCart? foundQuantity:1}
		step={1}
		color="black"
		value={Input.quantity}
		skin="modern"
		style={[{marginBottom:1,shadowOffset:{ width: 0, height: 3 }, shadowOpacity: 0.5,shadowRadius: 4,alignSelf:"center"},itemInCart &&!foundInCart
		&&{opacity:0.6}]}
		onChange={(num) => setInput((current) => {return {...current,quantity:num}})}
	     />
          </View>}

          {/* {Description} */}
            <View style={[styles.textView,{marginTop:20}]}>
          <Text style={{fontWeight: "bold",fontSize: 16, marginVertical:4}}>Description:</Text>
            <Text style={{fontSize:16}}>{product.description}</Text>
          </View>

          {/* Sizes */}
            {product.size && <View style={styles.textView}>
          <Text style={{fontWeight: "bold",fontSize: 16}}>Available Sizes:</Text>
            {Sizes}
            </View>}
         
            <View style={styles.textView}>
            <Text style={styles.headText}>Contact Number:</Text>
            <Text>+905312466852</Text>
            </View>
            <View style={styles.textView}>
            <Text style={styles.headText}>Estimated Delivery Time:</Text>
            <Text>7 business years</Text>
            </View>
	     {/* Rating  */}
	     <View style={styles.textView}>
         
	 <View style={[styles.starsShadow,{alignSelf:"center"}]}>
	   <View style={styles.stars}>
	     <Stars/>
	   </View>
	   </View>
	 </View>
            </View>
            
            </View>
            
          </View>
          </ScrollView>
         { product.price && <Shake style={{flexDirection:"row"}} value={shakeValue} type="timing">
 	
	    {(!itemInCart || foundInCart)  &&  (!product.size || Input.selectedSizeIndex != null) &&
	      <View style={[styles.cartButton,{flexDirection:"row",backgroundColor:"#000000E3",}]}>
         <View style={{backgroundColor:"white",margin:13,justifyContent:"center",borderRadius:9}}>
          <Text style={{ fontWeight: "bold",fontSize: 17,color:"black",textAlign:"center",padding:10}}>
          {product.price} USD
          </Text>
          </View>
         <UIButton title={foundInCart
      ? "Update":"Add to cart"} onPress={addToCartHandler}/>
	 </View>}

	 { itemInCart &&!foundInCart
 &&
	 <View style={[styles.cartButton,{backgroundColor:"#029F14D6"}]}>
	 <Pressable style={{flexGrow:1}} onPress={viewCartHandler}>
	 <View style={{flexDirection:"row",justifyContent:"center"}}>
	  <Text style={{ fontWeight: "bold",fontSize: 18,color:"white",marginVertical:20,marginRight:4}}>View In Cart </Text>
   	  <View style={{ marginVertical:10}}><Ionicons name="arrow-forward-circle-outline" size={37} color="#FEFEFE"/></View>
	</View>
	</Pressable>
	</View>
	
	 }
        
	</Shake>}    
        </View>
  );
}
const styles = StyleSheet.create({
  outer:{
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    margin:7,
    height:"100%"
  },
  cardInner:{
    backgroundColor:"#FFFFFFBE",
    paddingBottom:110,
    borderRadius:15
  },
  allRoot:{
    flex:1,
    justifyContent:"center",
    alignContent:"center"
  },
  root: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  press: {
    opacity: 0.6,
  },
  imageOuter: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    marginBottom:5
  },
  imageInner: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    overflow:"hidden"
  },
  imageStyle: {
    width: "100%",
    height: 390,
  },
  textView: {
    marginHorizontal: 16,
    marginVertical: 10,
    
  },
  headText: {
    fontWeight: "bold",
    fontSize: 14,
    marginVertical:4,
  
  },
  
  cartButton: {
    height:70,
    width:"90%",
    justifyContent:"space-between",
    padding:3,
    borderRadius:10,
    marginHorizontal:20,
    position:"absolute",
    bottom:30,
    
},
  stars:{
    flexDirection:"row",
    justifyContent:"space-around",
    borderRadius:9,
    backgroundColor: 'white',
    padding:20,
 

  },
  starsShadow:{
    shadowColor: '#black',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.22,
    flexDirection:"row"
  },
  sizeView:{
    backgroundColor:"#FFFFFF93",
    padding:10,
    borderRadius:8

  },
  SizesView:{
  
  },
  sizeShadow:{
    shadowColor: '#black',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.22,
    marginVertical:4,
    marginRight:10
  },
});