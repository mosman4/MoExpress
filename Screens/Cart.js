import { View,Text, FlatList,Pressable,StyleSheet, ScrollView, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { PRODUCTS } from '../data/dummy-data';
import CartPage from '../components/Products/CartPage';
import { Ionicons } from "@expo/vector-icons";
import { addOrder } from '../Config/Http';
import { useContext } from 'react';
import { AuthContext } from '../store/context-store';

export default function Cart() {
  const itemsInCart = useSelector((state) => state.cartItems)
  const products = useSelector((state) => state.products)
  const total = useSelector((state) => state.total)
  const userCxt = useContext(AuthContext)

  //FallBack Screen
  if(itemsInCart.length == 0) {
    return(
      <View style={{flex:1,justifyContent:"center",alignContent:"center"}}>
      <View style={{flexDirection:"row",justifyContent:"center",margin:10}}>
          <Ionicons name="cart-outline" size={120} style={{alignSelf:"center"}}/>
      </View>
          <Text style={{textAlign:"center"}} >You haven't added anything to your cart!</Text>
      </View>
    )
  }

  async function checkoutHandler() {
    const username = userCxt.username;
    const uid = userCxt.UID
    const id = await addOrder(itemsInCart,username,uid)
    console.log(id)
    Alert.alert("Your order has been received!","a copy of the bill was automatically sent to your email")
  }
  function renderFunction (itemData) {
    const item = itemData.item;
    const product = products.find((i) => i.id == item.productId)
    return (
      
      <CartPage
        title={product.title}
        size={item.size}
        quantity={item.quantity}
        price={product.price}
        image={product.imageUrl}
        description={product.description}
        productId={product.id}
      />
     

      

    )
  }
  return (
    <View style={{justifyContent:"space-evenly"}} >
    <FlatList keyExtractor={(item) => item.productId} data={itemsInCart} renderItem={renderFunction} />
    <Pressable style={({pressed}) => pressed? {flexGrow:1,opacity:0.7}:{flexGrow:1}} onPress={checkoutHandler}>
        <View style={[styles.cartButton,{backgroundColor:"#DD4C18D6"}]}>
        <View style={{justifyContent:"center",alignContent:"center",marginTop:8}}>
         <Text style={{ fontWeight: "bold",fontSize: 18,color:"white",textAlign:"center"}}>Confirm Order </Text>
         <Text style={{ fontWeight: "400",fontSize: 14,color:"white",textAlign:"center",marginTop:3}}>Total: {total} </Text>


        {/* <View style={{ marginVertical:10}}><Ionicons name="arrow-forward-circle-outline" size={37} color="#FEFEFE"/></View> */}
       </View>
       </View>
       </Pressable>
       </View>
 
  )
}
const styles = StyleSheet.create({
  cartButton: {
    height:65,
    width:"90%",
    padding:3,
    borderRadius:10,
    marginHorizontal:20,
    marginVertical:10,
    
    
},
})