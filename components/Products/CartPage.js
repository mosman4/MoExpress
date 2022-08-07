import { View, Text, StyleSheet,Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import InputSpinner from "react-native-input-spinner";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/store-redux";
import IconButton from "../UI/IconButton";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-reanimated";
export default function CartPage({productId,title,size,quantity,price,image,description}) {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  function removeItemHandler(){
    dispatch(cartActions.removeItemFromCart(productId))
  }

  function updateQuantity (value) {
    
    dispatch(cartActions.updateQuantity({productId:productId,updateQuantity:value}))
  }

  function goToProductHandler() {
    navigation.navigate("ProductDetails", {productId:productId,isInCart:true,quantity:quantity,size:size})
  }

  const total = price * quantity;
 
  
  return (
    <View style={styles.outer}>
    <Pressable style={({pressed}) => pressed&& {opacity:0.6}} onPress={goToProductHandler}>
      <View style={styles.cardInner}>
      <View style={{ flexDirection: "row"}}>
      <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={{ uri: image }} />
        </View>
        <View style={styles.textContainer}>
        <Text style={{fontWeight:"700",fontSize:17,marginBottom:11}}>{title}</Text>
        {size!=null && <Text style={{fontWeight:"700"}}>Size: {<Text style={{fontWeight:"400"}}>{size}</Text>}</Text>}
        <Text style={{fontWeight:"400"}} numberOfLines={3}>{description}</Text>

        </View>
        <View style={styles.toolsContainer}>
        <InputSpinner 
          height={30}
          width={85}
          value={quantity}
          max={10}
          min={1}
          buttonStyle={{width:30,height:30}}
          buttonFontSize={16}
          style={{alignSelf:"flex-end"}}
          onChange={value => updateQuantity(value)} 
          color={"#344629"}
          />
        
      </View>
      </View>
      <View style={{borderTopColor:"#888888",borderTopWidth:0.2,marginTop:10,paddingTop:10,flexDirection:"row",justifyContent:"space-between"}}>
      <IconButton icon={"trash-outline"} style={{alignSelf:"center"}} color={"red"} size={23} onPress={removeItemHandler}/>
      <Text style={{fontWeight:"700",fontSize:18,textAlign:"center"}}>{total} usd</Text>
      </View>

      </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    flex: 1,
  
  },
  cardInner: {
    marginHorizontal: 13,
    marginTop:13,
    borderRadius: 9,
    backgroundColor:"white",
    padding:15
  },
  imageContainer: {
    borderRadius:10,
    justifyContent: "center",
    overflow: "hidden",
    width:"25%",
    
  },
  imageStyle: {
    width: "100%",
    height: 90,
  },
  textContainer:{
    marginHorizontal:15,
    width:130
  },
  toolsContainer:{
    flex:1,
    justifyContent:"center",
    alignContent:"flex-end",
  
  }
});
