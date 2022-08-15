import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

export default function FallBackScreen({iconName,title}) {
  return (
    <View style={{flex:1,justifyContent:"center",alignContent:"center"}}>
      <View style={{flexDirection:"row",justifyContent:"center",margin:10}}>
          <Ionicons name={iconName} size={120} style={{alignSelf:"center"}}/>
      </View>
          <Text style={{textAlign:"center"}} >{title}</Text>
      </View>
  )
}