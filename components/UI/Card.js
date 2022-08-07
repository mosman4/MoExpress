import { View,Text,StyleSheet,ScrollView,Pressable,ImageBackground,} from "react-native";
import React,{useState} from "react";

export default function Card({
  itemTitle,
  itemDescription,
  itemPrice,
  itemImage,
  feed,
  itemDiscount,
  summary,
  onPress,
}) {

  let para = {numberOfLines:1}
  if (feed && !itemPrice) {
    para = {numberOfLines:3}
  }
  let discount = "% DISCOUNT"
  if(summary) {
    discount ="%"
  }


  return (
    <ScrollView>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.root, styles.press] : styles.root
        }
        onPress={onPress}
      >
        <View style={styles.card}>
          <View style={styles.imageOuter}>
            <View style={styles.imageInner}>
            <ImageBackground style={[styles.imageStyle,]} source={{ uri: itemImage }}>
            { itemDiscount && <View style={{justifyContent: 'flex-start',alignItems: 'flex-start',backgroundColor:"#FFB700",width:"30%"}}> 
                <Text style={{padding:10,fontWeight:"600"}}> {itemDiscount}{discount}</Text>
               </View>}
            </ImageBackground>
            </View>
          </View>
          <View style={feed?styles.textView:[styles.textView,{width:190}]}>
            <Text style={{fontWeight:"700"}}>{itemTitle}</Text>
            <Text {...para} style={{fontSize:12}}>{itemDescription}</Text>
           {itemPrice && <Text style={styles.priceText}>${itemPrice}</Text>}
            
          </View>
         
        </View>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // width: "100%",
    height: "10%",
    margin: 5,
  },
  press: {
    opacity: 0.6,
  },
  imageOuter: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    
  },
  imageInner: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
    
  },
  imageStyle: {
    height: 190,
  },
  card: {
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 9,
    // width:190
    
  },
  
  textView: {
    margin: 6,
  },
  priceText: {
    fontWeight:"700",
    fontSize:18
  },
});
