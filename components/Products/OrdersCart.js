import { View, Text,StyleSheet,Pressable,Image } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

export default function OrdersCart({route}) {
    const navigation = useNavigation()
    const itemsList = route.params?.itemList
    const PRODUCTS = useSelector((state) => state.products)

    function renderFunction(itemData){
        const item = itemData.item;
        const product = PRODUCTS.find((p) => p.id == item.productId)
        return (
          <View style={styles.outer}>
          <Pressable style={({pressed}) => pressed&& {opacity:0.6}} onPress={()=>   navigation.navigate("ProductDetails", {productId:item.productId,quantity:item.quantity,size:item.size})}>
            <View style={[styles.cardInner,{borderBottomLeftRadius:0,borderBottomRightRadius:0}]}>
            <View style={{ flexDirection: "row"}}>
            <View style={styles.imageContainer}>
                  <Image style={styles.imageStyle} source={{ uri: product.imageUrl }} />
              </View>
              <View style={styles.textContainer}>
              <Text style={{fontWeight:"700",fontSize:17,marginBottom:11}}>{product.title}</Text>
              {item.size!=null && <Text style={{fontWeight:"700"}}>Size: {<Text style={{fontWeight:"400"}}>{item.size}</Text>}</Text>}
              <Text style={{fontWeight:"400"}} numberOfLines={3}>{product.description}</Text>
      
              </View>
            </View>
      
            </View>
            <View style={[styles.cardInner,{borderTopLeftRadius:0,borderTopRightRadius:0}]}>
            <View style={styles.toolsContainer}>
            <Text style={{fontWeight:"500",fontSize:15,textAlign:"center"}}>Quantity:{item.quantity}</Text>
            <Text style={{fontWeight:"700",fontSize:15,textAlign:"center"}}>Total: {item.price * item.quantity} usd</Text>
            </View>
            </View>
            </Pressable>
          </View>
        )
    }
  return (
    <FlatList keyExtractor={(item)=> item.productId} data={itemsList} renderItem={renderFunction}/>
  )
}

const styles = StyleSheet.create({
  outer: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    flex: 1,
    marginTop:15
  
  },
  cardInner: {
    marginHorizontal: 13,
    marginTop:4,
    borderRadius: 9,
    backgroundColor:"white",
    padding:15,
    overflow:"hidden",
    
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
    maxWidth:200
  
  },
  toolsContainer:{
    flex:1,
    justifyContent:"space-between",  
    flexDirection:"row",
  }
});