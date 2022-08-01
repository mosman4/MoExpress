import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";

export default function Card({
  itemTitle,
  itemDescription,
  itemPrice,
  itemImage,
  onPress,
}) {
  return (
    <ScrollView>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.root, styles.press] : styles.root
        }
        onPress={onPress}
      >
        <View style={styles.card}>
          <View style={styles.imageOuter}>
            <View style={styles.imageInner}>
              <Image style={styles.imageStyle} source={{ uri: itemImage }} />
            </View>
          </View>
          <View style={styles.textView}>
            <Text>{itemTitle}</Text>
            <Text style={styles.priceText}>${itemPrice}</Text>
            <Text numberOfLines={1}>{itemDescription}</Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 190,
    height: 280,
    margin: 10,
  },
  press: {
    opacity: 0.6,
  },
  imageOuter: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 1,
  },
  imageInner: {
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",
  },
  card: {
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 9,
    
  },
  imageStyle: {
    width: "100%",
    height: 190,
  },
  textView: {
    margin: 6,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 23,
  },
});
