import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons,  Feather } from '@expo/vector-icons';

//Auth Screens
import LogIn from './screens/auth/LogInScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import GustosScreen from './screens/auth/GustosScreen';

//screens
import HomeScreen from './screens/CameraScreen';
import CreadorEscenas from './screens/CreadorEscenas';
import CameraScreen from './screens/HomeScreen';
import { Camera } from 'expo-camera';

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
                    headerTitle: (props) =>  <SearchHeader {...props} />,
                    headerLeft: (props) => ( 
                        <Image
                          style={{ width: 55, height: 40, marginLeft: 20, marginBottom: 10 }}
                          source={require('./src/images/logoRedi.png')}
                        />
                      ),
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
                    
                    headerTitle: 'Home',
                    headerTintColor: 'white',
                    tabBarLabel: '' ,
                    
                    
                }}
                
            />
            <Tab.Screen 
                name="CreadorEscenas" 
                component={CreadorEscenas}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="camera" size={34} color={color} />
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
               
                headerShown: false
               }}
            />

            <Stack.Screen   name="CameraScreen" component={HomeScreen}  options={{
               
               headerTitle: "Camara",
               
              }}/>

            

        </Stack.Navigator>
    );
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

