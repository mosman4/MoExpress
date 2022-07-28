import { View,StyleSheet, Text } from 'react-native'
import React from 'react'

export default function Catg1() {
  return (
    <View style = {styles.root}>
      <Text style={styles.text}>Catg1</Text>
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