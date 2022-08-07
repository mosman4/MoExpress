import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, color, onPress,size,style }) {
  return (
    <Pressable
      onPress={onPress}
      style={style}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;


