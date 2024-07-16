import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, Ionicons,  Feather } from '@expo/vector-icons';

//Auth Screens
import LogIn from './screens/auth/LogInScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import GustosScreen from './screens/auth/GustosScreen';

//screens
import HomeScreen from './screens/CameraScreen';
import CreadorEscenas from './screens/CreadorEscenas';
import CameraScreen from './screens/HomeScreen';
import NotificacionesScreen from './screens/NotificacionesScreen';
import VisualizarEscena from './screens/VisualizarEscena';
import ComentariosScreen from './screens/ComentariosScreen';
import WebViewScreen from './screens/WebView';

// Header's component
import ButtonHeader from './src/components/ButtonHeader';
import SearchHeader from './src/components/SearchHeader';





const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CrearEscenaStack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
                initialRouteName='HomeScreen' 
                screenOptions={{ 
                    headerLeft: (props) => ( 
                        <Image
                          style={{ width: 55, height: 40, marginLeft: 15, marginBottom: 10, marginRight: 0 }}
                          source={require('./src/images/logoRedi.png')}
                        />
                      ),
                    
                    headerTitle: () =>   <SearchHeader />,
                    headerRight: () => (
                        
                            
                        <ButtonHeader icon="bell" />
                       
                    
                      ),


                    

                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: [
                        {
                            display: 'flex'
                           
                        },
                        null
                    ]
                }} 
                
            >
             
            <Tab.Screen 
                name="HomeScreen" 
                component={CameraScreen} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={34} color={color} />
                    ),   
                    tabBarLabel: '',
                     
                }}
                
            />
            <Tab.Screen 
                name="CreadorEscenas" 
                component={CreadorEscenas}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Entypo name="circle-with-plus" size={38} color={color} />
                    ),
                   
                    headerTitle: 'Perfil',
                    headerTintColor: '#fff',
                    tabBarLabel: '',
                     


                }} 
            />

            <Tab.Screen 
                name="Renderizado de prueba" 
                component={GustosScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person" size={34} color={color} />
                    ),
                   
                    headerTitle: 'Renderizado de prueba',
                    
                    tabBarLabel: '', 
                    headerShown: false,


                }} 
            
            />
            
            
        </Tab.Navigator>
        
    );
}


function MyStack() {
    return (
        <Stack.Navigator initialRouteName='LogIn' >
            <Stack.Screen name="LogIn" component={LogIn} 
            options={{
               
                headerShown: false
               }}
            />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} 
            options={{
               
                headerShown: false
               }}
            />
            <Stack.Screen name="GustosScreen" component={GustosScreen} 
            options={{
               
                headerShown: false
               }}
            />
            
            <Stack.Screen name="Tabs" component={MyTabs} 
            options={{
               
                headerShown: false,
               }}
            />

            <Stack.Screen   name="CameraScreen" component={HomeScreen}  options={{
               
               headerTitle: "Camara",
               
              }}/>

            <Stack.Screen   name="NotificacionesScreen" component={NotificacionesScreen}  options={{
               
               headerTitle: "Notificaciones",
               
              }}/>
            <Stack.Screen   name="VisualizarEscena" component={VisualizarEscena}  options={{
               
               headerTitle: "Escena",
               
              }}/>
            <Stack.Screen   name="ComentariosScreen" component={ComentariosScreen}  options={{
               
               headerTitle: "Comentarios",
               presentation: 'modal'
              }}/>

        <Stack.Screen
                name="WebViewScreen"
                component={WebViewScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}

function StackHome () {
    return (
        <Stack.Navigator>
            <Stack.Screen />
        </Stack.Navigator>
    )
}

/* 
function CrearEscenaGroup () {
    return(
        <CrearEscenaStack.Navigator>
            <CrearEscenaStack.Screen name="CreadorEscenas" component={CreadorEscenas}/>
            <CrearEscenaStack.Screen name="CameraScreen" component={HomeScreen}/>
        </CrearEscenaStack.Navigator>
    )
}
*/



const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: 'blue',
      display: 'flex'
    },
  });


export default function Navigation() {
    return (
        < NavigationContainer >
           <MyStack />
            
            
      
        </NavigationContainer>
    );
}

