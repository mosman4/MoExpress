import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./Screens/Home";
import Feed from "./Screens/Feed";
import Cart from "./Screens/Cart";
import Account from "./Screens/Account"
const Tab = createBottomTabNavigator();
export default function App() {
  
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Feed" component={Feed}/>
        <Tab.Screen name="Cart" component={Cart}/>
        <Tab.Screen name="Account" component={Account}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
