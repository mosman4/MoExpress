import { View,StyleSheet,Button, SafeAreaView } from 'react-native'
import React from 'react'

import { Ionicons } from "@expo/vector-icons";

export default function UIButton({title,onPress,type}) {
  return (
   
      <View style={styles.button}>
        <Button title={title} onPress={onPress} color={"white"}/>
        </View>
      
  )
}

const styles = StyleSheet.create({
    button:{
        margin:10,
        borderRadius:40,
        overflow:"hidden",
        flexDirection:"row",
        padding:4,
        alignContent:"center",
        backgroundColor:"#850909"
      }
})