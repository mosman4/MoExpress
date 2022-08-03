import { View, Text,ScrollView,Image,StyleSheet} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { PRODUCTS } from '../../data/dummy-data';
import UIButton from '../UI/UIButton';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import IconButton from '../UI/IconButton';
import { ButtonGroup } from '@rneui/themed';
export default function ProductDetails({route}) {
  const [isPressed, setPressed] = useState({favorite:false,size:false});
  const [value, setValue] = useState();
  const [selectedIndex, setSelectedIndex] = useState(2);
  const productId = route.params?.productId;
  const product = PRODUCTS.find((item)=> item.id === productId)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:({tintColor}) => (  
      <IconButton
        icon= { isPressed.favorite? "heart":"heart-outline"}
        size={24}
        color={tintColor}
        onPress={addToFavorite}
    />
      )
  })
},[navigation,addToFavorite])

  function addToFavorite () {
    console.log("Added to favorite")
    setPressed((state) => ({favorite:!state.favorite}))
  }
  

  function addToCartHandler () {
    console.log("Added to cart")
  }


  function Stars() {
    let iconNum =[];
    let stars = 0
    for(stars; stars<product.stars;stars++ ){
      iconNum.push(<Ionicons  key={Math.random()} name='star' size={20} color="#FFD102AE"/>)
    }
    if (stars<5){
      for(stars; stars<5;stars++ ){
      iconNum.push(<Ionicons  key={Math.random()} name='star' size={20}/>)
    }
  }
    return iconNum
  }

  function sizeSelectHandler(item) {
    console.log(item)
    setPressed((state) => ({size: !state.size}))
  }


  const Sizes = 
  <View style={styles.sizeShadow}>

<ButtonGroup
      buttons={product.size}
      selectedIndex={selectedIndex}
      onPress={(value) => {
        setSelectedIndex(value);
      }}
      containerStyle={{borderRadius:9}}
      selectedButtonStyle={{backgroundColor:"black"}}
    />
  </View>;
  
  
  

  return (
    <View style={styles.allRoot}>
    <ScrollView>
      <View style={styles.root}>
          <View style={styles.imageOuter}>
            <View style={styles.imageInner}>
              <Image style={styles.imageStyle} source={{ uri: product.imageUrl }} />
            </View>
          </View>
          <View style={styles.outer}>
          <View style={styles.cardInner}>
          
          {product.size && <View style={styles.textView}>
          <Text style={{fontWeight: "bold",fontSize: 16, marginTop:20}}>Available Sizes:</Text>
          <View style={styles.SizesView}>
            {Sizes}
            </View>
            </View>}
          <View style={styles.textView}>
          <Text style={[{fontWeight: "bold", fontSize: 16},!(product.size) && {marginTop:20}]}>Users' Rating: </Text>
          <View style={styles.starsShadow}>
            <View style={styles.stars}>
              <Stars/>
            </View>
            </View>
          </View>
          <View style={styles.textView}>
          <Text style={{fontWeight: "bold",fontSize: 16, marginVertical:4}}>Description:</Text>
            <Text style={{fontSize:16}}>{product.description}</Text>
          </View>
          
         
            <View style={styles.textView}>
            <Text style={styles.headText}>Contact Number:</Text>
            <Text>+905312466852</Text>
            </View>
            <View style={styles.textView}>
            <Text style={styles.headText}>Estimated Delivery Time:</Text>
            <Text>7 business years</Text>
            </View>
            </View>
            
            </View>
            
          </View>
          </ScrollView>
          { product.price && <View style={styles.cartButton}>
          <Text style={styles.priceText}>{product.price} USD</Text>
         <UIButton title={"Add to cart"} onPress={addToCartHandler}/>
        </View>}  
        </View>
  );
}
const styles = StyleSheet.create({
  outer:{
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    margin:7,
    height:"100%"
  },
  cardInner:{
    backgroundColor:"#FFFFFFBE",
    paddingBottom:110,
    borderRadius:15
  },
  allRoot:{
    flex:1,
    justifyContent:"center",
    alignContent:"center"
  },
  root: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
   
  },
  press: {
    opacity: 0.6,
  },
  imageOuter: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
    marginBottom:5
  },
  imageInner: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    overflow:"hidden"
  },
  imageStyle: {
    width: "100%",
    height: 390,
  },
  textView: {
    marginHorizontal: 16,
    marginVertical: 5,
    
  },
  headText: {
    fontWeight: "bold",
    fontSize: 14,
    marginVertical:4,
  
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 20,
    color:"white",
    margin:17,
    paddingLeft:10,
  },
  cartButton: {
    width:"90%",
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:"black",
    padding:3,
    borderRadius:10,
    marginHorizontal:20,
    position:"absolute",
    bottom:30,
    
},
  stars:{
    flexDirection:"row",
    justifyContent:"space-around",
    borderRadius:9,
    backgroundColor: '#FFFFFFC1',
    padding:10,
 

  },
  starsShadow:{
    shadowColor: '#black',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.22,

    flexDirection:"row"
  },
  sizeView:{
    backgroundColor:"#FFFFFF93",
    padding:10,
    borderRadius:8

  },
  SizesView:{
  
  },
  sizeShadow:{
    shadowColor: '#black',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.22,
    marginVertical:4,
    marginRight:10
  
  },
});