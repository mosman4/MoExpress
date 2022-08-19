import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';

function Button({ children, onPress ,purple}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button,{backgroundColor: purple?"#42345E":Colors.primary500,}, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={{alignSelf:"center"}}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.09,
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
