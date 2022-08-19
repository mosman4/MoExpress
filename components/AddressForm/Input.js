import {ScrollView, TextInput,Text, StyleSheet,  } from 'react-native'
import React from 'react'

export default function Input({label,inputFormConf}) {

    const textInputStyle = [styles.textInput];
    if (inputFormConf && inputFormConf.multiline) {
        textInputStyle.push(styles.descriptionInput)
    }
  return (
    <ScrollView style={styles.root}>
    
      <Text style={styles.text}>{label}</Text>
      <TextInput  style={textInputStyle} {...inputFormConf}></TextInput>
      
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    root:{
        margin:10,
        flex:1,
        marginHorizontal:20
        
    },
    text:{
        color:"#5D4C7D",
        marginBottom: 4,
    },
    textInput:{
        backgroundColor:"#D7C9F3",
        padding: 10,
        borderRadius: 6,
        fontSize: 13,
    },
    descriptionInput:{
        minHeight:50,
        textAlignVertical: 'top'
    }
})