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
import Catg1 from "./Screens/Categories/Catg1";
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
      <Drawer.Screen name="Catg1" component={Catg1}
      options={{
          drawerIcon: ({ color, size }) => (
              <Ionicons name="man-outline" size={size} color={color} />
            ),
        }}
       />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer style={styles.container}>
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
