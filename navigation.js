import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { pathToCheckGustos } from "./screens/path";

// Auth Screens
import LogIn from "./screens/auth/LogInScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import GustosScreen from "./screens/auth/GustosScreen";

// screens
import HomeScreen from "./screens/CameraScreen";
import CreadorEscenas from "./screens/CreadorEscenas";
import CameraScreen from "./screens/HomeScreen";
import GalleryScreen from './screens/GalleryScreen';
import ImageDetailScreen from './screens/ImageDetailScreen';
import NotificacionesScreen from "./screens/NotificacionesScreen";
import VisualizarEscena from "./screens/VisualizarEscena";
import ComentariosScreen from "./screens/ComentariosScreen";
import PerfilScreen from "./screens/PerfilScreen";
import WebViewScreen from "./screens/WebView";
import SuccessScreen from "./screens/succes"

// Header's component
import ButtonHeader from "./src/components/ButtonHeader";
import SearchHeader from "./src/components/SearchHeader";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CrearEscenaStack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerLeft: (props) => (
          <Image
            style={styles.headerLogo}
            source={require("./src/images/logoRedi.png")}
          />
        ),
        headerTitle: () => <SearchHeader />,
        headerRight: () => <ButtonHeader icon="bell" />,
        tabBarActiveTintColor: "#6e00fa",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={34} color={color} />
          ),
          tabBarLabel: "",
        }}
      />
      <Tab.Screen
        name="CreadorEscenas"
        component={CreadorEscenas}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="circle-with-plus" size={38} color={color} />
          ),
          headerTitle: "Perfil",
          headerTintColor: "#fff",
          tabBarLabel: "",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={34} color={color} />
          ),
          headerTitle: "Perfil",
          tabBarLabel: "",
        }}
      />
    </Tab.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Text>Loading...</Text>
    </View>
  );
}

function MyStack() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isSpecialCase, setIsSpecialCase] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const itemStr = await AsyncStorage.getItem("userToken");
        if (!itemStr) {
          setIsAuthenticated(false);
          return;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
          await AsyncStorage.removeItem("userToken");
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error retrieving token:", error);
        setIsAuthenticated(false);
      }
    };

    const checkSpecialCase = async () => {
      try {
        const url = pathToCheckGustos;
        const storedItemStr = await AsyncStorage.getItem("userToken");
        const token = JSON.parse(storedItemStr);

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token.value}`,
          },
        });
        console.log(response.data);
        setIsSpecialCase(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error.response.data);
          setIsSpecialCase(true);
        } else {
          console.log("An unexpected error occurred:", error);
          setIsSpecialCase(false);
        }
      }
    };

    getToken().then(() => {
      if (isAuthenticated) {
        checkSpecialCase();
      } else {
        setIsSpecialCase(false);
      }
    });
  }, [isAuthenticated]);

  if (isAuthenticated === null || isSpecialCase === null) {
    console.log("Loading screen...");
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isSpecialCase:", isSpecialCase);
    return <LoadingScreen />;
  }

  const initialRoute = isAuthenticated ? (isSpecialCase ? 'GustosScreen' : 'Tabs') : 'LogIn';
  console.log("Initial Route:", initialRoute);

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GustosScreen"
        component={GustosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={HomeScreen}
        options={{ headerTitle: "Camara", headerShown: false }}
      />
      <Stack.Screen
        name="NotificacionesScreen"
        component={NotificacionesScreen}
        options={{ headerTitle: "Notificaciones" }}
      />
      <Stack.Screen
        name="VisualizarEscena"
        component={VisualizarEscena}
        options={{ headerTitle: "Escena" }}
      />
      <Stack.Screen
        name="ComentariosScreen"
        component={ComentariosScreen}
        options={{ headerTitle: "Comentarios", presentation: "modal" }}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImageDetailScreen"
        component={ImageDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    display: "flex",
  },
  headerLogo: {
    width: 55,
    height: 40,
    marginLeft: 15,
    marginBottom: 10,
    marginRight: 0,
  },
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
