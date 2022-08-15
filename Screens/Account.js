import { View, Text,StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import FlatButton from '../components/UI/FlatButton'
import { logout } from '../Config/Auth'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { AuthContext } from '../store/context-store'
import Button from '../components/UI/Button'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { cartActions } from '../store/store-redux'

export default function Account() {
  const navigation = useNavigation()
  const AuthCxt = useContext(AuthContext)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)

  if(isLoading) {
    return <LoadingOverlay message="loading"/>
  }

  function logoutHandler() {
    setLoading(true)
    logout()
    AuthCxt.logout()
    dispatch(cartActions.resetCart())
    dispatch(cartActions.resetOrders())
    dispatch(cartActions.resetFavorites())
  }
  return (
    <View style = {styles.root}>
      <Button onPress={logoutHandler}>logout</Button>
      <FlatButton onPress={()=> navigation.navigate("Orders")}>Orders</FlatButton>
      <FlatButton onPress={()=> navigation.navigate("Favorites")}>Favorites</FlatButton>
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"center",
    alignContent:"center"
  },
  text:{
    textAlign:"center",
  }
})