import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LogIn () {
  const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../../src/images/logoRedi.png')} style={styles.logo} />
                <Text style={styles.logoText}>REDI</Text>
            </View>
            <Text style={styles.title}>Inicia Sesion</Text>
            <Text style={styles.subtitle}>Ingresa tu email y contraseña para acceder a tu cuenta</Text>
            <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            />
            <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            />
            <TouchableOpacity>
                <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RegisterScreen")}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.register}>¿Aún no tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
            <StatusBar style='auto'/>
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      marginTop: 20,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 50,
      flexDirection: 'row'
    },
    logo: {
        width: 80,  
        height: 50, 
        marginBottom: 20,
      },
    logoText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 20
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: 40,
      color: 'gray',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 30,
    },
    forgotPassword: {
      color: '#6e00fa',
      textAlign: 'right',
      marginBottom: 70,
      marginTop: 10,
    },
    button: {
      backgroundColor: '#6e00fa',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    register: {
      marginTop: 40,
      textAlign: 'center',
      color: '#6e00fa',
    },
  });
  
  export default LogIn;