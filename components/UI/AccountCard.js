import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

export default function AccountCard({title,onPress,icon,color}) {
  return (
    <Pressable  style={({pressed}) => pressed? [styles.container,styles.pressed]:styles.container} onPress={onPress}>
    <View >
     <Text style={{fontWeight:"600",margin:5,fontSize:15}}>{title}</Text>
    </View>
    <View style={{alignSelf:"flex-end",margin:5}}>
    <Ionicons name={icon} size={30} color={color}/>
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"white",
        width:"45%",
        height:100,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginVertical:7
    },
    pressed:{
        opacity:0.5,
    }
})