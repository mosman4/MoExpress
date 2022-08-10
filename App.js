import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feed from "./Screens/Feed";
import Cart from "./Screens/Cart";
import Account from "./Screens/Account";
import All from "./Screens/All";
import Men from "./Screens/Categories/Men";
import Accessories from "./Screens/Categories/Accessories";
import Women from "./Screens/Categories/Women";
import Shoes from "./Screens/Categories/Shoes";
import Perfumes from "./Screens/Categories/Perfumes";
import Electronics from "./Screens/Categories/Electronics";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "./components/Products/ProductDetails";
import { StatusBar } from "expo-status-bar";
import StoreContextProvider, { StoreContext } from "./store/context-store";
import store from "./store/store-redux";
import { Provider, useSelector } from "react-redux";
import IconButton from "./components/UI/IconButton";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function Drawers() {
  const CartItems = useSelector((state) => state.cartItems)

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "white",
        drawerStyle: { width: "60%" },
      }}
    >
      <Drawer.Screen
        name="All"
        component={All}
        options={({navigation}) => ({
          headerRight:({tintColor}) =>  
          <View style={{flexDirection:"row"}}>
        <IconButton
        style={CartItems.length >0? {margin:3} : {margin:9}}
        icon= { "cart"}
        size={25}
        color={tintColor}
        onPress={() => navigation.navigate("Cart")}/>
	       {CartItems.length >0 && <View style={{marginRight:7,backgroundColor:"#ffffff",padding:3,borderRadius:9,height:20,width:18}}><Text style={{color:"black",textAlign:"center",fontSize:12}}>{CartItems.length}</Text></View>}</View>,
          headerStyle: { backgroundColor: "#DE6514" },
          drawerActiveTintColor: "#DE6514",
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name="Men"
        component={Men}
        options={{
          headerStyle: { backgroundColor: "#18405c" },
          drawerActiveTintColor: "#18405c",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="male" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Women"
        component={Women}
        options={{
          headerStyle: { backgroundColor: "#f197d1" },
          drawerActiveTintColor: "#f197d1",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="female" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Accessories"
        component={Accessories}
        options={{
          headerStyle: { backgroundColor: "#02B1B1" },
          drawerActiveTintColor: "#02B1B1",
         
          drawerIcon: ({ color, size }) => (
            <Ionicons name="watch-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Electronics"
        component={Electronics}
        options={{
          headerStyle: { backgroundColor: "#283181" },
          drawerActiveTintColor: "#283181",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Perfumes"
        component={Perfumes}
        options={{
          headerStyle: { backgroundColor: "#703269" },
          drawerActiveTintColor: "#703269",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="rose-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Shoes"
        component={Shoes}
        options={{
          headerStyle: { backgroundColor: "#D10A0AAB" },
          drawerActiveTintColor: "#DA2C2C",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="walk" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function Tabs(){
  return(
  <Tab.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#E96304"},
          tabBarActiveTintColor: "black",
          
        }}
      >
        <Tab.Screen
          name="Home"
          component={Drawers}
          options={{
            title: "All",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flame-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            headerStyle:{backgroundColor:"#1F221DF5"},
            
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  )
}

export default function App() {

  return (
  
    <StoreContextProvider>
    <Provider store={store}>
      <StatusBar style="light" />
    <NavigationContainer style={styles.container} >
   
      <Stack.Navigator >
        <Stack.Screen  name="Main" component={Tabs} options={{headerShown:false}}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{  
        title:"Details",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#000000" },
        stackStyle: { width: "60%" },
        stackActiveTintColor: "#FB7E02",
      }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </StoreContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
