import {useContext, useState} from "react"
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { Alert,StyleSheet,View,Text, Image } from 'react-native';
import AuthContent from "../../components/Auth/AuthContent";
import {AuthContext} from "../../store/context-store"
import { loginInWithEmailAndPassword } from "../../Config/Auth";
import { fetchCart,fetchFavorite,fetchOrders } from "../../Config/Http";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/store-redux";
import FlatButton from "../../components/UI/FlatButton";
import { useFonts,AlexBrush_400Regular } from "@expo-google-fonts/alex-brush";

function LoginScreen() {
  const [isLoading, setLoading] = useState(false)
  const AuthCxt = useContext(AuthContext)
  const dispatch = useDispatch()

  async function signInHandler ({email,password}){
    setLoading(true)
    try{
        const user = await loginInWithEmailAndPassword(email,password) 
        const fetchedOrders = await fetchOrders(user.uid)
        const fetchCartItems = await fetchCart(user.uid)
        const fetchFavorites = await fetchFavorite(user.uid)
        dispatch(cartActions.pushItemsToCart(fetchCartItems))
        dispatch(cartActions.addOrders(fetchedOrders))
        dispatch(cartActions.addFavorites(fetchFavorites))
        AuthCxt.setUser(user)      
    }catch(error) {
      Alert.alert("Try again if you want","Something went horribly wrong :(")
      setLoading(false)
    }
  }
  if(isLoading) {
    return <LoadingOverlay message="loading"/>
  }
  return (
    <View style={styles.root}>
      {/* <Text style={{fontSize:32,color:"#F16947",textAlign:"center",fontFamily:'AlexBrush_400Regular'}} >M X</Text> */}
      <Image source={require("../../assets/Logo-Drawing.png")} style={{width:90,height:130,alignSelf:"center",marginVertical:70}}/>
      <AuthContent isLogin onAuthenticate={signInHandler}/>
  
    </View>
  )

}
export default LoginScreen;

const styles= StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"flex-start",
    backgroundColor:"white"
  }
})