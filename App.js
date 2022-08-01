import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
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
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function Drawers() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#E96304" },
        drawerStyle: { width: "60%" },
        drawerActiveTintColor: "#FB7E02",
      }}
    >
      <Drawer.Screen
        name="All"
        component={All}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Men"
        component={Men}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="male" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Women"
        component={Women}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="female" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Accessories"
        component={Accessories}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="watch-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Electronics"
        component={Electronics}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Perfumes"
        component={Perfumes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="rose-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Shoes"
        component={Shoes}
        options={{
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
          headerStyle: { backgroundColor: "#E96304" },
          tabBarActiveTintColor: "#E96304",
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
    <NavigationContainer style={styles.container} >
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
      </Stack.Navigator>
    </NavigationContainer>
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
