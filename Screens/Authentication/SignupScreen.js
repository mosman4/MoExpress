import { useContext,useState,useRef } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import AuthContent from "../../components/Auth/AuthContent";
import {AuthContext} from "../../store/context-store"
import { registerWithEmailAndPassword } from '../../Config/Auth';
import { fetchCart, FetchUserInfo,fetchOrders } from '../../Config/Http';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/store-redux';
import DropdownAlert from 'react-native-dropdownalert';

function SignupScreen() {
  const [isLoading, setLoading] = useState(false)
  const AuthCxt = useContext(AuthContext)
  const dispatch = useDispatch()
  let dropDownAlertRef = useRef();

  async function signUpHandler ({username,email,password}){
    Keyboard.dismiss()
    setLoading(true)
    try{
      const user = await registerWithEmailAndPassword(username,email,password)
      const fetchedOrders = await fetchOrders(user.uid)
      const fetchCartItems = await fetchCart(user.uid)
      const userInfo = await FetchUserInfo(user.uid)

      dispatch(cartActions.pushItemsToCart(fetchCartItems))
      dispatch(cartActions.addOrders(fetchedOrders))
      dispatch(cartActions.addUserInfo(userInfo))

      AuthCxt.setUser(user)
    }catch(error) {
      setLoading(false)
	    dropDownAlertRef.alertWithType('error', 'Invalid input', error.message);
    }
   
  }
  let loadingInd =<View style={{marginTop:35}}></View>;
  if(isLoading) {
    loadingInd = <View><ActivityIndicator size="large" color="#000000" /></View>
  }
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
	 
        <AuthContent onAuthenticate={signUpHandler}/>
		{loadingInd}
      	<View style={{margin:20}}>
      		<DropdownAlert
        		endDelta={30}
        		startDelta={280}
        		closeInterval={4000}
        
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

export default SignupScreen;

const styles= StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"white"
  }
})
