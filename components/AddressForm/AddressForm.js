import { View, StyleSheet,Text, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from '../UI/Button'
import { addAddress } from '../../Config/Http'
import { useContext,useRef } from 'react'
import { AuthContext } from '../../store/context-store'
import {useDispatch} from 'react-redux'
import { cartActions } from '../../store/store-redux'
import { useNavigation } from '@react-navigation/native'
import DropdownAlert from 'react-native-dropdownalert'

export default function AddressForm({title}) {
    const AuthCxt = useContext(AuthContext)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isSubmitting,setSubmitting] = useState(false)
    let dropDownAlertRef = useRef();

    const [input,setInput] = useState({
        street: "",
        city:"",
        postalCode:""
    })
    const InputHandler = (inputType,enteredState) => {
        setInput((current) =>{
            return {
            ...current,
            [inputType]:enteredState
      }
     
    })
  }
  async function addAddressHandler ()  {
    Keyboard.dismiss()
    const NewAddress = input.street +","+  input.postalCode + "/" + input.city 
    if(input.street &&input.postalCode&&input.city){
      dispatch(cartActions.addAddress(NewAddress))
      setSubmitting(true)
      await addAddress(AuthCxt.UID,NewAddress)
      setSubmitting(false)
      dropDownAlertRef.alertWithType('success', 'Updated', "your address has been updated successfully!");

    }else{
      dropDownAlertRef.alertWithType('error', 'Invalid input', "please fill all the fields");
    }

  }
  
  let buttonContent;;
  if(isSubmitting){
    buttonContent= <ActivityIndicator size="small" color="#FFFFFF"/>
  }else{
    buttonContent="Add Address"
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

    <View style={styles.root}>
    <Text style={styles.text}>{title}</Text>
    <View style={styles.inputsRow}>
        <Input label="Address (street,building number,door number):" inputFormConf={{onChangeText:InputHandler.bind(this,"street"),multiline:true ,value:input.street,autoCorrect:false}}/>
    </View>
    <View style={styles.inputsRow}>
        <Input  label="Postal code" inputFormConf={{onChangeText:InputHandler.bind(this,"postalCode"), keyboardType:"decimal-pad",maxLength:4 ,value:input.postalCode}}/>
        <Input  label="City" inputFormConf={{onChangeText:InputHandler.bind(this,"city"),maxLength:10 ,value:input.city}}/>

    </View>
    
    <View style={{margin:20}} >
        <Button purple onPress={addAddressHandler}>{buttonContent}</Button>
    </View>
    <View style={{margin:20}}>
    <DropdownAlert
        endDelta={180}
        startDelta={400}
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

const styles = StyleSheet.create({
  root:{
    marginTop:30,
    width:"100%"
    },
  inputsRow:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  text:{
    fontSize:30,
    fontWeight:"bold",
    textAlign:'center',
    color:"white",
    marginVertical:50,
  },
  viewBorder:{
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  }
})