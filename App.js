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
import LoginScreen from "./Screens/Authentication/LoginScreen"
import SignupScreen from "./Screens/Authentication/SignupScreen"
import Electronics from "./Screens/Categories/Electronics";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetails from "./components/Products/ProductDetails";
import { StatusBar } from "expo-status-bar";
import StoreContextProvider, { AuthContext, StoreContext } from "./store/context-store";
import store from "./store/store-redux";
import { Provider, useSelector } from "react-redux";
import IconButton from "./components/UI/IconButton";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import Favorites from "./Screens/Favorites";
import Orders from "./Screens/Orders";
import OrdersCart from "./components/Products/OrdersCart";
import Kids from "./Screens/Categories/Kids";
import Location from "./Screens/Location";
import ForgotScreen from "./Screens/Authentication/ForgotScreen";

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
        name="Kids"
        component={Kids}
        options={{
          headerStyle: { backgroundColor: "#CEAB2A" },
          drawerActiveTintColor: "#CEAB2A",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shirt-outline" size={size} color={color} />
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

function AuthStack(){
 return(
  <>
    <StatusBar style="dark" />
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen}/> 
      <Stack.Screen name="Forgot" component={ForgotScreen} options={{headerShown:true}}/> 

    </Stack.Navigator>
    </>
  )
}

function AuthenticatedStack(){
  return(
    <>        
    <StatusBar style="light" />
    <Stack.Navigator >
    	<Stack.Screen  name="Main" component={Tabs} options={{headerShown:false}}/>
   	<Stack.Screen name="ProductDetails" component={ProductDetails} options={{  
    		title:"Details",
    		headerTintColor: "white",
    		headerStyle: { backgroundColor: "#000000" },
    		stackStyle: { width: "60%" },
    		stackActiveTintColor: "#FB7E02",
  		}} />
      
    <Stack.Screen  name="Favorites" component={Favorites} options={{headerShown:true,headerStyle:{backgroundColor:"#A21854"},headerTintColor:"white"}}/>
    <Stack.Screen  name="Location" component={Location} options={{headerShown:true,title:"My Address",headerStyle:{backgroundColor:"#23153F"},headerTintColor:"white"}}/>
    <Stack.Screen  name="Orders" component={Orders} options={{headerShown:true,headerStyle:{backgroundColor:"#0C5973"},title:"Previous Orders",headerTintColor:"white"}}/>
    <Stack.Screen  name="OrdersCart" component={OrdersCart} options={{headerShown:true,title:"Previous Items",headerTintColor:"white", headerStyle:{backgroundColor:"#3D3535" }}}/>

 	 </Stack.Navigator>
    </>
  )
}

function Root(){
	const AuthCxt = useContext(AuthContext);
	const [isLogging,setLogging] = useState(true);

	useEffect(()=>{
		async function fetchLogin () {
			const storedToken = await AsyncStorage.getItem("token")
      const storedName = await AsyncStorage.getItem("username")
      const storedUID = await AsyncStorage.getItem("uid")
			if(storedToken){
				AuthCxt.signedHandler(storedToken,storedUID,storedName)
			}
			setLogging(false)
		}
		fetchLogin()
	},[])
	if (isLogging)??{
		return <LoadingOverlay/>
	}
	return <Navigation/>
}

function Navigation() {
	const AuthCxt = useContext(AuthContext);
	return(
	<NavigationContainer style={styles.container} >
	 {!AuthCxt.isLoggedIn && <AuthStack/>}
	 {AuthCxt.isLoggedIn && <AuthenticatedStack/>}
	</NavigationContainer>
	)
}
export default function App() {
 
  return (
    <StoreContextProvider>
    <Provider store={store}>
	  <Root/>
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
