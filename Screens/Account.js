import { View, Text,StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { logout } from '../Config/Auth'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { AuthContext } from '../store/context-store'
import Button from '../components/UI/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch ,useSelector} from 'react-redux'
import { cartActions } from '../store/store-redux'
import AccountCard from '../components/UI/AccountCard'
import FlatButton from '../components/UI/FlatButton'
import AwesomeAlert from 'react-native-awesome-alerts'
export default function Account() {
  const navigation = useNavigation()
  const AuthCxt = useContext(AuthContext)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const [infoShown,setIsShown] = useState(false)

  
  const userInfo = useSelector((state)=> state.userInfo)

  let buttonContent = "logout"
  if(isLoading) {
    buttonContent = <ActivityIndicator size="small"  color="white" />
  }

  async function logoutHandler() {
    setLoading(true)
    await logout()
    AuthCxt.logout()
    dispatch(cartActions.resetCart())
    dispatch(cartActions.resetOrders())
    dispatch(cartActions.resetFavorites())
    dispatch(cartActions.resetUserInfo())
    
  }
  return (
    <View style = {styles.root}>
    <View style={{flexDirection:"row",margin:11,marginTop:30,borderBottomWidth:1,paddingBottom:10}}>
    <View style={{padding:10,backgroundColor:"#E2AC5A",borderRadius:5,marginRight:10}}>
      <Text style={{color:"white",fontSize:20}}>{AuthCxt.username.charAt(0)}</Text>
    </View>
    <View >
      <Text style={{fontSize:20,fontFamily:"AirbnbFont"}}>{AuthCxt.username}</Text>
      {!!userInfo.address && <Text style={{fontSize:15,fontFamily:"AirbnbFont"}}>{userInfo.address}</Text>}
      {!userInfo.address && <FlatButton pure onPress={()=> navigation.navigate("Location")}>please add your address</FlatButton>}
      
    </View>
    </View>
    
    <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
      <AccountCard title ={"Favorites"} onPress={()=> navigation.navigate("Favorites")} icon={"heart"} color={"#D73939CD"}/>
      <AccountCard title={"Orders"} onPress={()=> navigation.navigate("Orders")} icon={"receipt-outline"} color={"#1B5B6C"}/>
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-around"}}>
      <AccountCard title={userInfo.address?"Change Address":"Add Address"} onPress={()=> navigation.navigate("Location")} icon={"pin"} color={"#000000"}/> 
      <AccountCard title ={"Personal Info"} onPress={()=> setIsShown(true)} icon={"information-circle-outline"} color={"#150404"}/>
    </View>
    <View style={{marginTop:20,marginHorizontal:30}}>
      <Button onPress={logoutHandler}>{buttonContent}</Button>
    </View>
    
   
    <AwesomeAlert
          show={infoShown}
          showProgress={false}
          message={"Name: "+userInfo.username +'\n' +"Email: " + userInfo.email+ '\n' +"Address: " + (userInfo.address?userInfo.address:"Not Added")}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="   Dismiss   "
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => setIsShown(false)}
       
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1,  
    marginHorizontal:10
  },
  text:{
    textAlign:"center",
  }
})