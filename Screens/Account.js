import { View, Text,StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import FlatButton from '../components/UI/FlatButton'
import { logout } from '../Config/Auth'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { AuthContext } from '../store/context-store'
import Button from '../components/UI/Button'

export default function Account() {
  const AuthCxt = useContext(AuthContext)
  const [isLoading, setLoading] = useState(false)

  if(isLoading) {
    return <LoadingOverlay message="loading"/>
  }
  
  function logoutHandler() {
    setLoading(true)
    logout()
    AuthCxt.logout()
  }
  return (
    <View style = {styles.root}>
      <Button onPress={logoutHandler}>logout</Button>
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