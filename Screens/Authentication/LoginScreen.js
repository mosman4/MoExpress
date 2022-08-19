import {useContext, useState,useRef} from "react"
import {StyleSheet,View,Image, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AuthContent from "../../components/Auth/AuthContent";
import {AuthContext} from "../../store/context-store"
import { loginInWithEmailAndPassword } from "../../Config/Auth";
import { FetchUserInfo, fetchCart,fetchFavorite,fetchOrders } from "../../Config/Http";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/store-redux";
import DropdownAlert from 'react-native-dropdownalert';


function LoginScreen() {
  const [isLoading, setLoading] = useState(false)
  const AuthCxt = useContext(AuthContext)
  const dispatch = useDispatch()
  let dropDownAlertRef = useRef();

  
  async function signInHandler ({email,password}){
    Keyboard.dismiss()
    setLoading(true)
    try{
        const user = await loginInWithEmailAndPassword(email,password) 
        const fetchedOrders = await fetchOrders(user.uid)
        const fetchCartItems = await fetchCart(user.uid)
        const fetchFavorites = await fetchFavorite(user.uid)
        const userInfo = await FetchUserInfo(user.uid)
        dispatch(cartActions.pushItemsToCart(fetchCartItems))
        dispatch(cartActions.addOrders(fetchedOrders))
        dispatch(cartActions.addFavorites(fetchFavorites))
        dispatch(cartActions.addUserInfo(userInfo))
        AuthCxt.setUser(user)      
    }catch(error) {
      setLoading(false)
      dropDownAlertRef.alertWithType('error', 'Wrong input', "please check your password and email");
      
    }
  }
  let loadingInd ;
  if(isLoading) {
    loadingInd = <ActivityIndicator size="large" color="#000000" style={{margin:30}}/>
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View style={styles.root}>
      <Image source={require("../../assets/Logo-Drawing.png")} style={{width:90,height:130,alignSelf:"center",marginVertical:70}}/>
      <AuthContent isLogin onAuthenticate={signInHandler}/>
      {loadingInd}
      <View style={{margin:20}}>
      <DropdownAlert
        endDelta={130}
        startDelta={280}
        closeInterval={2000}
        
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
      </View>
    </View>
    </TouchableWithoutFeedback>
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