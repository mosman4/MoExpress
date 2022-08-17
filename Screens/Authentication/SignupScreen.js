import { useContext,useState } from 'react';
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { Alert, StyleSheet, View } from 'react-native';
import AuthContent from "../../components/Auth/AuthContent";
import {AuthContext} from "../../store/context-store"
import { registerWithEmailAndPassword } from '../../Config/Auth';
import { fetchCart, fetchOrders } from '../../Config/Http';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/store-redux';

function SignupScreen() {
  const [isLoading, setLoading] = useState(false)
  const AuthCxt = useContext(AuthContext)
  const dispatch = useDispatch()
  
  async function signUpHandler ({username,email,password}){
    setLoading(true)
    try{
      const user = await registerWithEmailAndPassword(username,email,password)
      const fetchedOrders = await fetchOrders(user.uid)
      const fetchCartItems = await fetchCart(user.uid)
      dispatch(cartActions.pushItemsToCart(fetchCartItems))
      dispatch(cartActions.addOrders(fetchedOrders))
      AuthCxt.setUser(user)
    }catch(error) {
      setLoading(false)
      console.log(error)
      Alert.alert("Try again if you want","Something went horribly wrong (:")
    }
   
  }
  if(isLoading) {
    return <LoadingOverlay message="loading"/>
  }
  return (
      <View style={styles.root}>
           <AuthContent onAuthenticate={signUpHandler}/>
      </View>
  )
  
}

export default SignupScreen;

const styles= StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"space-around",
    backgroundColor:"white"
  }
})
