import { View, Text,StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import Input from '../../components/Auth/Input'
import Button from '../../components/UI/Button'
import { useState } from 'react'
import { sendPasswordReset } from '../../Config/Auth'

export default function ForgotScreen() {
  const [email,setEmail] = useState()
  const [buttonText,setText] = useState("Send Reset Code")
  const [loading,setLoading] = useState(false)

  async function resetHandler() {
    const validEmail = email != null && email.includes('@')
    if(!validEmail){
      Alert.alert("Invalid input")
    }else{
      setLoading(true)
      try{
        const err = await sendPasswordReset(email)
        if(err){
          alert(err)
          setText("Resend")
        }else{
          setText("Check your mail !")
        }
       
      }catch(error) {
        Alert.alert("Error",error)
        
      }
    }
    setLoading(false)

  }

  let loadingInd;
  if (loading) {
    loadingInd = <ActivityIndicator size="large" color="#000000"/>
  }
  return (
    <View style={styles.root}>
    <View style={{marginHorizontal:30,marginBottom:20}} >
    <Text style={{fontSize:15,marginBottom:10}} >Please enter your email</Text>
      <Input
        onUpdateValue={(value) => setEmail(value)}
      />
      </View>
      <View style={{marginHorizontal:120,marginBottom:50}} >
      <Button onPress={resetHandler} >{buttonText}</Button>
    
      </View>
     
      {loadingInd}
    </View>
  )
}
const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"center",
    backgroundColor:"white",
  }
})