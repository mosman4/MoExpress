import { View,Text, FlatList,Pressable,StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CartPage from '../components/Products/CartPage';
import { addOrder } from '../Config/Http';
import { useContext,useState, useRef} from 'react';
import { AuthContext } from '../store/context-store';
import { cartActions } from '../store/store-redux';
import FallBackScreen from '../components/UI/FallBackScreen';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Cart() {
  const itemsInCart = useSelector((state) => state.cartItems)
  const products = useSelector((state) => state.products)
  const total = useSelector((state) => state.total)
  const userCxt = useContext(AuthContext)
  const dispatch = useDispatch()
  const [isConfirming,setConfirmed] = useState(false)
  const [showAlert,setAlerted] = useState(false)

  var today = new Date();
  var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();


  //FallBack Screen
  if(itemsInCart.length == 0) {
    return(
      <FallBackScreen 
        iconName={"cart-outline"} 
        title={"You haven't added anything to your cart!"}    
      />
    )
  }

  async function checkoutHandler() {
    const username = userCxt.username;
    const uid = userCxt.UID
    setConfirmed(true)
    const id = await addOrder(itemsInCart,username,uid)
    dispatch(cartActions.addNewOrder({id:id,itemsInCart:itemsInCart,createdAt:date}))
    setConfirmed(false)
    // Alert.alert("Your order has been received!","a copy of the bill was automatically sent to your email")
    setAlerted(true)
  }
  function removeCartItems(){
    setAlerted(false)
    dispatch(cartActions.resetCart())
  }
  let buttonContent;
  if(isConfirming){
    buttonContent= <ActivityIndicator size="large" color="#ffffff" style={{margin:5}}/>
  }else{
    buttonContent=(
      <>
      <Text style={{ fontWeight: "bold",fontSize: 18,color:"white",textAlign:"center"}}>Confirm Order </Text>
      <Text style={{ fontWeight: "400",fontSize: 14,color:"white",textAlign:"center",marginTop:3}}>Total: {total} </Text>
      </>
    )
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
    <>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Order Received !"
          message="Your order has been received"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="   Dismiss   "
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => removeCartItems()}
       
      />
      
    <FlatList keyExtractor={(item) => item.productId} data={itemsInCart} renderItem={renderFunction} />
    <View style={{justifyContent:"space-evenly"}} >
    <Pressable style={({pressed}) => pressed? {flexGrow:1,opacity:0.7}:{flexGrow:1}} onPress={checkoutHandler}>
        <View style={[styles.cartButton,{backgroundColor:"#DD4C18D6"}]}>
        <View style={{justifyContent:"center",alignContent:"center",marginTop:8}}>
         {buttonContent}
       </View>
       </View>
       </Pressable>
       </View>
  
    </>
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