import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

export default function Cart() {
  return (
    <View style = {styles.root}>
      <Text style={styles.text}>Cart</Text>
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