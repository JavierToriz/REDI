import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import 'react-native-gesture-handler';

import Navigation from './navigation';



export default function App() {
  return (

    < Navigation/>
    
  );
}